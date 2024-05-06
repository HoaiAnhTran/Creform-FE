import { useState } from 'react';
import { IoMailUnread, IoPeople, IoSettingsSharp } from 'react-icons/io5';
import { Box, NavLink, Stack } from '@mantine/core';

import { PendingInvitationsTable } from '@/molecules/PendingInvitationsTable';
import { TeamMembersTable } from '@/molecules/TeamMembersTable';
import { useGetTeamDetailsQuery } from '@/redux/api/teamApi';
import { TeamResponse } from '@/types';
import { cn } from '@/utils';

import { TeamGeneralSettings } from '../TeamGeneralSettings';

const teamSettingsOptions = [
  {
    label: 'General Settings',
    icon: <IoSettingsSharp />,
  },
  {
    label: 'Team Members',
    icon: <IoPeople />,
  },
  {
    label: 'Pending Invitations',
    icon: <IoMailUnread />,
  },
];

interface TeamSettingsProps {
  team: TeamResponse;
}

export const TeamSettings = ({ team }: TeamSettingsProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    teamSettingsOptions[0].label,
  );

  const { refetch } = useGetTeamDetailsQuery(
    { id: team.id },
    { skip: !team.id },
  );

  return (
    <Box className='flex h-full w-full items-start justify-between gap-0'>
      <Stack className='flex h-full w-[20%] flex-col gap-2 border-y-0 border-l-0 border-r border-solid border-slate-300 bg-inherit bg-quarter-pearl-lusta-50 px-5 py-4'>
        {teamSettingsOptions.map((option, index) => (
          <NavLink
            key={index}
            className={cn(
              'rounded-md text-slate-600 hover:bg-quarter-pearl-lusta-100',
              {
                'bg-quarter-pearl-lusta-200 hover:bg-quarter-pearl-lusta-200':
                  option.label === selectedOption,
              },
            )}
            classNames={{
              label: 'font-semibold',
            }}
            label={option.label}
            leftSection={option.icon}
            active={option.label === selectedOption}
            onClick={() => {
              refetch();
              setSelectedOption(option.label);
            }}
          />
        ))}
      </Stack>

      <Stack className='h-full w-[80%] gap-1 px-5 py-4'>
        {selectedOption === teamSettingsOptions[0].label && (
          <TeamGeneralSettings team={team} />
        )}

        {selectedOption === teamSettingsOptions[1].label && (
          <TeamMembersTable team={team} />
        )}

        {selectedOption === teamSettingsOptions[2].label && (
          <PendingInvitationsTable team={team} />
        )}
      </Stack>
    </Box>
  );
};
