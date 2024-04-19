import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { MdOutlineWarning } from 'react-icons/md';
import { Box, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { ConfirmationModal } from '@/molecules/ComfirmationModal';
import { ManageFolderModal } from '@/molecules/ManageFolderModal';
import { FolderResponse, type ModalType, ModalTypes } from '@/types';

import { FolderList } from '../FolderList';

interface FolderListProps {
  folderList?: FolderResponse[];
  isLoading: boolean;
}

export const FolderGroup = ({ folderList, isLoading }: FolderListProps) => {
  const [folderName, setFolderName] = useState<string>('');
  const [modalType, setModalType] = useState<ModalType | ''>('');
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');
  const onClickContinue = () => {};
  const onClickConfirm = () => {};

  return (
    <>
      <Text className='font-bold'>MY FORMS</Text>
      <FolderList
        folderList={folderList}
        isLoading={isLoading}
        openModal={openModal}
        setFolderName={setFolderName}
      />
      <Button
        className='font-bold text-slate-500 hover:bg-slate-200 hover:text-slate-500'
        justify='flex-start'
        variant='subtle'
        leftSection={<FaPlusCircle className='size-4' />}
        onClick={() => openModal(ModalTypes.CREATE_FOLDER)}
        title='Create a new folder'
      />
      <ManageFolderModal
        opened={modalType === ModalTypes.UPDATE_FOLDER}
        onClose={closeModal}
        folderName={folderName}
        onClickCancel={closeModal}
        onClickSubmit={onClickContinue}
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
        onClickConfirm={onClickConfirm}
      />
      <ManageFolderModal
        opened={modalType === ModalTypes.CREATE_FOLDER}
        onClose={closeModal}
        onClickCancel={closeModal}
        onClickSubmit={onClickContinue}
      />
    </>
  );
};
