import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mantine/core';

import { BuildFormHeader } from '@/templates/Header';
import { Tabs } from '@/templates/Tabs';

export const BuildFormPage = () => (
  <Box className='h-screen justify-between'>
    <BuildFormHeader />
    <Stack className='h-full justify-start gap-0'>
      <Box className='sticky right-0 top-0 z-[100]'>
        <Tabs />
      </Box>
      <Outlet />
    </Stack>
  </Box>
);
