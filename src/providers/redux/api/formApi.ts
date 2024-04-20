import { API_URL } from '@/constants/apiURL';
import {
  FormResponse,
  GetFormsParams,
  GetFormsResponse,
  SuccessResponse,
} from '@/types';

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
    getFormDetails: build.query({
      query: ({ id }) => ({
        url: `${API_URL.FORMS}/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<FormResponse>) =>
        response.data,
      providesTags: (_result, _error, arg) => [{ type: 'Forms', id: arg.id }],
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

export const {
  useGetMyFormsQuery,
  useGetFormDetailsQuery,
  useAddToFavouritesMutation,
} = formApi;
