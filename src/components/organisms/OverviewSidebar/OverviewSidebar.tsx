import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { Box, Divider, NavLink } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { useOverviewSidebars, useParams } from '@/contexts';
import { FolderGroup } from '@/molecules/FolderGroup';
import { TeamGroup } from '@/molecules/TeamGroup';
import { useGetMyFoldersQuery } from '@/redux/api/folderApi';
import { useGetMyTeamsQuery } from '@/redux/api/teamApi';
import { cn } from '@/utils';

export const OverviewSidebar = () => {
  const { setParams, params } = useParams();
  const { setActiveFolder, setActiveAllForms, setActiveTeam } =
    useOverviewSidebars();

  const { data: folderList, isLoading: isFolderLoading } =
    useGetMyFoldersQuery();
  const { data: teamList, isLoading: isTeamLoading } = useGetMyTeamsQuery();

  return (
    <nav className='relative h-full w-full overflow-y-scroll border-r border-slate-300 bg-slate-100 text-slate-600'>
      <Box className='sticky top-0 z-10 w-full border border-solid border-slate-300 bg-slate-100 p-3 text-center lg:p-5 lg:pt-3'>
        <Button size='md' title='CREATE FORM' className='w-full font-bold' />
      </Box>
      <Box className='flex-col gap-5 p-3 md:flex lg:p-5 '>
        <FolderGroup folderList={folderList} isLoading={isFolderLoading} />
        <Divider />
        <TeamGroup teamList={teamList} isLoading={isTeamLoading} />
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
    </nav>
  );
};
