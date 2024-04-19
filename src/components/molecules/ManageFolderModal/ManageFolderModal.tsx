import { FaFolderPlus } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import {
  ModalProps as MantineModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';

import { Modal } from '../Modal';

interface ManageFolderModalProps extends MantineModalProps {
  folderName?: string;
  inputTitle?: string;
  onClickCancel: () => void;
  onClickSubmit: () => void;
}

export const ManageFolderModal = ({
  folderName,
  onClickCancel,
  onClickSubmit,
  ...props
}: ManageFolderModalProps) => (
  <Modal
    {...props}
    headerIcon={
      <>
        {folderName ? (
          <MdEditSquare className='text-white' />
        ) : (
          <FaFolderPlus className='text-white' />
        )}
      </>
    }
    headerTitle={folderName ? 'Change Folder Name' : 'Add folder name'}
    body={
      <>
        <Stack className='pb-16 pt-7'>
          <Text className='font-bold'>Folder name</Text>
          <TextInput defaultValue={folderName} />
        </Stack>
      </>
    }
    onClickCancel={onClickCancel}
    onClickSubmit={onClickSubmit}
  />
);
