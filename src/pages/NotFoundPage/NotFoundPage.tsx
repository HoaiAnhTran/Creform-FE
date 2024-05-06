import { useNavigate } from 'react-router-dom';
import { Box, Image, Stack } from '@mantine/core';

import NotfoundImage from '@/assets/images/404.png';
import { Button } from '@/atoms/Button';
import { UnSignedHeader } from '@/atoms/UnsignedHeader';
import { PATH } from '@/constants';
import { Header } from '@/organisms/Header';
import { getAccessTokenFromLS } from '@/utils';

export const NotFoundPage = () => {
  const isAuthenticated = Boolean(getAccessTokenFromLS());

  const navigate = useNavigate();

  return (
    <Box className='flex h-screen w-full flex-col gap-0'>
      {isAuthenticated ? <Header /> : <UnSignedHeader />}
      <Stack className='flex-1 items-center justify-center gap-10'>
        <Image src={NotfoundImage} className='size-[300px]' />
        <Stack className='items-center justify-center gap-5'>
          <span className='text-3xl font-semibold capitalize text-ocean-green-900'>
            Ooops...! Page not found.
          </span>
          <span className='text-center text-lg text-ocean-green-800'>
            Sorry, we can't find the page you are looking for.
          </span>
          <Button
            title='Back to Home'
            variant='outline'
            color='secondary'
            onClick={() => navigate(PATH.OVERVIEW_PAGE)}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
