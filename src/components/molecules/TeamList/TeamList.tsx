import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { RiFolderAddFill, RiTeamFill } from 'react-icons/ri';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import {
  Avatar,
  Box,
  Collapse,
  Group,
  Menu,
  NavLink,
  Stack,
  Text,
} from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

import { defaultFormsParams } from '@/constants/defaultFormsParams';
import { useFormParams, useOverviewContext } from '@/contexts';
import { type ModalType, ModalTypes, TeamResponse } from '@/types';
import { cn } from '@/utils';

import { FolderList } from '../FolderList';
import { LoadingDots } from '../LoadingDots';

interface TeamListProps {
  teamList?: TeamResponse[];
  isLoading: boolean;
  setTeamName: (teamName: string) => void;
  setTeamId: (teamId: number) => void;
  setFolderName: (folderName: string) => void;
  setFolderId: (folderId: number) => void;
  folderName: string;
  folderId: number;
  modalType: ModalType | '';
  setModalType: (modalType: ModalType | '') => void;
}
export const TeamList = ({
  teamList = [],
  isLoading,
  setTeamName,
  setTeamId,
  setFolderName,
  setFolderId,
  folderName,
  folderId,
  modalType,
  setModalType,
}: TeamListProps) => {
  const {
    activeTeam,
    activeFolder,
    setActiveTeam,
    setActiveAllForms,
    setActiveFolder,
    setSelectedRecords,
  } = useOverviewContext();
  const openModal = (type: ModalType) => setModalType(type);

  const closeModal = () => setModalType('');
  const { setParams } = useFormParams();
  const [activeColappse, setActiveCollapse] = useState<number[]>([]);

  const handleActiveCollapse = (teamId: number) => {
    setActiveCollapse((prev) => {
      if (prev.includes(teamId)) return prev.filter((prev) => prev !== teamId);
      return [...prev, teamId];
    });
  };

  return (
    <Box className='mt-3 flex flex-col justify-between gap-2'>
      {isLoading ? (
        <LoadingDots color='green' />
      ) : (
        teamList.map((team) => {
          const isActiveTeam = team.id === activeTeam && activeFolder === -1;

          return (
            <Stack className='gap-2'>
              <Group
                key={uuidv4()}
                className={cn(
                  'gap-0 hover:rounded-md hover:bg-slate-300',
                  isActiveTeam
                    ? 'rounded-md bg-slate-400 text-white hover:bg-slate-400'
                    : 'hover:rounded-md hover:bg-slate-300',
                )}
              >
                <NavLink
                  key={team.id}
                  className={cn(
                    'w-[85%] font-bold',
                    isActiveTeam
                      ? 'rounded-md bg-slate-400 text-white hover:bg-slate-400'
                      : 'hover:rounded-md hover:bg-slate-300',
                  )}
                  onClick={() => {
                    setActiveTeam(team.id);
                    setActiveAllForms(false);
                    setActiveFolder(-1);
                    setSelectedRecords([]);
                    setParams({ ...defaultFormsParams, teamId: team.id });
                  }}
                  label={
                    <Group className='items-center'>
                      <Text className='font-bold'>{team.name}</Text>
                      {team.folders.length > 0 &&
                        (activeColappse.includes(team.id) ? (
                          <TiArrowSortedUp
                            onClick={() => {
                              handleActiveCollapse(team.id);
                            }}
                          />
                        ) : (
                          <TiArrowSortedDown
                            onClick={() => {
                              handleActiveCollapse(team.id);
                            }}
                          />
                        ))}
                    </Group>
                  }
                  active={isActiveTeam}
                  leftSection={
                    team.logoUrl ? (
                      <Avatar size='sm' src={team.logoUrl} />
                    ) : (
                      <RiTeamFill size={18} />
                    )
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
                        size='1.4rem'
                        className='cursor-pointer rounded-md text-slate-100 hover:text-slate-600'
                      />
                    </Box>
                  </Menu.Target>
                  <Menu.Dropdown className='border-malachite-400 !bg-malachite-400'>
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
                      onClick={() => {
                        openModal(ModalTypes.CREATE_FOLDER);
                        setTeamId(team.id);
                      }}
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
              {team.folders.length > 0 && activeColappse.includes(team.id) && (
                <Collapse in={true}>
                  <Box className='pl-3'>
                    <FolderList
                      folderList={team.folders}
                      isLoading={isLoading}
                      openModal={openModal}
                      setFolderName={setFolderName}
                      setFolderId={setFolderId}
                      modalType={modalType}
                      closeModal={closeModal}
                      folderName={folderName}
                      folderId={folderId}
                      teamId={team.id}
                    />
                  </Box>
                </Collapse>
              )}
            </Stack>
          );
        })
      )}
    </Box>
  );
};
