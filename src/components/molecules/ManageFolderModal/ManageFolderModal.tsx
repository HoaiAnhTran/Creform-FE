import { FaFolderPlus } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import {
  ModalProps as MantineModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';

import { MAXIMUM_FOLDER_NAME_LENGTH } from '@/constants';

import { Modal } from '../Modal';

interface ManageFolderModalProps extends MantineModalProps {
  folderName?: string;
  folderId?: string;
  setFolderName: (arg0: string) => void;
  inputTitle?: string;
  onClickCancel: () => void;
  onClickSubmit: () => void;
  isLoading: boolean;
}

export const ManageFolderModal = ({
  folderName,
  folderId,
  setFolderName,
  onClickCancel,
  onClickSubmit,
  isLoading,
  ...props
}: ManageFolderModalProps) => {
  const handleCloseModal = () => {
    onClickCancel();
    setFolderName('');
  };

  return (
    <Modal
      {...props}
      onClose={handleCloseModal}
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
      headerTitle={folderId ? 'Change Folder Name' : 'Add New Folder'}
      body={
        <>
          <Stack className='min-h-[170px] gap-3 px-3 py-8'>
            <Text className='text-base font-semibold'>Folder name</Text>
            <TextInput
              data-autofocus
              value={folderName}
              placeholder='Type folder name here'
              onChange={(e) => setFolderName(e.target.value)}
              maxLength={MAXIMUM_FOLDER_NAME_LENGTH}
            />
          </Stack>
        </>
      }
      onClickCancel={handleCloseModal}
      onClickSubmit={onClickSubmit}
      isLoading={isLoading}
    />
  );
};
