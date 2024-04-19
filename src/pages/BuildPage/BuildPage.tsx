import { Box, Group } from '@mantine/core';

import { ScrollToTopButton } from '@/molecules/ScrollToTopButton';

export const BuildPage = () => (
  // TODO: need to update this page to add the sidebar and the build form container
  <Group className='gap-0'>
    <Box className='w-1/6'>Sidebar Content</Box>
    <Box className='relative w-5/6 '>
      <Box>Build form container</Box>
      <ScrollToTopButton className='fixed bottom-20 right-10'></ScrollToTopButton>
    </Box>
  </Group>
);
