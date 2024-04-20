import { useState } from 'react';
import { Box } from '@mantine/core';

import { ElementLayoutProvider, useBuildFormContext } from '@/contexts';
import { SaveButton } from '@/molecules/SaveButton';
import { ScrollToTopButton } from '@/molecules/ScrollToTopButton';

import { BuildFormLeftbar } from '../BuildFormLeftbar';
import { FormContainer } from '../FormContainer';

export const BuildSection = () => {
  const { toggledLeftbar, toggledRightbar } = useBuildFormContext();

  const [currentElementType, setCurrentElementType] = useState<string>();

  return (
    <Box className='relative flex h-full w-full bg-malachite-50'>
      <Box
        flex={toggledLeftbar ? 3 : 0}
        className='transition-all duration-200 ease-linear'
      >
        <BuildFormLeftbar setCurrentElementType={setCurrentElementType} />
      </Box>
      <Box
        flex={toggledLeftbar ? 9 : 1}
        className='transition-all duration-200 ease-linear'
      >
        <ElementLayoutProvider>
          <FormContainer currentElementType={currentElementType!} />
        </ElementLayoutProvider>
      </Box>
      {toggledRightbar || <SaveButton className='absolute right-10 top-10' />}
      <ScrollToTopButton className='fixed bottom-14 right-10'></ScrollToTopButton>
    </Box>
  );
};
