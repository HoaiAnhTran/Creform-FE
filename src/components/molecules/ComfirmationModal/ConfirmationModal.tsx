import { ReactNode } from 'react';
import {
  Group,
  Modal as MantineModal,
  ModalProps as MantineModalProps,
} from '@mantine/core';

import { Button } from '@/atoms/Button';

interface ConfirmationModal extends MantineModalProps {
  body: ReactNode;
  onClickBack: () => void;
  onClickConfirm: () => void;
}

export const ConfirmationModal = ({
  body,
  onClickBack,
  onClickConfirm,
  ...props
}: ConfirmationModal) => (
  <MantineModal {...props} centered size='xl'>
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
  </MantineModal>
);
