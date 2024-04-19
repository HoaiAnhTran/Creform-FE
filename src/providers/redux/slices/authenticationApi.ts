import { API_URL } from '@/constants/api';
import { LoginSchema } from '@/organisms/LoginForm';
import { SignupSchema } from '@/organisms/SignupForm';
import { emptySplitApi } from '@/redux/slices/emptySplitApi';
import { AuthResponse } from '@/types/user';

export const authenticationApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<AuthResponse, LoginSchema>({
      query: (data: LoginSchema) => ({
        url: API_URL.URL_LOGIN,
        method: 'POST',
        data,
      }),
    }),
    signUpUser: build.mutation<
      AuthResponse,
      Omit<SignupSchema, 'confirmPassword'>
    >({
      query: (data: Omit<SignupSchema, 'confirmPassword'>) => ({
        url: API_URL.URL_SIGNUP,
        method: 'POST',
        data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation, useSignUpUserMutation } =
  authenticationApi;
