import { useNavigate } from 'react-router-dom';
import { Image, Text } from '@mantine/core';

import { UnSignedHeader } from '@/atoms/UnsignedHeader';
import { PATH } from '@/constants/routes';
import { SignupForm, SignupSchema } from '@/organisms/SignupForm';
import { useSignUpUserMutation } from '@/redux/api/authenticationApi';
import { ErrorResponse } from '@/types';
import { httpClient, saveAccessTokenToLS, toastify } from '@/utils';

export const SignupPage = () => {
  const [signUpUser, { isLoading }] = useSignUpUserMutation();
  const navigate = useNavigate();
  const onSubmit = (values: SignupSchema) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...body } = values;
    signUpUser(body).then((res) => {
      if (isLoading) return;
      if ('data' in res) {
        httpClient.setToken(res.data.data.token);
        saveAccessTokenToLS(res.data.data.token);
        navigate(PATH.ROOT_PAGE);
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  return (
    <div className='h-screen w-screen'>
      <div className='h-headerHeight bg-malachite-500 px-4 pt-4'>
        <UnSignedHeader />
      </div>
      <div className='flex h-contentHeight flex-col justify-center gap-7'>
        <div className='flex flex-col justify-between gap-2 text-center'>
          <Text className='text-xl font-bold text-malachite-400'>
            EASIEST ONLINE FORM BUILDER
          </Text>
          <Text className='text-5xl font-bold'>
            Powerful forms get it done.
          </Text>
        </div>
        <div className='flex items-center justify-evenly'>
          <div className='mt-3'>
            <Image
              className='h-64 w-80 object-contain'
              src='./images/girl.jpeg'
            />
          </div>
          <div className='w-[400px] rounded border bg-white px-6 py-5 shadow-[0px_0px_15px_rgba(0,0,0,0.2)]'>
            <SignupForm onSubmit={onSubmit} />
          </div>
          <div>
            <Image
              className='h-72 w-80 object-contain'
              src='./images/girl2.jpeg'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
