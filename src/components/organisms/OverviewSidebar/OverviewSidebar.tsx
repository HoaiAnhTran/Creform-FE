import { useState } from 'react';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, NavLink } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants/routes';
import { useFormParams, useOverviewSidebars } from '@/contexts';
import { FolderGroup } from '@/molecules/FolderGroup';
import { TeamGroup } from '@/molecules/TeamGroup';
import { useGetMyFoldersQuery } from '@/redux/api/folderApi';
import { cn } from '@/utils';

export const OverviewSidebar = () => {
  const [folderName, setFolderName] = useState<string>('');
  const [folderId, setFolderId] = useState<number>(0);

  const { setActiveFolder, setActiveAllForms, setActiveTeam } =
    useOverviewSidebars();
  const { setParams, params } = useFormParams();

  const navigate = useNavigate();

  const { data: folderList, isLoading: isFolderLoading } =
    useGetMyFoldersQuery();

  const folderListNotInTeam = folderList?.filter((folder) => !folder.teamId);

  return (
    <Box className='relative h-full w-full border-r border-slate-300 bg-slate-100 text-slate-600'>
      <Box className='sticky top-0 z-10 w-full border border-solid border-slate-300 bg-slate-100 p-4 text-center'>
        <Button
          size='md'
          title='CREATE FORM'
          className='w-full font-bold'
          onClick={() => navigate(PATH.BUILD_FORM_PAGE)}
        />
      </Box>
      <Box className='flex flex-col gap-5 overflow-y-scroll bg-slate-100 p-3 lg:p-5'>
        <Box>
          <FolderGroup
            folderList={folderListNotInTeam}
            isLoading={isFolderLoading}
            folderName={folderName}
            setFolderName={setFolderName}
            folderId={folderId}
            setFolderId={setFolderId}
          />
        </Box>
        <Divider />
        <Box>
          <TeamGroup
            setFolderName={setFolderName}
            setFolderId={setFolderId}
            folderName={folderName}
            folderId={folderId}
          />
        </Box>
        <Divider />
        <Box>
          <NavLink
            className={cn('rounded-md  font-bold hover:bg-slate-200', {
              'bg-slate-400 text-white hover:bg-slate-400': params.isFavourite,
            })}
            label='Favorites'
            leftSection={<FaStar className='text-amber-500' />}
            onClick={() => {
              setParams({ isFavourite: 1 });
              setActiveFolder(-1);
              setActiveTeam(-1);
              setActiveAllForms(false);
            }}
          />
          <NavLink
            className={cn('rounded-md  font-bold hover:bg-slate-200', {
              'bg-slate-400 text-white hover:bg-slate-400': params.isDeleted,
            })}
            label='Trash'
            leftSection={
              <FaTrashAlt
                className={cn('text-gray-400', {
                  'text-white': params.isDeleted,
                })}
              />
            }
            onClick={() => {
              setParams({ isDeleted: 1 });
              setActiveAllForms(false);
              setActiveFolder(-1);
              setActiveTeam(-1);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
