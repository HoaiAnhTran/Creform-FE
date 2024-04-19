import { useEffect } from 'react';
import { FaFolder } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { RiAddBoxFill } from 'react-icons/ri';
import { Box, Group, Menu, NavLink, Stack } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

import { useOverviewSidebars, useParams } from '@/contexts';
import { FolderResponse, type ModalType, ModalTypes } from '@/types';
import { cn } from '@/utils';

import { LoadingDots } from '../LoadingDots';

interface FolderListProps {
  folderList?: FolderResponse[];
  isLoading: boolean;
  openModal: (type: ModalType) => void;
  setFolderName: (arg0: string) => void;
}

export const FolderList = ({
  folderList = [],
  isLoading,
  openModal,
  setFolderName,
}: FolderListProps) => {
  const { setParams } = useParams();
  const {
    activeFolder,
    setActiveFolder,
    activeAllForms,
    setActiveAllForms,
    setActiveTeam,
  } = useOverviewSidebars();

  useEffect(() => {
    if (activeFolder > -1 || activeAllForms) {
      setActiveTeam(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFolder, activeAllForms]);

  return (
    <Stack className='flex flex-col justify-between gap-3'>
      <NavLink
        className={cn(
          'font-bold',
          activeAllForms
            ? 'rounded-md bg-slate-400 text-white hover:bg-slate-400'
            : 'hover:rounded-md hover:bg-slate-300',
        )}
        label='All forms'
        leftSection={<FaFolder />}
        active={activeAllForms}
        onClick={() => {
          setActiveAllForms(!activeAllForms);
          setParams({});
        }}
      ></NavLink>
      {isLoading ? (
        <LoadingDots />
      ) : (
        folderList.map((folder) => (
          <Group
            key={uuidv4()}
            className={cn(
              'gap-0 hover:rounded-md hover:bg-slate-300',
              folder.id === activeFolder && !activeAllForms
                ? 'rounded-md bg-slate-400 text-white hover:bg-slate-400'
                : 'hover:rounded-md hover:bg-slate-300',
            )}
          >
            <NavLink
              key={folder.id}
              className={cn(
                'w-[85%] font-bold',
                folder.id === activeFolder && !activeAllForms
                  ? 'rounded-md bg-slate-400 text-white hover:bg-slate-400'
                  : 'hover:rounded-md hover:bg-slate-300',
              )}
              onClick={() => {
                setActiveFolder(folder.id);
                setActiveAllForms(false);
              }}
              label={folder.name}
              active={folder.id === activeFolder && !activeAllForms}
              leftSection={
                <FaFolder
                  className={
                    folder.id === activeFolder && !activeAllForms
                      ? 'text-white'
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
                  leftSection={<RiAddBoxFill />}
                >
                  Add new form
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    openModal(ModalTypes.UPDATE_FOLDER);
                    setFolderName(folder.name);
                  }}
                  className='font-bold text-white hover:bg-malachite-500'
                  leftSection={<MdEdit />}
                >
                  Change name
                </Menu.Item>
                <Menu.Item
                  className='font-bold text-white hover:bg-malachite-500'
                  leftSection={<MdDelete />}
                  onClick={() => openModal(ModalTypes.DELETE_FOLDER)}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        ))
      )}
    </Stack>
  );
};
