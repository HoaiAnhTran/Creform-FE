import { useState } from 'react';
import { RiTeamFill } from 'react-icons/ri';
import {
  Box,
  CheckIcon,
  ModalProps as MantineModalProps,
  Radio,
  Text,
} from '@mantine/core';

import { MESSAGES } from '@/constants/messages';
import { useMoveToTeamMutation } from '@/redux/api/formApi';
import { useGetMyTeamsQuery } from '@/redux/api/teamApi';
import { FormResponse, TeamResponse } from '@/types';
import { countSuccessAndErrors, toastify } from '@/utils';

import { Modal } from '../Modal';

interface MoveToTeamModalProps extends MantineModalProps {
  selectedRecords: FormResponse[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<FormResponse[]>>;
  onClickCancel: () => void;
}

export const MoveToTeamModal = ({
  selectedRecords,
  setSelectedRecords,
  onClickCancel,
  ...props
}: MoveToTeamModalProps) => {
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');

  const selectedFormIds: string[] = selectedRecords.map(({ id }) => id);

  const disabledTeamOptions = selectedRecords.map((form) =>
    form.teamId?.toString(),
  );

  const { data: teams } = useGetMyTeamsQuery();

  const [moveToTeam, { isLoading: isMovingToTeam }] = useMoveToTeamMutation();

  const handleMoveToTeam = async () => {
    await Promise.allSettled(
      selectedFormIds.map((id) =>
        moveToTeam({ formId: id, teamId: selectedTeamId }),
      ),
    ).then((response) => {
      const { successCount, errorCount } = countSuccessAndErrors(response);
      if (successCount === response.length) {
        toastify.displaySuccess(MESSAGES.MOVE_FORM_TO_TEAM_SUCCESS);
        onClickCancel();
      } else if (errorCount > 0) {
        toastify.displayError(`${errorCount} form(s) failed to move to team`);
      }
      setSelectedRecords([]);
      setSelectedTeamId('');
    });
  };

  const handleCloseModal = () => {
    onClickCancel();
    setSelectedTeamId('');
  };

  return (
    <Modal
      {...props}
      onClose={handleCloseModal}
      headerIcon={<RiTeamFill className='text-white' />}
      headerTitle='Move to team'
      body={
        <Box className='px-3 py-8'>
          {teams && teams.length > 0 ? (
            <Radio.Group
              value={selectedTeamId}
              onChange={(value: string) => {
                setSelectedTeamId(value);
              }}
              name='teamOption'
              label='Select a team below'
              classNames={{ label: 'text-base font-semibold' }}
              className='flex flex-col justify-between gap-4'
            >
              <Box className='flex flex-col items-start justify-between gap-4'>
                {teams.map((team: TeamResponse) => (
                  <Radio
                    key={team.id}
                    value={team.id.toString()}
                    label={team.name}
                    icon={CheckIcon}
                    color='ocean-green.5'
                    size='sm'
                    disabled={disabledTeamOptions.includes(team.id.toString())}
                    classNames={{
                      radio: 'cursor-pointer',
                      label: 'cursor-pointer',
                    }}
                  />
                ))}
              </Box>
            </Radio.Group>
          ) : (
            <Text className='text-sm font-medium text-slate-500'>
              You don't have any teams.
            </Text>
          )}
        </Box>
      }
      onClickCancel={handleCloseModal}
      onClickSubmit={handleMoveToTeam}
      canSubmit={selectedTeamId !== ''}
      isLoading={isMovingToTeam}
    />
  );
};
