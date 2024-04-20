import { useNavigate } from 'react-router-dom';
import { Group, Image, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Person from '@/assets/images/person.png';
import { UnSignedHeader } from '@/atoms/UnsignedHeader';
import { BIG_Z_INDEX } from '@/constants';
import { PATH } from '@/constants/routes';
import { LoginForm, LoginSchema } from '@/organisms/LoginForm';
import { useLoginUserMutation } from '@/redux/api/authenticationApi';
import { ErrorResponse } from '@/types';
import { httpClient, saveAccessTokenToLS, toastify } from '@/utils';

export const LoginPage = () => {
  const [loginUser] = useLoginUserMutation();
  const [visible, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const onSubmit = (values: LoginSchema) => {
    open();
    loginUser(values).then((res) => {
      if ('data' in res) {
        httpClient.setToken(res.data.data.token);
        saveAccessTokenToLS(res.data.data.token);
        close();
        navigate(PATH.ROOT_PAGE);
        return;
      }
      if (res.error as ErrorResponse) {
        toastify.displayError((res.error as ErrorResponse).message);
        close();
      }
    });
  };

  return (
    <div className='h-screen w-screen bg-quarter-pearl-lusta-50'>
      <UnSignedHeader />

      <Group className='h-contentHeight justify-evenly gap-5 px-5'>
        <Stack className='justify-between gap-5 text-center items-center'>
          <Text className='text-2xl font-semibold text-burnt-sienna-500 tracking-wider'>
            EASY ONLINE FORM BUILDER
          </Text>
          <Text className='text-3xl font-bold text-ocean-green-500'>
            Create the form you need in minutes
          </Text>
          <Image className='h-64 w-64 object-contain' src={Person} />
        </Stack>

        <Stack className='gap-4 justify-between items-center border-3 w-[400px] rounded-lg bg-burnt-sienna-50 p-6'>
          <Text className='text-xl font-bold text-burnt-sienna-500'>Login</Text>
          <LoadingOverlay
            visible={visible}
            zIndex={BIG_Z_INDEX}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'green' }}
          />
          <LoginForm onSubmit={onSubmit} />
        </Stack>
      </Group>
    </div>
  );
};
