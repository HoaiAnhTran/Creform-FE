import { API_URL } from '@/constants/apiURL';
import { SuccessResponse, TeamResponse } from '@/types';

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
  }),
  overrideExisting: false,
});

export const { useGetMyTeamsQuery } = teamApi;
