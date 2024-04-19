import { useNavigate } from 'react-router-dom';
import { Image } from '@mantine/core';

import { UnSignedHeader } from '@/atoms/UnsignedHeader';
import { PATH } from '@/constants/route';
import { LoginForm, LoginSchema } from '@/organisms/LoginForm';
import { useLoginUserMutation } from '@/redux/slices/authenticationApi';
import { AuthErrorResponse } from '@/types/user';
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
      if ((res.error as AuthErrorResponse).data)
        toastify.displayError(
          (res.error as AuthErrorResponse).data?.message as string,
        );
    });
  };

  return (
    <div className='h-screen w-screen'>
      <div className='h-headerHeight bg-malachite-500 px-4 pt-4'>
        <UnSignedHeader />
      </div>
      <div className='flex h-contentHeight items-center justify-evenly'>
        <div className='mt-3'>
          <Image
            className='h-64 w-80 object-contain'
            src='./images/girl.jpeg'
          />
        </div>
        <div className='h-[300px] w-[400px] rounded border bg-white px-6 py-2 shadow-md'>
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
  );
};
