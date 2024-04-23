import { API_URL } from '@/constants/apiURL';
import {
  CreateInvitationPayload,
  InvitationResponse,
  SuccessResponse,
} from '@/types';

import { rootApi } from './rootApi';

const invitationApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getInvitationByToken: build.query<InvitationResponse, { token: string }>({
      query: (params) => ({
        url: API_URL.INVITATION,
        method: 'GET',
        params,
      }),
      transformResponse: (response: SuccessResponse<InvitationResponse>) =>
        response.data,
      providesTags: (_result, _error, arg) => [
        { type: 'Invitations', id: arg.token },
      ],
    }),
    createInvitation: build.mutation<
      SuccessResponse<InvitationResponse>,
      CreateInvitationPayload
    >({
      query: ({ email, teamId }) => ({
        url: `${API_URL.INVITATION}/team/${teamId}`,
        method: 'POST',
        data: { email },
      }),
      invalidatesTags: ['Teams', 'Invitations'],
    }),
    acceptInvitation: build.mutation<
      SuccessResponse<InvitationResponse>,
      { token: string }
    >({
      query: (payload) => ({
        url: `${API_URL.INVITATION}/accept`,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['Teams', 'Folders', 'Forms', 'Invitations'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInvitationByTokenQuery,
  useCreateInvitationMutation,
  useAcceptInvitationMutation,
} = invitationApi;
