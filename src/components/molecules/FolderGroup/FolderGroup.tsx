import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { MdOutlineWarning } from 'react-icons/md';
import { Box, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { ConfirmationModal } from '@/molecules/ComfirmationModal';
import { ManageFolderModal } from '@/molecules/ManageFolderModal';
import {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
} from '@/redux/api/folderApi';
import {
  ErrorResponse,
  FolderResponse,
  type ModalType,
  ModalTypes,
} from '@/types';
import { toastify } from '@/utils';

import { FolderList } from '../FolderList';

interface FolderListProps {
  folderName: string;
  setFolderName: (folderName: string) => void;
  folderList?: FolderResponse[];
  isLoading: boolean;
  createFolder: ReturnType<typeof useCreateFolderMutation>[0];
  updateFolder: ReturnType<typeof useUpdateFolderMutation>[0];
  deleteFolder: ReturnType<typeof useDeleteFolderMutation>[0];
}

export const FolderGroup = ({
  folderName,
  setFolderName,
  folderList,
  isLoading,
  createFolder,
  updateFolder,
  deleteFolder,
}: FolderListProps) => {
  const [folderId, setFolderId] = useState<number>(0);
  const [modalType, setModalType] = useState<ModalType | ''>('');

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const handleCreateFolder = () => {
    createFolder({ name: folderName }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleUpdateFolder = () => {
    updateFolder({ id: folderId, data: { name: folderName } }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleDeleteFolder = () => {
    deleteFolder(folderId).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  return (
    <>
      <Text className='font-bold'>MY FORMS</Text>
      <FolderList
        folderList={folderList}
        isLoading={isLoading}
        openModal={openModal}
        setFolderName={setFolderName}
        setFolderId={setFolderId}
      />
      <Button
        className='font-bold text-slate-500 hover:bg-slate-200 hover:text-slate-500'
        justify='flex-start'
        variant='subtle'
        leftSection={<FaPlusCircle className='size-4' />}
        onClick={() => {
          openModal(ModalTypes.CREATE_FOLDER);
          setFolderName('');
        }}
        title='Create a new folder'
      />
      <ManageFolderModal
        opened={
          modalType === ModalTypes.UPDATE_FOLDER ||
          modalType === ModalTypes.CREATE_FOLDER
        }
        onClose={closeModal}
        folderName={folderName}
        folderId={modalType === ModalTypes.CREATE_FOLDER ? undefined : folderId}
        setFolderName={setFolderName}
        onClickCancel={closeModal}
        onClickSubmit={
          modalType === ModalTypes.CREATE_FOLDER
            ? handleCreateFolder
            : handleUpdateFolder
        }
      />
      <ConfirmationModal
        body={
          <Box className='flex flex-col items-center px-10'>
            <MdOutlineWarning className='size-28 text-error' />
            <Text size='lg' className='font-bold'>
              Delete folders
            </Text>
            <Text className='text-center'>
              Are you sure you want to delete selected folder? This folder and
              all sub-folders will be removed.
            </Text>
          </Box>
        }
        opened={modalType === ModalTypes.DELETE_FOLDER}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickConfirm={handleDeleteFolder}
      />
    </>
  );
};
