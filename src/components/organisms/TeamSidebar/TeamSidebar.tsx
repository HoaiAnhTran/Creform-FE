import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { FaFolder, FaStar } from 'react-icons/fa6';
import { IoIosWarning } from 'react-icons/io';
import { IoTrash } from 'react-icons/io5';
import { MdDelete, MdEdit } from 'react-icons/md';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { RiAddBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Group, Menu, NavLink, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { defaultFormsParams, PATH } from '@/constants';
import { useFormParams } from '@/contexts';
import { ConfirmationModal } from '@/molecules/ComfirmationModal';
import { CreateFormModal } from '@/molecules/CreateFormModal';
import { ManageFolderModal } from '@/molecules/ManageFolderModal';
import { initialState, SelectedOptionType } from '@/pages/TeamPage';
import {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
} from '@/redux/api/folderApi';
import {
  ErrorResponse,
  FormResponse,
  ModalType,
  ModalTypes,
  TeamResponse,
} from '@/types';
import { cn, toastify } from '@/utils';

interface TeamSidebarProps {
  team: TeamResponse;
  selectedOption: SelectedOptionType;
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOptionType>>;
  setSelectedRecords: React.Dispatch<React.SetStateAction<FormResponse[]>>;
}

export const TeamSidebar = ({
  team,
  selectedOption,
  setSelectedOption,
  setSelectedRecords,
}: TeamSidebarProps) => {
  const [calledModalType, setCalledModalType] = useState<ModalType | ''>('');
  const openModal = (type: ModalType) => setCalledModalType(type);
  const closeModal = () => setCalledModalType('');

  const setFolderName = (folderName: string) => {
    setSelectedOption((prev) => ({
      folder: { ...prev.folder, name: folderName },
    }));
  };

  const { setParams } = useFormParams();

  const navigate = useNavigate();

  const [createFolder, { isLoading: isFolderCreating }] =
    useCreateFolderMutation();

  const [updateFolder, { isLoading: isFolderUpdating }] =
    useUpdateFolderMutation();

  const [deleteFolder, { isLoading: isFolderDeleting }] =
    useDeleteFolderMutation();

  const handleCreateFolder = () => {
    createFolder({
      teamId: team.id,
      payload: { name: selectedOption.folder.name },
    }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        setSelectedOption({
          folder: {
            id: res.data.data.id,
            name: res.data.data.name,
          },
        });
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleUpdateFolder = () => {
    updateFolder({
      id: selectedOption.folder.id,
      data: { name: selectedOption.folder.name },
    }).then((res) => {
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
    deleteFolder(selectedOption.folder.id).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        setSelectedOption(initialState);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  useEffect(() => {
    setSelectedRecords([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return (
    <Box className='relative h-full w-full bg-quarter-pearl-lusta-50 text-slate-600'>
      <Box className='sticky top-0 z-10 w-full border-x-0 border-b border-t-0 border-solid border-slate-300 bg-inherit px-5 py-3 text-center'>
        <Button
          size='md'
          title='Create form'
          className='w-full font-bold uppercase'
          onClick={() => openModal(ModalTypes.CREATE_FORM)}
        />
      </Box>

      <Box className='flex flex-col gap-2 bg-inherit p-5'>
        <NavLink
          className={cn(
            'rounded-md text-slate-600 hover:bg-quarter-pearl-lusta-100',
            {
              'bg-quarter-pearl-lusta-200 hover:bg-quarter-pearl-lusta-200':
                selectedOption.isAllForms,
            },
          )}
          classNames={{
            label: 'text-sm font-semibold',
          }}
          label='All forms'
          leftSection={<FaFolder className='text-ocean-green-500' />}
          active={selectedOption.isAllForms}
          onClick={() => {
            setSelectedOption({ ...initialState, isAllForms: true });
            setParams({
              ...defaultFormsParams,
              teamId: team.id,
            });
          }}
        />

        {team.folders.map((folder) => {
          const isActiveFolder = folder.id === selectedOption.folder.id;
          return (
            <Group
              key={folder.id}
              className={cn(
                'group cursor-pointer justify-between gap-0 rounded-md pr-2 text-slate-600 hover:bg-quarter-pearl-lusta-100',
                {
                  'bg-quarter-pearl-lusta-200 hover:bg-quarter-pearl-lusta-200':
                    isActiveFolder,
                },
              )}
              onClick={() => {
                setSelectedOption({
                  folder: {
                    id: folder.id,
                    name: folder.name,
                  },
                  isAllForms: false,
                });
                setParams({
                  ...defaultFormsParams,
                  teamId: team.id,
                  folderId: folder.id,
                });
              }}
            >
              <NavLink
                key={folder.id}
                className={cn(
                  'w-[85%] rounded-md text-slate-600 hover:bg-quarter-pearl-lusta-100',
                  {
                    'bg-quarter-pearl-lusta-200 hover:bg-quarter-pearl-lusta-200':
                      isActiveFolder,
                  },
                )}
                classNames={{
                  label: 'text-sm font-semibold',
                }}
                label={folder.name}
                active={isActiveFolder}
                leftSection={
                  <FaFolder size={16} className='text-burnt-sienna-600' />
                }
              />
              <Menu position='bottom-start' withArrow trigger='click'>
                <Menu.Target>
                  <Box className='flex'>
                    <PiDotsThreeOutlineVerticalFill
                      size={18}
                      className='cursor-pointer rounded-md text-slate-600 transition-all duration-[50ms] ease-linear'
                    />
                  </Box>
                </Menu.Target>
                <Menu.Dropdown className='min-w-[180px] !bg-ocean-green-100'>
                  <Menu.Item
                    className='mb-1 mt-0.5 font-medium text-gray-800 transition-all duration-75 ease-linear last-of-type:mb-0 hover:bg-ocean-green-400 hover:text-white'
                    leftSection={<RiAddBoxFill />}
                    onClick={() => {
                      openModal(ModalTypes.CREATE_FORM);
                    }}
                  >
                    Add new form
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      openModal(ModalTypes.UPDATE_FOLDER);
                    }}
                    className='mb-1 font-medium text-gray-800 transition-all duration-75 ease-linear last-of-type:mb-0 hover:bg-ocean-green-400 hover:text-white'
                    leftSection={<MdEdit />}
                  >
                    Change name
                  </Menu.Item>
                  <Menu.Item
                    className='mb-1 font-medium text-gray-800 transition-all duration-75 ease-linear last-of-type:mb-0 hover:bg-ocean-green-400 hover:text-white'
                    leftSection={<MdDelete />}
                    onClick={() => {
                      openModal(ModalTypes.DELETE_FOLDER);
                    }}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          );
        })}

        <Button
          className='h-10 rounded-md font-semibold text-slate-600 hover:bg-quarter-pearl-lusta-100 hover:text-slate-600'
          justify='flex-start'
          variant='subtle'
          leftSection={<FaPlusCircle className='size-4' />}
          onClick={() => {
            openModal(ModalTypes.CREATE_FOLDER);
          }}
          title='Create a new folder'
        />
        <Divider />

        <Box className='flex flex-col gap-2'>
          <NavLink
            className={cn(
              'rounded-md font-semibold text-slate-600 hover:bg-quarter-pearl-lusta-100',
              {
                'bg-quarter-pearl-lusta-200 hover:bg-quarter-pearl-lusta-200':
                  selectedOption.isFavorites,
              },
            )}
            label='Favorites'
            leftSection={<FaStar className='text-amber-500' />}
            onClick={() => {
              setSelectedOption({
                ...initialState,
                isAllForms: false,
                isFavorites: true,
              });
              setParams({
                ...defaultFormsParams,
                teamId: team.id,
                isFavourite: 1,
              });
            }}
          />
          <NavLink
            className={cn(
              'rounded-md font-semibold text-slate-600 hover:bg-quarter-pearl-lusta-100',
              {
                'bg-quarter-pearl-lusta-200 hover:bg-quarter-pearl-lusta-200':
                  selectedOption.isTrash,
              },
            )}
            label='Trash'
            leftSection={<IoTrash className='text-slate-600' />}
            onClick={() => {
              setSelectedOption({
                ...initialState,
                isAllForms: false,
                isTrash: true,
              });
              setParams({
                ...defaultFormsParams,
                teamId: team.id,
                isDeleted: 1,
              });
            }}
          />
        </Box>
        <Divider />
      </Box>

      <CreateFormModal
        opened={calledModalType === ModalTypes.CREATE_FORM}
        onClose={closeModal}
        handleClickStartFromScratch={() =>
          navigate(PATH.BUILD_FORM_PAGE, {
            state: {
              folderId:
                selectedOption.folder.id === ''
                  ? undefined
                  : selectedOption.folder.id,
              teamId: team.id === '' ? undefined : team.id,
            },
          })
        }
        handleClickUseTemplate={() =>
          navigate(PATH.TEMPLATES_PAGE, {
            state: {
              folderId:
                selectedOption.folder.id === ''
                  ? undefined
                  : selectedOption.folder.id,
              teamId: team.id === '' ? undefined : team.id,
            },
          })
        }
      />
      <ManageFolderModal
        opened={calledModalType === ModalTypes.CREATE_FOLDER}
        onClose={closeModal}
        folderId={undefined}
        folderName={selectedOption.folder.name}
        setFolderName={setFolderName}
        onClickCancel={closeModal}
        isLoading={isFolderCreating}
        onClickSubmit={handleCreateFolder}
      />
      <ManageFolderModal
        opened={calledModalType === ModalTypes.UPDATE_FOLDER}
        onClose={closeModal}
        folderId={selectedOption.folder.id}
        folderName={selectedOption.folder.name}
        setFolderName={setFolderName}
        onClickCancel={closeModal}
        onClickSubmit={handleUpdateFolder}
        isLoading={isFolderUpdating}
      />
      <ConfirmationModal
        size='lg'
        body={
          <Box className='flex flex-col items-center gap-3 px-10 py-5 text-center'>
            <IoIosWarning className='size-28 text-error' />
            <Text size='lg' className='font-bold'>
              Delete folder
            </Text>
            <Text className='text-sm leading-6'>
              Are you sure you want to delete this folder? <br />
              This folder and all forms in the folder will be deleted
              permanently.
            </Text>
          </Box>
        }
        opened={calledModalType === ModalTypes.DELETE_FOLDER}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickConfirm={handleDeleteFolder}
        isLoading={isFolderDeleting}
      />
    </Box>
  );
};
