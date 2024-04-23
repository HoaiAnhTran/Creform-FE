import { API_URL } from '@/constants/apiURL';
import {
  ChangePasswordPayload,
  SuccessResponse,
  UpdateProfilePayload,
  UserProfileResponse,
} from '@/types';

import { rootApi } from './rootApi';

const userApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getUserByEmail: build.query<UserProfileResponse, { email: string }>({
      query: (params) => ({
        url: API_URL.USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: SuccessResponse<UserProfileResponse>) =>
        response.data,
      providesTags: (_result, _error, arg) => [
        { type: 'Users', id: arg.email },
      ],
    }),

    getMyProfile: build.query<UserProfileResponse | undefined, unknown>({
      query: () => ({
        url: API_URL.USER_PROFILE,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<UserProfileResponse>) =>
        response.data,
      providesTags: ['Profile'],
    }),

    updateProfile: build.mutation<
      SuccessResponse<unknown>,
      UpdateProfilePayload
    >({
      query: (payload) => ({
        url: API_URL.USER_PROFILE,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    changePassword: build.mutation<
      SuccessResponse<unknown>,
      ChangePasswordPayload
    >({
      query: (payload) => ({
        url: API_URL.CHANGE_PASSWORD,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserByEmailQuery,
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = userApi;
