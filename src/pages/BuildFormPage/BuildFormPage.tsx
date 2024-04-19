import { Box, Flex, Stack } from '@mantine/core';

import { SaveButton } from '@/molecules/SaveButton';
import { ScrollToTopButton } from '@/molecules/ScrollToTopButton';
import { FormContainer } from '@/organisms/FormContainer';
import { Tabs } from '@/templates/Tabs';

export const BuildFormPage = () => (
  <Stack className='justify-between gap-0'>
    <Tabs />
    <Stack className='min-h-screen bg-malachite-50'>
      <Flex className='w-full flex-row items-start justify-between'>
        {/* TODO: place the leftbar here */}\
        <Box className='relative w-full'>
          <FormContainer />
          <SaveButton className='absolute right-10 top-10' />
          <ScrollToTopButton className='fixed bottom-20 right-10'></ScrollToTopButton>
        </Box>
      </Flex>
    </Stack>
  </Stack>
);
