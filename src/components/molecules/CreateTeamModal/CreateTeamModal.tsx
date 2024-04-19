import { FaFolderPlus } from 'react-icons/fa';
import {
  ModalProps as MantineModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';

import { Modal } from '../Modal';

interface CreateTeamModalProps extends MantineModalProps {
  onClickBack: () => void;
  onClickCreateTeam: () => void;
}

export const CreateTeamModal = ({
  onClickCreateTeam,
  onClickBack,
  ...props
}: CreateTeamModalProps) => (
  <Modal
    headerIcon={<FaFolderPlus className='text-white' />}
    headerTitle={'Add team name'}
    {...props}
    body={
      <>
        <Stack className='pb-16 pt-7'>
          <Text className='font-bold'>Team name</Text>
          <TextInput placeholder='Add team name here' />
        </Stack>
      </>
    }
    onClickCancel={onClickBack}
    onClickSubmit={onClickCreateTeam}
  />
);
