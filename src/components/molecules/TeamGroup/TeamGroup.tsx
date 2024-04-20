import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { MdOutlineWarning } from 'react-icons/md';
import { Box, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import {
  useAddMemberMutation,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useRemoveMemberMutation,
  useUpdateTeamMutation,
} from '@/redux/api/teamApi';
import {
  ErrorResponse,
  type ModalType,
  ModalTypes,
  TeamResponse,
} from '@/types';
import { toastify } from '@/utils';

import { ConfirmationModal } from '../ComfirmationModal';
import { ManageFolderModal } from '../ManageFolderModal';
import { ManageMemberModal } from '../ManageMemberModal';
import { ManageTeamModal } from '../ManageTeamModal';
import { TeamList } from '../TeamList';

interface TeamListProps {
  teamList?: TeamResponse[];
  setFolderName: (folderName: string) => void;
  isLoading: boolean;
  createTeam: ReturnType<typeof useCreateTeamMutation>[0];
  updateTeam: ReturnType<typeof useUpdateTeamMutation>[0];
  deleteTeam: ReturnType<typeof useDeleteTeamMutation>[0];
}

export const TeamGroup = ({
  teamList,
  setFolderName,
  isLoading,
  createTeam,
  updateTeam,
  deleteTeam,
}: TeamListProps) => {
  const [teamName, setTeamName] = useState<string>('');
  const [teamId, setTeamId] = useState<number>(0);
  const [modalType, setModalType] = useState<ModalType | ''>('');

  const [addMember] = useAddMemberMutation();
  const [removeMember] = useRemoveMemberMutation();

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const handleInviteMember = (value: { email: string }) => {
    addMember({ id: teamId, email: value.email }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleRemoveMember = (id: number) => {
    removeMember({ id: teamId, memberIds: [id] }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleCreateTeam = () => {
    createTeam({ name: teamName }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleUpdateTeam = () => {
    updateTeam({ id: teamId, data: { name: teamName } }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleDeleteTeam = () => {
    deleteTeam({ id: teamId }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const onClickContinue = () => {};

  //TODO: handle continue button when create new folder
  return (
    <>
      <Text className='font-bold'>MY TEAMS</Text>
      <TeamList
        teamList={teamList}
        isLoading={isLoading}
        openModal={openModal}
        setTeamName={setTeamName}
        setTeamId={setTeamId}
      />
      <Button
        className='font-bold text-slate-500 hover:bg-slate-200 hover:text-slate-500'
        onClick={() => {
          openModal(ModalTypes.CREATE_TEAM);
          setTeamName('');
        }}
        justify='flex-start'
        variant='subtle'
        leftSection={<FaPlusCircle className='size-4' />}
        title='Create a new team'
      />
      <ManageMemberModal
        teamList={teamList}
        teamId={teamId}
        opened={modalType === ModalTypes.MANAGE_TEAM}
        onClose={closeModal}
        handleInviteMember={handleInviteMember}
        handleRemoveMember={handleRemoveMember}
      />
      <ManageFolderModal
        opened={modalType === ModalTypes.CREATE_FOLDER_IN_TEAM}
        onClose={closeModal}
        onClickCancel={closeModal}
        onClickSubmit={onClickContinue}
        setFolderName={setFolderName}
      />
      <ManageTeamModal
        opened={
          modalType === ModalTypes.UPDATE_TEAM ||
          modalType === ModalTypes.CREATE_TEAM
        }
        teamName={teamName}
        teamId={modalType === ModalTypes.CREATE_TEAM ? undefined : teamId}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickSubmit={
          modalType === ModalTypes.CREATE_TEAM
            ? handleCreateTeam
            : handleUpdateTeam
        }
        setTeamName={setTeamName}
      />
      <ConfirmationModal
        body={
          <Box className='flex flex-col items-center px-10'>
            <MdOutlineWarning className='size-28 text-error' />
            <Text size='lg' className='font-bold'>
              Delete teams
            </Text>
            <Text className='text-center'>
              Are you sure you want to delete selected team? <br /> This team
              and all folders will be removed.
            </Text>
          </Box>
        }
        opened={modalType === ModalTypes.DELETE_TEAM}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickConfirm={handleDeleteTeam}
      />
    </>
  );
};
