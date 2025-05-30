import { API_URL } from '@/constants/apiURL';
import {
  GetAllTemplatesQueryParams,
  SuccessResponse,
  TemplateResponse,
} from '@/types';

import { rootApi } from './rootApi';

const templateApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTemplates: build.query<
      TemplateResponse[],
      GetAllTemplatesQueryParams
    >({
      query: (params: GetAllTemplatesQueryParams) => ({
        url: `${API_URL.TEMPLATES}/get-all`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: SuccessResponse<TemplateResponse[]>) =>
        response.data,
      providesTags: ['Templates'],
    }),

    getTemplateDetails: build.query<TemplateResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URL.TEMPLATES}/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<TemplateResponse>) =>
        response.data,
      providesTags: (_result, _error, arg) => [
        { type: 'Templates', id: arg.id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllTemplatesQuery, useGetTemplateDetailsQuery } =
  templateApi;
