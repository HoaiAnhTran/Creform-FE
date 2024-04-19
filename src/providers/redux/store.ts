import { configureStore } from '@reduxjs/toolkit';

import { authenticationApi } from './slices/authenticationApi';

export const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(authenticationApi.middleware),
});
