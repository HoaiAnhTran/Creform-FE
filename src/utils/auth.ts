import { jwtDecode } from 'jwt-decode';

import { ROLES } from '@/constants';
import { CustomJwtPayload } from '@/types';

export const clearLS = () => {
  localStorage.clear();
};

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken);
};

export const getAccessTokenFromLS = () =>
  localStorage.getItem('access_token') ?? '';

export const hasAccessTokenInLS = () =>
  localStorage.getItem('access_token') ? true : false;

export const removeAccessTokenFromLS = () => {
  localStorage.removeItem('access_token');
};

export const setInvitationTokenToLS = (invitationToken: string) => {
  localStorage.setItem('invitation_token', invitationToken);
};

export const getInvitationTokenFromLS = () =>
  localStorage.getItem('invitation_token') ?? '';

export const hasInvitationTokenInLS = () =>
  localStorage.getItem('invitation_token') ? true : false;

export const removeInvitationTokenFromLS = () => {
  localStorage.removeItem('invitation_token');
};

export const checkIsUserRole = (accessToken: string): boolean => {
  if (!accessToken) return false;
  const decoded = jwtDecode<CustomJwtPayload>(accessToken);
  if (decoded.role === ROLES.USER) {
    return true;
  }
  return false;
};
