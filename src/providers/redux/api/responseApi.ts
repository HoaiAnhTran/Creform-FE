import { API_URL } from '@/constants';
import { SuccessResponse } from '@/types';
import {
  FormAnswerRequest,
  FormAnswerResponse,
  GetResponsesParams,
  ReturnGetResponses,
} from '@/types/responses';

import { rootApi } from './rootApi';

interface GetResponsesType extends GetResponsesParams {
  formId: string;
}

export const responseApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getResponsesByFormId: build.query<ReturnGetResponses, GetResponsesType>({
      query: ({ formId, ...params }: GetResponsesType) => ({
        url: `${API_URL.RESPONSES}/${formId}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: SuccessResponse<ReturnGetResponses>) =>
        response.data,
      providesTags: ['Responses'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getResponsesExcelFile: build.query<any, { formId: string }>({
      query: ({ formId }) => ({
        url: `${API_URL.RESPONSES}/export/${formId}`,
        method: 'GET',
        responseType: 'arraybuffer', // must define this
      }),
    }),
    createResponse: build.mutation<
      SuccessResponse<FormAnswerResponse>,
      {
        formId?: string;
        payload: FormAnswerRequest;
      }
    >({
      query: ({ formId = undefined, payload }) => ({
        url: `${API_URL.RESPONSES}/${formId}`,
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ['Responses', 'Forms'],
    }),
    deleteOneResponse: build.mutation({
      query: ({
        formId,
        responseId,
      }: {
        formId: string;
        responseId: string;
      }) => ({
        url: `${API_URL.RESPONSES}/${formId}/${responseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Responses'],
    }),
    deleteMultipleResponses: build.mutation({
      query: ({
        formId,
        responsesIds,
      }: {
        formId: string;
        responsesIds: string[];
      }) => ({
        url: `${API_URL.RESPONSES}/${formId}`,
        method: 'DELETE',
        data: { responsesIds: responsesIds },
      }),
      invalidatesTags: ['Responses'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetResponsesByFormIdQuery,
  useLazyGetResponsesExcelFileQuery,
  useCreateResponseMutation,
  useDeleteMultipleResponsesMutation,
  useDeleteOneResponseMutation,
} = responseApi;
