import { useEffect } from 'react';
import { FaFolder } from 'react-icons/fa';
import { MdDelete, MdEdit, MdOutlineWarning } from 'react-icons/md';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { RiAddBoxFill } from 'react-icons/ri';
import { Box, Group, Menu, NavLink, Stack, Text } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

import { defaultFormsParams } from '@/constants/defaultFormsParams';
import { useOverviewSidebars } from '@/contexts';
import { useFormParams } from '@/contexts';
import {
  useDeleteFolderMutation,
  useUpdateFolderMutation,
} from '@/redux/api/folderApi';
import {
  ErrorResponse,
  FolderResponse,
  type ModalType,
  ModalTypes,
  TeamResponse,
} from '@/types';
import { cn, toastify } from '@/utils';

import { ConfirmationModal } from '../ComfirmationModal';
import { LoadingDots } from '../LoadingDots';
import { ManageFolderModal } from '../ManageFolderModal';

interface FolderListProps {
  folderList?: FolderResponse[] | TeamResponse['folders'];
  isLoading: boolean;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  setFolderName: (folderName: string) => void;
  setFolderId: (folderId: number) => void;
  modalType: ModalType | '';
  folderName: string;
  folderId: number;
}

export const FolderList = ({
  openModal,
  closeModal,
  setFolderName,
  setFolderId,
  modalType,
  folderName,
  folderId,
  folderList,
  isLoading,
}: FolderListProps) => {
  const {
    activeFolder,
    setActiveFolder,
    activeAllForms,
    setActiveAllForms,
    setActiveTeam,
  } = useOverviewSidebars();
  useEffect(() => {
    if (activeFolder === -1 && !activeAllForms) return;
    setActiveTeam(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFolder, activeAllForms]);

  const { setParams } = useFormParams();

  const [updateFolder, { isLoading: isFolderUpdating }] =
    useUpdateFolderMutation();
  const [deleteFolder, { isLoading: isFolderDeleting }] =
    useDeleteFolderMutation();

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
      <Stack className='flex flex-col justify-between gap-2'>
        {isLoading ? (
          <LoadingDots color='green' />
        ) : (
          folderList?.map((folder) => {
            const isActiveFolder = folder.id === activeFolder;
            return (
              <Group
                key={uuidv4()}
                className={cn(
                  'gap-0 hover:rounded-md hover:bg-slate-300',
                  isActiveFolder && !activeAllForms
                    ? 'rounded-md bg-slate-400 text-white hover:bg-slate-400'
                    : 'hover:rounded-md hover:bg-slate-300',
                )}
              >
                <NavLink
                  key={folder.id}
                  className={cn(
                    'w-[85%] font-bold',
                    isActiveFolder && !activeAllForms
                      ? 'rounded-md bg-slate-400 text-white hover:bg-slate-400'
                      : 'hover:rounded-md hover:bg-slate-300',
                  )}
                  onClick={() => {
                    setActiveFolder(folder.id);
                    setActiveAllForms(false);
                    setParams({ ...defaultFormsParams, folderId: folder.id });
                  }}
                  label={folder.name}
                  active={isActiveFolder && !activeAllForms}
                  leftSection={
                    <FaFolder
                      className={
                        isActiveFolder && !activeAllForms ? 'text-white' : ''
                      }
                    />
                  }
                />
                <Menu
                  position='bottom-start'
                  withArrow
                  classNames={{
                    arrow: 'border-malachite-400',
                  }}
                >
                  <Menu.Target>
                    <Box className='flex'>
                      <PiDotsThreeOutlineVerticalFill
                        size='1.5rem'
                        className='rounded-md text-slate-100 hover:bg-slate-200 hover:text-slate-600'
                      />
                    </Box>
                  </Menu.Target>
                  <Menu.Dropdown className='border-malachite-400 bg-malachite-400'>
                    <Menu.Item
                      className='font-bold text-white hover:bg-malachite-500'
                      leftSection={<RiAddBoxFill />}
                    >
                      Add new form
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        openModal(ModalTypes.UPDATE_FOLDER);
                        setFolderName(folder.name);
                        setFolderId(folder.id);
                      }}
                      className='font-bold text-white hover:bg-malachite-500'
                      leftSection={<MdEdit />}
                    >
                      Change name
                    </Menu.Item>
                    <Menu.Item
                      className='font-bold text-white hover:bg-malachite-500'
                      leftSection={<MdDelete />}
                      onClick={() => {
                        openModal(ModalTypes.DELETE_FOLDER);
                        setFolderId(folder.id);
                      }}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            );
          })
        )}
      </Stack>
      <ManageFolderModal
        opened={modalType === ModalTypes.UPDATE_FOLDER}
        onClose={closeModal}
        folderName={folderName}
        folderId={folderId}
        setFolderName={setFolderName}
        onClickCancel={closeModal}
        onClickSubmit={handleUpdateFolder}
        isLoading={isFolderUpdating}
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
        isLoading={isFolderDeleting}
      />
    </>
  );
};
