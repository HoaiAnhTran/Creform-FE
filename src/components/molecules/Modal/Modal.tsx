import { ReactNode } from 'react';
import {
  Box,
  Group,
  Modal as MantineModal,
  ModalProps as MantineModalProps,
  Text,
} from '@mantine/core';

import { Button } from '@/atoms/Button';

interface ModalProps extends MantineModalProps {
  headerTitle: string;
  headerIcon?: ReactNode;
  body: ReactNode;
  onClickCancel: () => void;
  onClickSubmit: () => void;
  hasFooter?: true;
  canSubmit?: boolean;
}

interface NoFooterModalProps
  extends Omit<ModalProps, 'hasFooter' | 'onClickCancel' | 'onClickSubmit'> {
  hasFooter: false;
}

export const Modal = ({
  headerTitle,
  headerIcon,
  body,
  canSubmit = true,
  ...props
}: ModalProps | NoFooterModalProps) => (
  <MantineModal
    centered
    size='xl'
    title={
      <>
        <Group className='flex items-center gap-2'>
          {headerIcon && (
            <Box className='rounded-md bg-malachite-500 p-1.5'>
              {headerIcon}
            </Box>
          )}
          <Text className='font-bold'>{headerTitle}</Text>
        </Group>
      </>
    }
    {...props}
  >
    {body}
    {(props.hasFooter === undefined || props.hasFooter) && (
      <Group className='justify-between'>
        <Button
          onClick={props.onClickCancel}
          className='font-bold'
          title='Cancel'
          color='gray'
          variant='outline'
        />
        <Button
          onClick={props.onClickSubmit}
          className='font-bold'
          title='Submit'
          disabled={!canSubmit}
        />
      </Group>
    )}
  </MantineModal>
);
