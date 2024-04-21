import { useEffect } from 'react';
import { Box, Stack } from '@mantine/core';

import { useBuildFormContext } from '@/contexts';

import { FormRenderComponent } from '../FormRenderComponent';
import { SubmissionConfirmation } from '../SubmissionConfirmation';

export const PreviewSection = () => {
  const { form, clickedSubmit, setClickedSubmit } = useBuildFormContext();

  useEffect(
    () => () => {
      setClickedSubmit(false);
    },
    [setClickedSubmit],
  );

  return (
    <Stack className='relative flex h-screen w-full items-center justify-center overflow-y-scroll bg-malachite-50'>
      {clickedSubmit ? (
        <Box className='scale-90'>
          <SubmissionConfirmation />
        </Box>
      ) : (
        <Box className='absolute top-14 w-full'>
          <FormRenderComponent form={form} />
        </Box>
      )}
    </Stack>
  );
};
