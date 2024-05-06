import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { useOverviewContext } from '@/contexts';
import { useCreateFolderMutation } from '@/redux/api/folderApi';
import { useCreateInvitationMutation } from '@/redux/api/invitationApi';
import {
  useCreateTeamMutation,
  useGetMyTeamsQuery,
  useRemoveMemberMutation,
  useUpdateTeamMutation,
} from '@/redux/api/teamApi';
import { ErrorResponse, type ModalType, ModalTypes } from '@/types';
import { toastify } from '@/utils';

import { ManageFolderModal } from '../ManageFolderModal';
import { ManageMemberModal } from '../ManageMemberModal';
import { ManageTeamModal } from '../ManageTeamModal';
import { TeamList } from '../TeamList';

interface TeamListProps {
  setFolderName: (folderName: string) => void;
  setFolderId: (folderId: number) => void;
  folderId: number;
  folderName: string;
}

export const TeamGroup = ({
  setFolderName,
  setFolderId,
  folderId,
  folderName,
}: TeamListProps) => {
  const [teamName, setTeamName] = useState<string>('');
  const [teamId, setTeamId] = useState<number>(0);
  const [modalType, setModalType] = useState<ModalType | ''>('');

  const { setActiveAllForms, setActiveFolder, setActiveTeam } =
    useOverviewContext();

  const [createInvitation, { isLoading: isSendingInvitation }] =
    useCreateInvitationMutation();

  const [removeMember, { isLoading: isRemovingMember }] =
    useRemoveMemberMutation();

  const { data: teamList, isLoading: isTeamLoading } = useGetMyTeamsQuery();

  const [createTeam, { isLoading: isTeamCreating }] = useCreateTeamMutation();

  const [updateTeam, { isLoading: isTeamUpdating }] = useUpdateTeamMutation();

  const [createFolder, { isLoading: isFolderInTeamCreating }] =
    useCreateFolderMutation();

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const handleCreateFolderInTeam = () => {
    createFolder({ teamId: teamId, payload: { name: folderName } }).then(
      (res) => {
        if ('data' in res) {
          toastify.displaySuccess(res.data.message as string);
          setActiveAllForms(false);
          setActiveFolder(res.data.data.id);
          setActiveTeam(res.data.data.teamId);
          closeModal();
          return;
        }
        if (res.error as ErrorResponse)
          toastify.displayError((res.error as ErrorResponse).message as string);
      },
    );
  };

  const handleInviteMember = (value: { email: string }) => {
    createInvitation({ teamId, email: value.email }).then((res) => {
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
        setActiveAllForms(false);
        setActiveTeam(res.data.data.id);
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

  return (
    <div className='flex flex-col gap-2'>
      <Text className='mb-3 cursor-default font-bold'>MY TEAMS</Text>
      <TeamList
        modalType={modalType}
        setModalType={setModalType}
        teamList={teamList}
        isLoading={isTeamLoading}
        setTeamName={setTeamName}
        setTeamId={setTeamId}
        setFolderName={setFolderName}
        setFolderId={setFolderId}
        folderId={folderId}
        folderName={folderName}
      />
      <Button
        className='h-10 rounded-md font-semibold text-slate-600 hover:bg-quarter-pearl-lusta-100 hover:text-slate-600'
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
        isLoading={isSendingInvitation || isRemovingMember}
      />
      <ManageFolderModal
        opened={modalType === ModalTypes.CREATE_FOLDER}
        onClose={closeModal}
        onClickCancel={closeModal}
        onClickSubmit={handleCreateFolderInTeam}
        setFolderName={setFolderName}
        isLoading={isFolderInTeamCreating}
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
        isLoading={isTeamCreating || isTeamUpdating}
      />
    </div>
  );
};
