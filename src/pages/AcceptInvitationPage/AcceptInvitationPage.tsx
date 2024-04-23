import { useEffect, useMemo } from 'react';
import { IoIosWarning } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { Anchor, Group, Image, Stack, Text } from '@mantine/core';

import BeigeLogo from '@/assets/images/beige-logo.png';
import { Button } from '@/atoms/Button';
import { PATH } from '@/constants';
import { Loader } from '@/molecules/Loader';
import {
  useAcceptInvitationMutation,
  useGetInvitationByTokenQuery,
} from '@/redux/api/invitationApi';
import {
  useGetMyProfileQuery,
  useGetUserByEmailQuery,
} from '@/redux/api/userApi';
import { ErrorResponse } from '@/types';
import {
  getInvitationTokenFromLS,
  hasAccessTokenInLS,
  removeAccessTokenFromLS,
  removeInvitationTokenFromLS,
  setInvitationTokenToLS,
  toastify,
} from '@/utils';

export const AcceptInvitationPage = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get('token') || '';

  const { data: myProfile } = useGetMyProfileQuery(
    {},
    {
      skip: !hasAccessTokenInLS(),
    },
  );

  const { data: invitation, isLoading: isLoadingInvitation } =
    useGetInvitationByTokenQuery({ token: token || '' }, { skip: !token });

  const { data: invitedUserAccount } = useGetUserByEmailQuery(
    { email: invitation?.email || '' },
    { skip: !invitation },
  );

  const isLoggedIn: boolean = useMemo(() => {
    if (myProfile && invitation) {
      return myProfile.email === invitation.email;
    }
    return false;
  }, [myProfile, invitation]);

  const [acceptInvitation, { isLoading: isAcceptingInvitation }] =
    useAcceptInvitationMutation();

  const handleClickAcceptInvitation = () => {
    if (!invitedUserAccount) {
      removeAccessTokenFromLS();
      navigate(PATH.SIGNUP_PAGE);
      return;
    }
    if (!isLoggedIn) {
      removeAccessTokenFromLS();
      navigate(PATH.LOGIN_PAGE);
      return;
    }
    acceptInvitation({ token: getInvitationTokenFromLS() }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        removeInvitationTokenFromLS();
        navigate(PATH.OVERVIEW_PAGE);
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const validInvitation = useMemo(() => {
    if (invitation) {
      return (
        !invitation.accepted &&
        new Date(invitation.expiresAt) > new Date(Date.now())
      );
    }
  }, [invitation]);

  useEffect(() => {
    if (validInvitation && token) {
      setInvitationTokenToLS(token);
    }
  }, [validInvitation, token]);

  const renderInvalidInvitation = () => (
    <Stack className='justify-center items-center flex-1 gap-4 px-7'>
      <IoIosWarning className='size-24 text-quarter-pearl-lusta-400' />
      <Text className='font-semibold text-[20px]'>
        Invitation is not available
      </Text>
      <Text className='text-sm text-gray-500'>
        This invitation may not exist, has expired or has already been accepted.
      </Text>
    </Stack>
  );

  return (
    <div className='bg-quarter-pearl-lusta-50 w-full h-screen flex flex-col justify-center items-center'>
      {isLoadingInvitation ? (
        <Loader />
      ) : (
        <div className='w-[550px] h-[360px] bg-white flex flex-col text-center gap-0 shadow-[0_0_9px_3px_rgba(141,200,173,0.3)] rounded-md'>
          <Anchor
            href={PATH.ROOT_PAGE}
            className='no-underline hover:no-underline'
          >
            <Group className='justify-center items-end gap-0 bg-ocean-green-500 py-4 rounded-t-md'>
              <Image src={BeigeLogo} className='h-logoHeight' />
              <span className='text-quarter-pearl-lusta-50 font-bold text-[22px] tracking-[4px]'>
                REFORM
              </span>
            </Group>
          </Anchor>
          {!validInvitation ? (
            renderInvalidInvitation()
          ) : (
            <Stack className='justify-center flex-1 gap-[30px] px-7'>
              <Text className='font-semibold text-[22px]'>Join the team!</Text>
              <Stack>
                <Text className='text-sm leading-7'>
                  You have been invited to join the&nbsp;
                  <b>{invitation?.team.name}</b> team on Creform.
                  <br />
                  <span className='text-ocean-green-500'>
                    Accept the invitation
                  </span>
                  &nbsp;to be able to manage forms and folders in the team.
                  <br />
                </Text>
              </Stack>
              <Button
                title='Accept Invitation'
                className='w-full'
                onClick={handleClickAcceptInvitation}
                loading={isAcceptingInvitation}
              />
            </Stack>
          )}
        </div>
      )}
    </div>
  );
};
