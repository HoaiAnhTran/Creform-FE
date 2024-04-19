import { API_URL } from '@/constants/apiURL';
import { FolderResponse, SuccessResponse } from '@/types';

import { rootApi } from './rootApi';

const folderApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getMyFolders: build.query<FolderResponse[], void>({
      query: () => ({
        url: API_URL.FOLDERS,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<FolderResponse[]>) =>
        response.data,
      providesTags: ['Folders'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyFoldersQuery } = folderApi;
