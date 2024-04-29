import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mantine/core';

import { useBuildFormContext } from '@/contexts';
import { BuildFormHeader } from '@/templates/Header';
import { TopBar } from '@/templates/TopBar';
import { cn } from '@/utils';

export const BuildFormPage = () => {
  const { previewMode } = useBuildFormContext();

  return (
    <Box
      className={cn(
        'flex h-screen flex-col justify-start transition-all duration-[350ms] ease-linear',
        {
          '-translate-y-[70px]': previewMode,
        },
      )}
    >
      <BuildFormHeader />
      <Stack className='flex-1 justify-start gap-0'>
        <Box className='sticky right-0 top-0 z-[100]'>
          <TopBar />
        </Box>
        <Outlet />
      </Stack>
    </Box>
  );
};
