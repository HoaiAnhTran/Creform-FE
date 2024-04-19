import { API_URL } from '@/constants/apiURL';
import { LoginSchema } from '@/organisms/LoginForm';
import { SignupSchema } from '@/organisms/SignupForm';
import { AuthResponse } from '@/types/auth';

import { rootApi } from './rootApi';

export const authenticationApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<AuthResponse, LoginSchema>({
      query: (data: LoginSchema) => ({
        url: API_URL.LOGIN,
        method: 'POST',
        data,
      }),
    }),
    signUpUser: build.mutation<
      AuthResponse,
      Omit<SignupSchema, 'confirmPassword'>
    >({
      query: (data: Omit<SignupSchema, 'confirmPassword'>) => ({
        url: API_URL.SIGN_UP,
        method: 'POST',
        data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation, useSignUpUserMutation } =
  authenticationApi;
