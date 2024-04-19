import { Loader, Stack } from '@mantine/core';

export const LoadingDots = () => (
  <Stack className='items-center justify-center'>
    <Loader color='green' type='dots' />
  </Stack>
);
