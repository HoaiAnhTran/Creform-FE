import { useNavigate } from 'react-router-dom';
import { Image, Text } from '@mantine/core';

import { UnSignedHeader } from '@/atoms/UnsignedHeader';
import { PATH } from '@/constants/routes';
import { LoginForm, LoginSchema } from '@/organisms/LoginForm';
import { useLoginUserMutation } from '@/redux/api/authenticationApi';
import { ErrorResponse } from '@/types';
import { httpClient, saveAccessTokenToLS, toastify } from '@/utils';

export const LoginPage = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const navigate = useNavigate();

  const onSubmit = (values: LoginSchema) => {
    loginUser(values).then((res) => {
      if (isLoading) return;
      if ('data' in res) {
        httpClient.setToken(res.data.data.token);
        saveAccessTokenToLS(res.data.data.token);
        navigate(PATH.ROOT_PAGE);
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  return (
    <div className='h-screen w-screen'>
      <div className='h-headerHeight bg-malachite-500 px-4 pt-4'>
        <UnSignedHeader />
      </div>
      <div className='flex h-contentHeight flex-col justify-center gap-10'>
        <div className='flex flex-col justify-between gap-5 text-center'>
          <Text className='text-xl font-semibold text-malachite-400'>
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
          <div className='border-3 w-[400px] rounded bg-white p-6 shadow-[0px_0px_10px_rgba(0,0,0,0.12)]'>
            <LoginForm onSubmit={onSubmit} />
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
