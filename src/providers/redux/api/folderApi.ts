import { API_URL } from '@/constants/apiURL';
import { FolderRequest, FolderResponse, SuccessResponse } from '@/types';

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
    createFolder: build.mutation<
      SuccessResponse<FolderResponse>,
      FolderRequest
    >({
      query: (data) => ({
        url: API_URL.FOLDERS,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Folders'],
    }),
    updateFolder: build.mutation<
      SuccessResponse<FolderResponse>,
      { id: number; data: FolderRequest }
    >({
      query: ({ id, data }) => ({
        url: `${API_URL.FOLDERS}/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Folders'],
    }),
    deleteFolder: build.mutation<SuccessResponse<FolderResponse>, number>({
      query: (id) => ({
        url: `${API_URL.FOLDERS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Folders'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyFoldersQuery,
  useCreateFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
} = folderApi;
