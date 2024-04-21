import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mantine/core';

import { useBuildFormContext } from '@/contexts';
import { BuildFormHeader } from '@/templates/Header';
import { TopBar } from '@/templates/TopBar';
import { cn } from '@/utils';

export const BuildFormPage = () => {
  const { previewMode } = useBuildFormContext();

  return (
    <Box className='h-screen justify-between'>
      <BuildFormHeader />
      <Stack
        className={cn(
          'justify-start gap-0 transition-all duration-[350ms] ease-linear',
          {
            '-translate-y-[70px]': previewMode,
          },
        )}
      >
        <Box
          className={`${previewMode ? 'fixed' : 'sticky'} right-0 top-0 z-[100] w-full transition-all ease-linear`}
        >
          <TopBar />
        </Box>
        <Outlet />
      </Stack>
    </Box>
  );
};
