import { useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { RiFolderAddFill, RiTeamFill } from 'react-icons/ri';
import { Avatar, Box, Group, Menu, NavLink } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

import { useOverviewSidebars } from '@/contexts';
import { type ModalType, ModalTypes, TeamResponse } from '@/types';
import { cn } from '@/utils';

import { LoadingDots } from '../LoadingDots';

interface TeamListProps {
  teamList?: TeamResponse[];
  isLoading: boolean;
  openModal: (type: ModalType) => void;
  setTeamName: (teamName: string) => void;
  setTeamId: (teamId: number) => void;
}
export const TeamList = ({
  teamList = [],
  isLoading,
  openModal,
  setTeamName,
  setTeamId,
}: TeamListProps) => {
  const { activeTeam, setActiveTeam, setActiveAllForms, setActiveFolder } =
    useOverviewSidebars();
  useEffect(() => {
    if (activeTeam > -1) {
      setActiveAllForms(false);
      setActiveFolder(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTeam]);
  return (
    <Box className='flex flex-col justify-between gap-3'>
      {isLoading ? (
        <LoadingDots />
      ) : (
        teamList.map((team) => (
          <Group
            key={uuidv4()}
            className={cn(
              'gap-0 hover:rounded-md hover:bg-slate-300',
              team.id === activeTeam
                ? 'rounded-md bg-slate-400 text-white hover:bg-slate-400'
                : 'hover:rounded-md hover:bg-slate-300',
            )}
          >
            <NavLink
              key={team.id}
              className={cn(
                'w-[85%] font-bold',
                team.id === activeTeam
                  ? 'rounded-md bg-slate-400 text-white hover:bg-slate-400'
                  : 'hover:rounded-md hover:bg-slate-300',
              )}
              onClick={() => setActiveTeam(team.id)}
              label={team.name}
              active={team.id === activeTeam}
              leftSection={
                <Avatar
                  size='sm'
                  src={team.logoUrl}
                  className={
                    team.id === activeTeam && !team.logoUrl
                      ? 'rounded-full bg-white'
                      : ''
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
                  leftSection={<RiTeamFill />}
                  onClick={() => {
                    openModal(ModalTypes.MANAGE_TEAM);
                    setTeamId(team.id);
                  }}
                >
                  Manage member
                </Menu.Item>
                <Menu.Item
                  className='font-bold text-white hover:bg-malachite-500'
                  leftSection={<RiFolderAddFill />}
                  onClick={() => openModal(ModalTypes.CREATE_FOLDER_IN_TEAM)}
                >
                  Add new folder
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    openModal(ModalTypes.UPDATE_TEAM);
                    setTeamName(team.name);
                    setTeamId(team.id);
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
                    openModal(ModalTypes.DELETE_TEAM);
                    setTeamId(team.id);
                  }}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        ))
      )}
    </Box>
  );
};
