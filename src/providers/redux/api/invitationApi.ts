import { API_URL } from '@/constants/apiURL';
import {
  CreateInvitationPayload,
  InvitationResponse,
  SuccessResponse,
} from '@/types';

import { rootApi } from './rootApi';

const invitationApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
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
  }),
  overrideExisting: false,
});

export const { useCreateInvitationMutation } = invitationApi;
