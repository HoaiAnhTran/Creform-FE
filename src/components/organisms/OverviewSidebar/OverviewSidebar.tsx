import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { Divider, NavLink } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { FolderGroup } from '@/molecules/FolderGroup';
import { TeamGroup } from '@/molecules/TeamGroup';
//TODO: Get Folder and Team
const folderList = [
  { id: '1', name: 'Folder 1' },
  { id: '2', name: 'Folder 2' },
  { id: '3', name: 'Folder 3' },
];
const teamList = [
  { id: '1', name: 'Team 1' },
  { id: '2', name: 'Team 2' },
  { id: '3', name: 'Team 3' },
];
export const OverviewSidebar = () => (
  <nav className='fixed bottom-0 left-0 top-0 hidden flex-col gap-5 border-r border-slate-300 bg-slate-100 p-3 text-slate-600 md:flex lg:w-72 lg:p-5'>
    <Button size='lg' title='CREATE FORM' className='font-bold' />
    <FolderGroup folderList={folderList} />
    <Divider />
    <TeamGroup teamList={teamList} />
    <Divider />
    <NavLink
      className='font-bold'
      label='Fovarites'
      leftSection={<FaStar className='text-amber-500' />}
    />
    <NavLink
      className='font-bold'
      label='Trash'
      leftSection={<FaTrashAlt className='text-gray-400' />}
    />
  </nav>
);
