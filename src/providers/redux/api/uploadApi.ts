import { API_URL } from '@/constants/apiURL';
import { SuccessResponse, UploadResponse } from '@/types';

import { rootApi } from './rootApi';

const uploadApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<SuccessResponse<UploadResponse>, File>({
      query: (file) => {
        const payload = new FormData();
        payload.append('image', file);
        return {
          url: API_URL.UPLOAD_IMAGE,
          method: 'POST',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
    uploadDocument: build.mutation<SuccessResponse<UploadResponse>, File>({
      query: (file) => {
        const payload = new FormData();
        payload.append('document', file);
        return {
          url: API_URL.UPLOAD_DOCUMENT,
          method: 'POST',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUploadImageMutation, useUploadDocumentMutation } = uploadApi;
