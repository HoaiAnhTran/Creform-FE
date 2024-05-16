/* eslint-disable no-underscore-dangle */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { BACK_END_URL } from '@/configs';
import { API_URL, MESSAGES, PATH } from '@/constants';
import { AuthResponse, SuccessResponse } from '@/types';

import { clearLS, getAccessTokenFromLS, setAccessTokenToLS } from './auth';

class Http {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.accessToken = getAccessTokenFromLS();

    this.instance = axios.create({
      baseURL: BACK_END_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    let refreshTokenRequest: Promise<AxiosResponse> | null = null;

    this.instance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalConfig = err.config;

        // Refresh token was expired
        if (
          err.response &&
          err.response.status === 401 &&
          originalConfig.url === `${BACK_END_URL}${API_URL.REFRESH_TOKEN}`
        ) {
          if (confirm(MESSAGES.SESSION_EXPIRED) == true) {
            await this.logout();
            window.location.href = PATH.LOGIN_PAGE;
          }
          return;
        }

        // Access token was expired
        if (
          err.response &&
          err.response.status === 401 &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;
          try {
            refreshTokenRequest = refreshTokenRequest
              ? refreshTokenRequest
              : this.refreshToken();

            const res = await refreshTokenRequest;

            refreshTokenRequest = null;

            if (res.data) {
              const newAccessToken = (res.data as SuccessResponse<AuthResponse>)
                .data.accessToken;
              this.setToken(newAccessToken);
              setAccessTokenToLS(newAccessToken);
              originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
            }

            return this.instance(originalConfig);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(err);
      },
    );
  }

  refreshToken() {
    return this.instance.get(`${BACK_END_URL}${API_URL.REFRESH_TOKEN}`);
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  public async logout() {
    await this.instance.post(`${BACK_END_URL}${API_URL.LOGOUT}`);
    clearLS();
    this.accessToken = '';
  }
}

export const httpClient = new Http();

export const http = httpClient.instance;
