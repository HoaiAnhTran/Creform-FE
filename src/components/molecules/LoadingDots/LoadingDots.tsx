import { Loader, Stack } from '@mantine/core';

interface LoadingDotsProps {
  color: string;
}

export const LoadingDots = ({ color }: LoadingDotsProps) => (
  <Stack className='items-center justify-center'>
    <Loader color={color} type='dots' />
  </Stack>
);
