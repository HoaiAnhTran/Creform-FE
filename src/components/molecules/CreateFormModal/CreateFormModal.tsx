import { ReactNode } from 'react';
import { BsFileRichtext } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';
import {
  ActionIcon,
  Box,
  Group,
  ModalProps as MantineModalProps,
  Stack,
  Text,
} from '@mantine/core';

import { Modal } from '../Modal';

type CreateFormMethodsType = {
  title: string;
  icon: ReactNode;
  handleClick: () => void;
};

interface CreateFormModalProps extends MantineModalProps {
  handleClickStartFromScratch: () => void;
  handleClickUseTemplate: () => void;
}

export const CreateFormModal = ({
  handleClickStartFromScratch,
  handleClickUseTemplate,
  ...props
}: CreateFormModalProps) => {
  const createFormMethods: CreateFormMethodsType[] = [
    {
      title: 'Start from scratch',
      icon: <IoAdd size={60} />,
      handleClick: handleClickStartFromScratch,
    },
    {
      title: 'Use template',
      icon: <BsFileRichtext size={60} />,
      handleClick: handleClickUseTemplate,
    },
  ];

  return (
    <Modal
      {...props}
      headerIcon={<MdPostAdd className='text-white' size={18} />}
      headerTitle='Create new form'
      body={
        <Box className='flex flex-col items-center gap-8 px-3 py-8 text-gray-800'>
          <Text className='text-[15px] font-medium'>
            How would you like to start creating a form?
          </Text>
          <Group className='gap-[70px]'>
            {createFormMethods.map((method) => (
              <Stack className='items-center gap-5' key={method.title}>
                <ActionIcon
                  variant='light'
                  className='flex size-32 items-center justify-center rounded-xl bg-ocean-green-100 p-2 text-ocean-green-500 transition-all ease-in hover:-translate-y-[2px] hover:border-ocean-green-400 hover:bg-ocean-green-100 hover:text-ocean-green-500'
                  onClick={method.handleClick}
                >
                  {method.icon}
                </ActionIcon>
                <span className='text-center text-[15px] font-semibold capitalize'>
                  {method.title}
                </span>
              </Stack>
            ))}
          </Group>
        </Box>
      }
      hasFooter={false}
      isLoading={false}
    />
  );
};
