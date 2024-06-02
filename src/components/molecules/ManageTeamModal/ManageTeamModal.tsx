import { FaFolderPlus } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import {
  ModalProps as MantineModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';

import { MAXIMUM_TEAM_NAME_LENGTH } from '@/constants';

import { Modal } from '../Modal';

interface ManageTeamModalProps extends MantineModalProps {
  teamName?: string;
  teamId?: string;
  setTeamName: (arg0: string) => void;
  onClickCancel: () => void;
  onClickSubmit: () => void;
  isLoading: boolean;
}

export const ManageTeamModal = ({
  teamName,
  teamId,
  setTeamName,
  onClickCancel,
  onClickSubmit,
  isLoading,
  ...props
}: ManageTeamModalProps) => {
  const handleCloseModal = () => {
    onClickCancel();
    setTeamName('');
  };

  return (
    <Modal
      {...props}
      onClose={handleCloseModal}
      canSubmit={teamName !== ''}
      headerIcon={
        <>
          {teamId ? (
            <MdEditSquare className='text-white' />
          ) : (
            <FaFolderPlus className='text-white' />
          )}
        </>
      }
      headerTitle={teamId ? 'Change team name' : 'Add team name'}
      body={
        <>
          <Stack className='min-h-[170px] gap-3 px-3 py-8'>
            <Text className='text-base font-semibold'>Team name</Text>
            <TextInput
              data-autofocus
              value={teamName}
              placeholder='Type team name here'
              onChange={(e) => setTeamName(e.target.value)}
              maxLength={MAXIMUM_TEAM_NAME_LENGTH}
            />
          </Stack>
        </>
      }
      onClickCancel={handleCloseModal}
      onClickSubmit={onClickSubmit}
      isLoading={isLoading}
    />
  );
};
