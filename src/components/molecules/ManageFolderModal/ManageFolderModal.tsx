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
  folderId?: number;
  setFolderName: (arg0: string) => void;
  inputTitle?: string;
  onClickCancel: () => void;
  onClickSubmit: () => void;
}

export const ManageFolderModal = ({
  folderName,
  folderId,
  setFolderName,
  onClickCancel,
  onClickSubmit,
  ...props
}: ManageFolderModalProps) => (
  <Modal
    {...props}
    canSubmit={folderName !== ''}
    headerIcon={
      <>
        {folderId ? (
          <MdEditSquare className='text-white' />
        ) : (
          <FaFolderPlus className='text-white' />
        )}
      </>
    }
    headerTitle={folderId ? 'Change Folder Name' : 'Add folder name'}
    body={
      <>
        <Stack className='pb-16 pt-7'>
          <Text className='font-bold'>Folder name</Text>
          <TextInput
            value={folderName}
            placeholder='Add folder name here'
            onChange={(e) => setFolderName(e.target.value)}
          />
        </Stack>
      </>
    }
    onClickCancel={onClickCancel}
    onClickSubmit={onClickSubmit}
  />
);
