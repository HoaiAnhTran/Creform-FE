import { ReactNode } from 'react';
import {
  Box,
  Group,
  LoadingOverlay,
  Modal as MantineModal,
  ModalProps as MantineModalProps,
} from '@mantine/core';

import { Button } from '@/atoms/Button';

interface ConfirmationModal extends MantineModalProps {
  body: ReactNode;
  isLoading: boolean;
  onClickBack: () => void;
  onClickConfirm: () => void;
}

export const ConfirmationModal = ({
  body,
  onClickBack,
  onClickConfirm,
  isLoading,
  ...props
}: ConfirmationModal) => (
  <MantineModal {...props} centered size='xl'>
    <Box pos='relative'>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'green' }}
      />
      {body}
      <Group className='justify-between'>
        <Button
          onClick={onClickBack}
          className='font-bold'
          title='Back'
          color='gray'
          variant='outline'
        />
        <Button
          onClick={onClickConfirm}
          color='error'
          className='font-bold'
          title='Confirm'
        />
      </Group>
    </Box>
  </MantineModal>
);
