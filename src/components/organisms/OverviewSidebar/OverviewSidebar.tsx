import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoTrash } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, NavLink } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { defaultFormsParams } from '@/constants/defaultFormsParams';
import { PATH } from '@/constants/routes';
import { useFormParams, useOverviewContext } from '@/contexts';
import { CreateFormModal } from '@/molecules/CreateFormModal';
import { FolderGroup } from '@/molecules/FolderGroup';
import { TeamGroup } from '@/molecules/TeamGroup';
import { useGetMyFoldersQuery } from '@/redux/api/folderApi';
import { ModalType, ModalTypes } from '@/types';
import { cn } from '@/utils';

export const OverviewSidebar = () => {
  const [folderName, setFolderName] = useState<string>('');
  const [folderId, setFolderId] = useState<string>('');

  const [modalType, setModalType] = useState<ModalType | ''>('');
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const {
    activeFolder,
    activeTeam,
    setActiveFolder,
    setActiveAllForms,
    setActiveTeam,
    setSelectedRecords,
  } = useOverviewContext();
  const { setParams, params } = useFormParams();

  const navigate = useNavigate();

  const { data: folderList, isLoading: isFolderLoading } =
    useGetMyFoldersQuery();

  const folderListNotInTeam = folderList?.filter((folder) => !folder.teamId);

  return (
    <>
      <Box className='relative h-full w-full bg-quarter-pearl-lusta-50 text-slate-600'>
        <Box className='sticky top-0 z-10 w-full border border-x-0 border-solid border-slate-300 bg-inherit px-5 py-4 text-center'>
          <Button
            size='md'
            title='Create form'
            className='w-full font-bold uppercase'
            onClick={() => openModal(ModalTypes.CREATE_FORM)}
          />
        </Box>
        <Box className='flex flex-col gap-5 bg-inherit p-5'>
          <FolderGroup
            folderList={folderListNotInTeam}
            isLoading={isFolderLoading}
            folderName={folderName}
            setFolderName={setFolderName}
            folderId={folderId}
            setFolderId={setFolderId}
          />
          <Divider />
          <TeamGroup
            setFolderName={setFolderName}
            setFolderId={setFolderId}
            folderName={folderName}
            folderId={folderId}
          />
          <Divider />
          <Box className='flex flex-col gap-2'>
            <NavLink
              className={cn(
                'h-10 rounded-md font-semibold text-slate-600 hover:bg-quarter-pearl-lusta-100',
                {
                  'bg-quarter-pearl-lusta-200 hover:bg-quarter-pearl-lusta-200':
                    params.isFavourite,
                },
              )}
              label='Favorites'
              leftSection={<FaStar className='text-amber-500' />}
              onClick={() => {
                setParams({
                  ...defaultFormsParams,
                  isFavourite: 1,
                });
                setActiveFolder('');
                setActiveTeam('');
                setActiveAllForms(false);
                setSelectedRecords([]);
              }}
            />
            <NavLink
              className={cn(
                'h-10 rounded-md font-semibold text-slate-600 hover:bg-quarter-pearl-lusta-100',
                {
                  'bg-quarter-pearl-lusta-200 hover:bg-quarter-pearl-lusta-200':
                    params.isDeleted,
                },
              )}
              label='Trash'
              leftSection={<IoTrash className='text-slate-600' />}
              onClick={() => {
                setParams({
                  ...defaultFormsParams,
                  isDeleted: 1,
                });
                setActiveAllForms(false);
                setActiveFolder('');
                setActiveTeam('');
                setSelectedRecords([]);
              }}
            />
          </Box>
        </Box>
      </Box>

      <CreateFormModal
        opened={modalType === ModalTypes.CREATE_FORM}
        onClose={closeModal}
        handleClickStartFromScratch={() =>
          navigate(PATH.BUILD_FORM_PAGE, {
            state: {
              folderId: activeFolder === '' ? undefined : activeFolder,
              teamId: activeTeam === '' ? undefined : activeTeam,
            },
          })
        }
        handleClickUseTemplate={() =>
          navigate(PATH.TEMPLATES_PAGE, {
            state: {
              folderId: activeFolder === '' ? undefined : activeFolder,
              teamId: activeTeam === '' ? undefined : activeTeam,
            },
          })
        }
      />
    </>
  );
};
