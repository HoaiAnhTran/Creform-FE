import { useNavigate } from 'react-router-dom';
import { Group, Image, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Person from '@/assets/images/person.png';
import { UnSignedHeader } from '@/atoms/UnsignedHeader';
import { BIG_Z_INDEX } from '@/constants';
import { PATH } from '@/constants/routes';
import { LoginForm, LoginSchemaType } from '@/organisms/LoginForm';
import { useLoginUserMutation } from '@/redux/api/authenticationApi';
import { useAcceptInvitationMutation } from '@/redux/api/invitationApi';
import { ErrorResponse } from '@/types';
import {
  getInvitationTokenFromLS,
  hasInvitationTokenInLS,
  httpClient,
  removeInvitationTokenFromLS,
  setAccessTokenToLS,
  toastify,
} from '@/utils';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [visible, { open, close }] = useDisclosure(false);

  const [loginUser] = useLoginUserMutation();

  const [acceptInvitation] = useAcceptInvitationMutation();

  const onSubmit = (values: LoginSchemaType) => {
    open();
    loginUser(values).then(async (res) => {
      if ('data' in res) {
        const accessToken = res.data.data.accessToken;
        httpClient.setToken(accessToken);
        setAccessTokenToLS(accessToken);
        close();
        if (hasInvitationTokenInLS()) {
          acceptInvitation({ token: getInvitationTokenFromLS() }).then(
            (res) => {
              if ('data' in res) {
                toastify.displaySuccess(res.data.message);
                removeInvitationTokenFromLS();
                navigate(PATH.OVERVIEW_PAGE);
                return;
              }
              if (res.error as ErrorResponse)
                toastify.displayError((res.error as ErrorResponse).message);
            },
          );
        } else {
          navigate(PATH.OVERVIEW_PAGE);
        }
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
        <Stack className='items-center justify-between gap-5 text-center'>
          <Text className='text-2xl font-semibold tracking-wider text-burnt-sienna-500'>
            EASY ONLINE FORM BUILDER
          </Text>
          <Text className='text-3xl font-bold text-ocean-green-500'>
            Create the form you need in minutes
          </Text>
          <Image className='h-64 w-64 object-contain' src={Person} />
        </Stack>

        <Stack className='border-3 w-[400px] items-center justify-between gap-4 rounded-lg bg-burnt-sienna-50 p-6'>
          <Text className='text-xl font-bold text-burnt-sienna-500'>Login</Text>
          <LoadingOverlay
            visible={visible}
            zIndex={BIG_Z_INDEX}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'ocean-green.5' }}
          />
          <LoginForm onSubmit={onSubmit} />
        </Stack>
      </Group>
    </div>
  );
};
