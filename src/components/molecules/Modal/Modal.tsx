import { ReactNode } from 'react';
import {
  Box,
  Divider,
  Group,
  LoadingOverlay,
  Modal as MantineModal,
  ModalProps as MantineModalProps,
  Text,
} from '@mantine/core';

import { Button, ButtonProps } from '@/atoms/Button';

interface ModalProps extends MantineModalProps {
  headerTitle: string;
  headerIcon?: ReactNode;
  body: ReactNode;
  onClickCancel: () => void;
  onClickSubmit: () => void;
  hasFooter?: true;
  canSubmit?: boolean;
  isLoading: boolean;
  cancelButtonProps?: ButtonProps;
  submitButtonProps?: ButtonProps;
}

interface NoFooterModalProps
  extends Omit<
    ModalProps,
    | 'hasFooter'
    | 'onClickCancel'
    | 'onClickSubmit'
    | 'cancelButtonProps'
    | 'submitButtonProps'
  > {
  hasFooter: false;
  isLoading: boolean;
}

export const Modal = ({
  headerTitle,
  headerIcon,
  body,
  canSubmit = true,
  isLoading,
  ...props
}: ModalProps | NoFooterModalProps) => (
  <MantineModal
    centered
    size='xl'
    title={
      <Group className='flex items-center gap-2'>
        {headerIcon && (
          <Box className='rounded-md bg-ocean-green-500 p-1.5'>
            {headerIcon}
          </Box>
        )}
        <Text className='text-lg font-bold capitalize'>{headerTitle}</Text>
      </Group>
    }
    {...props}
  >
    <Box pos='relative'>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'ocean-green.5' }}
      />
      <Divider />
      {body}
      {(props.hasFooter === undefined || props.hasFooter) && (
        <>
          <Divider className='mb-4' />
          <Group className='justify-between'>
            <Button
              onClick={props.onClickCancel}
              className='font-bold'
              title='Cancel'
              color='gray'
              variant='outline'
              {...props.cancelButtonProps}
            />
            <Button
              onClick={props.onClickSubmit}
              className='font-bold'
              title='Submit'
              disabled={!canSubmit}
              {...props.submitButtonProps}
            />
          </Group>
        </>
      )}
    </Box>
  </MantineModal>
);
