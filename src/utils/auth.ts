export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('invitation_token');
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
