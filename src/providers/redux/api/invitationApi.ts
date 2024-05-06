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
      invalidatesTags: ['Invitations', 'Teams'],
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
      invalidatesTags: [
        'Invitations',
        'Teams',
        'Folders',
        'Forms',
        'Responses',
      ],
    }),
    deleteInvitation: build.mutation<SuccessResponse<unknown>, { id: number }>({
      query: ({ id }) => ({
        url: `${API_URL.INVITATION}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Invitations', 'Teams'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInvitationByTokenQuery,
  useCreateInvitationMutation,
  useAcceptInvitationMutation,
  useDeleteInvitationMutation,
} = invitationApi;
