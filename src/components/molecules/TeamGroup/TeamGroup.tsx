import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { type ModalType, ModalTypes, Team } from '@/types';

import { CreateTeamModal } from '../CreateTeamModal';
import { ManageFolderModal } from '../ManageFolderModal';
import { ManageMemberModal } from '../ManageMemberModal';
import { TeamList } from '../TeamList';

interface TeamListProps {
  teamList: Team[];
}

export const TeamGroup = ({ teamList }: TeamListProps) => {
  const [modalType, setModalType] = useState<ModalType | ''>('');
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');
  const handleInviteMember = () => {};
  const handleCreateTeam = () => {};
  const onClickContinue = () => {};

  //TODO: handle continue button when create new folder
  return (
    <>
      <Text className='font-bold'>MY TEAMS</Text>
      <TeamList teamList={teamList} openModal={openModal} />
      <Button
        className='font-bold text-slate-500 hover:bg-slate-200 hover:text-slate-500'
        onClick={() => openModal(ModalTypes.CREATE_TEAM)}
        justify='flex-start'
        variant='subtle'
        leftSection={<FaPlusCircle className='size-4' />}
        title='Create a new team'
      />
      <ManageMemberModal
        opened={modalType === ModalTypes.MANAGE_TEAM}
        onClose={closeModal}
        handleInviteMember={handleInviteMember}
      />
      <ManageFolderModal
        opened={modalType === ModalTypes.CREATE_FOLDER_IN_TEAM}
        onClose={closeModal}
        onClickCancel={closeModal}
        onClickSubmit={onClickContinue}
      />
      <CreateTeamModal
        opened={modalType === ModalTypes.CREATE_TEAM}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickCreateTeam={handleCreateTeam}
      />
    </>
  );
};
