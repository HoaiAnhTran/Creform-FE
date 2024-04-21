import { useState } from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import {
  Box,
  CheckIcon,
  ModalProps as MantineModalProps,
  Radio,
} from '@mantine/core';

import { MESSAGES } from '@/constants/messages';
import { useOverviewContext } from '@/contexts';
import { useMoveToTeamMutation } from '@/redux/api/formApi';
import { useGetMyTeamsQuery } from '@/redux/api/teamApi';
import { TeamResponse } from '@/types';
import { toastify } from '@/utils';

import { Modal } from '../Modal';

interface MoveToTeamModalProps extends MantineModalProps {
  closeModal: () => void;
  selectedFormIds: number[];
}

export const MoveToTeamModal = ({
  closeModal,
  selectedFormIds,
  ...props
}: MoveToTeamModalProps) => {
  const { selectedRecords, setSelectedRecords } = useOverviewContext();

  const disabledTeamOptions = selectedRecords.map(
    (form) => form.teamId && form.teamId.toString(),
  );

  const { data: teams } = useGetMyTeamsQuery();

  const [moveToTeam, { isLoading: isMovingToTeam }] = useMoveToTeamMutation();

  const [selectedTeamId, setSelectedTeamId] = useState<string>();

  const handleMoveToTeam = async () => {
    await Promise.allSettled(
      selectedFormIds.map((id) =>
        moveToTeam({ formId: id, teamId: Number(selectedTeamId) }),
      ),
    ).then((response) => {
      const { successCount, errorCount } = response.reduce<{
        successCount: number;
        errorCount: number;
      }>(
        (acc, res) => {
          if (res.status === 'fulfilled') {
            acc.successCount += 1;
            return acc;
          }
          acc.errorCount += 1;
          return acc;
        },
        { successCount: 0, errorCount: 0 },
      );

      if (successCount === response.length) {
        toastify.displaySuccess(MESSAGES.MOVE_FORM_TO_TEAM_SUCCESS);
        closeModal();
      } else if (errorCount > 0) {
        toastify.displayError(`${errorCount} form(s) failed to move to team`);
      }
      setSelectedRecords([]);
    });
  };

  return (
    <Modal
      {...props}
      headerIcon={<AiOutlineTeam className='text-white' />}
      headerTitle='Move to team'
      body={
        <Box className='px-3 py-5'>
          <Radio.Group
            value={selectedTeamId}
            onChange={(value: string) => {
              setSelectedTeamId(value);
            }}
            name='teamOption'
            label='Select a team below'
            classNames={{ label: 'text-sm font-semibold' }}
            className='flex flex-col justify-between gap-4'
          >
            <Box className='flex flex-col items-start justify-between gap-4'>
              {teams?.map((team: TeamResponse) => (
                <Radio
                  key={team.id}
                  value={team.id.toString()}
                  label={team.name}
                  icon={CheckIcon}
                  color='green'
                  size='xs'
                  disabled={disabledTeamOptions.includes(team.id.toString())}
                />
              ))}
            </Box>
          </Radio.Group>
        </Box>
      }
      onClickCancel={closeModal}
      onClickSubmit={handleMoveToTeam}
      isLoading={isMovingToTeam}
    />
  );
};
