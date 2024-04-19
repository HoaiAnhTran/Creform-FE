import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/redux/axiosBasequery';

export const emptySplitApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: '/' }),
  endpoints: () => ({}),
});

export const { reducer } = emptySplitApi;
