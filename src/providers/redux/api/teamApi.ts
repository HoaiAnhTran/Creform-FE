import { API_URL } from '@/constants/apiURL';
import { SuccessResponse, TeamPayload, TeamResponse } from '@/types';

import { rootApi } from './rootApi';

const teamApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getMyTeams: build.query<TeamResponse[], void>({
      query: () => ({
        url: API_URL.TEAMS,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<TeamResponse[]>) =>
        response.data,
      providesTags: ['Teams'],
    }),
    getTeamDetails: build.query<TeamResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URL.TEAMS}/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<TeamResponse>) =>
        response.data,
      providesTags: (_result, _error, arg) => [{ type: 'Teams', id: arg.id }],
    }),
    createTeam: build.mutation<SuccessResponse<TeamResponse>, TeamPayload>({
      query: (data) => ({
        url: API_URL.TEAMS,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Teams'],
    }),
    updateTeam: build.mutation<
      SuccessResponse<TeamResponse>,
      { id: string; data: TeamPayload }
    >({
      query: ({ id, data }) => ({
        url: `${API_URL.TEAMS}/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Teams', 'Forms'],
    }),
    deleteTeam: build.mutation<SuccessResponse<unknown>, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URL.TEAMS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Teams'],
    }),
    removeMember: build.mutation<
      SuccessResponse<TeamResponse>,
      { id: string; memberIds: string[] }
    >({
      query: ({ id, memberIds }) => ({
        url: `${API_URL.TEAMS}/${id}/remove-member`,
        method: 'PATCH',
        data: { memberIds },
      }),
      invalidatesTags: ['Teams'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyTeamsQuery,
  useGetTeamDetailsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useRemoveMemberMutation,
} = teamApi;
