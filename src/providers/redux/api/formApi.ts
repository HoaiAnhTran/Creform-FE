import { API_URL } from '@/constants/apiURL';
import { GetFormsParams, GetFormsResponse, SuccessResponse } from '@/types';

import { rootApi } from './rootApi';

const formApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getMyForms: build.query({
      query: (params: GetFormsParams) => ({
        url: API_URL.FORMS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: SuccessResponse<GetFormsResponse>) =>
        response.data,
      providesTags: ['Forms'],
    }),
    addToFavourites: build.mutation({
      query: ({ id }) => ({
        url: `${API_URL.FORMS}/${id}/favourites`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Forms'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyFormsQuery, useAddToFavouritesMutation } = formApi;
