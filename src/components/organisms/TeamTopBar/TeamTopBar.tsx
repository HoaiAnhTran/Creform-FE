import { memo } from 'react';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiTeamFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Divider, Group, Text, Tooltip } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants';
import { TeamResponse } from '@/types';
import { generateAvatarBgColor, getAcronymUsername } from '@/utils';

interface TeamTopBarProps {
  team: TeamResponse;
  isTeamSettingsPage: boolean;
}

export const TeamTopBar = memo(
  ({ team, isTeamSettingsPage }: TeamTopBarProps) => {
    const navigate = useNavigate();

    return (
      <Box className='flex h-[60px] items-center justify-between gap-5 border-x-0 border-b border-t-0 border-solid border-slate-300 bg-quarter-pearl-lusta-100 px-5 py-4'>
        <Group className='cursor-default items-center justify-start gap-2 px-2'>
          {team.logoUrl ? (
            <img
              className='h-[20px] w-[20px] rounded-full object-cover'
              src={team.logoUrl}
            />
          ) : (
            <RiTeamFill
              size={32}
              className='rounded-full bg-gray-200 p-1 text-gray-600'
            />
          )}
          <Text className='text-base font-bold text-gray-600'>
            <span className='text-burnt-sienna-500'>{team.name}</span> Workspace
          </Text>
        </Group>

        <Group className='gap-5'>
          <Tooltip.Group openDelay={300} closeDelay={100}>
            <Avatar.Group spacing={7}>
              {team.members.length > 5 ? (
                <>
                  {team.members.slice(0, 3).map((member) => (
                    <Tooltip
                      key={member.id}
                      label={member.username}
                      withArrow
                      color='burnt-sienna.1'
                      className='text-xs text-burnt-sienna-600'
                    >
                      <Avatar src={member.avatarUrl} size={33}>
                        {getAcronymUsername(member.username)}
                      </Avatar>
                    </Tooltip>
                  ))}
                  <Avatar>+{team.members.length - 3}</Avatar>
                </>
              ) : (
                team.members.map((member) => (
                  <Tooltip
                    key={member.id}
                    label={member.username}
                    withArrow
                    color='burnt-sienna.1'
                    className='text-xs text-burnt-sienna-600'
                  >
                    <Avatar
                      src={member.avatarUrl}
                      size={33}
                      bg={generateAvatarBgColor()}
                      classNames={{
                        placeholder: `text-quarter-pearl-lusta-50 font-normal`,
                      }}
                    >
                      {getAcronymUsername(member.username)}
                    </Avatar>
                  </Tooltip>
                ))
              )}
            </Avatar.Group>
          </Tooltip.Group>
          <Divider
            orientation='vertical'
            color='gray.3'
            size={1.4}
            className='mt-[3px] h-[28px]'
          />
          {isTeamSettingsPage ? (
            <Button
              title='Team Workspace'
              variant='outline'
              color='secondary'
              className='h-[33px] rounded-full text-sm'
              leftSection={<BiSolidCategoryAlt />}
              onClick={() => {
                navigate(
                  PATH.MY_TEAMS_PAGE.replace(':teamId', team.id.toString()),
                );
              }}
            />
          ) : (
            <Button
              title='Team Settings'
              variant='outline'
              color='secondary'
              className='h-[33px] rounded-full text-sm'
              leftSection={<IoSettingsSharp />}
              onClick={() => {
                navigate(
                  PATH.TEAMS_SETTINGS_PAGE.replace(
                    ':teamId',
                    team.id.toString(),
                  ),
                );
              }}
            />
          )}
        </Group>
      </Box>
    );
  },
);
