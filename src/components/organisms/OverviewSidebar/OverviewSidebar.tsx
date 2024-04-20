import { useState } from 'react';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, NavLink } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants/routes';
import { useFormParams, useOverviewSidebars } from '@/contexts';
import { FolderGroup } from '@/molecules/FolderGroup';
import { TeamGroup } from '@/molecules/TeamGroup';
import {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useGetMyFoldersQuery,
  useUpdateFolderMutation,
} from '@/redux/api/folderApi';
import {
  useCreateTeamMutation,
  useGetMyTeamsQuery,
  useUpdateTeamMutation,
} from '@/redux/api/teamApi';
import { cn } from '@/utils';

export const OverviewSidebar = () => {
  const [folderName, setFolderName] = useState<string>('');
  const { setActiveFolder, setActiveAllForms, setActiveTeam } =
    useOverviewSidebars();
  const { setParams, params } = useFormParams();

  const navigate = useNavigate();

  const { data: folderList, isLoading: isFolderLoading } =
    useGetMyFoldersQuery();
  const [createFolder] = useCreateFolderMutation();
  const [updateFolder] = useUpdateFolderMutation();
  const [deleteFolder] = useDeleteFolderMutation();

  const { data: teamList, isLoading: isTeamLoading } = useGetMyTeamsQuery();
  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();

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
      <Box className='flex-col gap-5 overflow-y-scroll bg-slate-100 p-3 md:flex lg:p-5'>
        <FolderGroup
          folderList={folderList}
          isLoading={isFolderLoading}
          createFolder={createFolder}
          updateFolder={updateFolder}
          deleteFolder={deleteFolder}
          folderName={folderName}
          setFolderName={setFolderName}
        />
        <Divider />
        <TeamGroup
          teamList={teamList}
          isLoading={isTeamLoading}
          createTeam={createTeam}
          updateTeam={updateTeam}
          setFolderName={setFolderName}
        />
        <Divider />
        <NavLink
          className={cn('rounded-md  font-bold hover:bg-slate-200', {
            'bg-slate-400 text-white': params.isFavourite,
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
            'bg-slate-400 text-white': params.isDeleted,
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
  );
};
