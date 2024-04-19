import { FaFolderPlus } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import {
  ModalProps as MantineModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';

import { Modal } from '../Modal';

interface ManageTeamModalProps extends MantineModalProps {
  teamName?: string;
  teamId?: number;
  setTeamName: (arg0: string) => void;
  onClickBack: () => void;
  onClickSubmit: () => void;
}

export const ManageTeamModal = ({
  teamName,
  teamId,
  setTeamName,
  onClickSubmit,
  onClickBack,
  ...props
}: ManageTeamModalProps) => (
  <Modal
    canSubmit={teamName !== ''}
    {...props}
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
        <Stack className='pb-16 pt-7'>
          <Text className='font-bold'>Team name</Text>
          <TextInput
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </Stack>
      </>
    }
    onClickCancel={onClickBack}
    onClickSubmit={onClickSubmit}
  />
);
