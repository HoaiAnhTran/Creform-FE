import { API_URL } from '@/constants/apiURL';
import { ForgotPasswordSchemaType } from '@/organisms/ForgotPasswordForm';
import { LoginSchemaType } from '@/organisms/LoginForm';
import { ResetPasswordSchemaType } from '@/organisms/ResetPasswordForm';
import { SignupSchemaType } from '@/organisms/SignupForm';
import { AuthResponse, SuccessResponse } from '@/types';

import { rootApi } from './rootApi';

export const authenticationApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<SuccessResponse<AuthResponse>, LoginSchemaType>({
      query: (data: LoginSchemaType) => ({
        url: API_URL.LOGIN,
        method: 'POST',
        data,
      }),
      invalidatesTags: [
        'Profile',
        'Forms',
        'Folders',
        'Teams',
        'Responses',
        'Invitations',
      ],
    }),
    signUpUser: build.mutation<
      SuccessResponse<AuthResponse>,
      Omit<SignupSchemaType, 'confirmPassword'>
    >({
      query: (data: Omit<SignupSchemaType, 'confirmPassword'>) => ({
        url: API_URL.SIGN_UP,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Profile', 'Forms', 'Invitations'],
    }),
    forgotPassword: build.mutation<
      SuccessResponse<unknown>,
      ForgotPasswordSchemaType
    >({
      query: (payload) => ({
        url: API_URL.FORGOT_PASSWORD,
        method: 'POST',
        data: payload,
      }),
    }),
    resetPassword: build.mutation<
      SuccessResponse<unknown>,
      ResetPasswordSchemaType
    >({
      query: (payload) => ({
        url: API_URL.RESET_PASSWORD,
        method: 'POST',
        data: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authenticationApi;
