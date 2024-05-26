import { useState } from 'react';
import { IoIosWarning } from 'react-icons/io';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Stack, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants';
import { FormParamsProvider } from '@/contexts';
import { Loader } from '@/molecules/Loader';
import { FormsTableInTeam } from '@/organisms/FormsTableInTeam';
import { Header } from '@/organisms/Header';
import { TeamActionToolbar } from '@/organisms/TeamActionToolbar';
import { TeamSettings } from '@/organisms/TeamSettings';
import { TeamSidebar } from '@/organisms/TeamSidebar';
import { TeamTopBar } from '@/organisms/TeamTopBar';
import { useGetTeamDetailsQuery } from '@/redux/api/teamApi';
import { FolderInTeamResponse, FormResponse } from '@/types';

export interface SelectedOptionType {
  folder: FolderInTeamResponse;
  isAllForms?: boolean;
  isFavorites?: boolean;
  isTrash?: boolean;
  isSettings?: boolean;
}

export const initialState: SelectedOptionType = {
  folder: {
    id: '',
    name: '',
  },
  isAllForms: true,
};

export const TeamPage = () => {
  const { teamId } = useParams();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] =
    useState<SelectedOptionType>(initialState);

  const [selectedRecords, setSelectedRecords] = useState<FormResponse[]>([]);

  const isTeamSettingsPage =
    pathname === PATH.TEAMS_SETTINGS_PAGE.replace(':teamId', teamId!);

  const { data: team, isLoading } = useGetTeamDetailsQuery(
    { id: teamId! },
    { skip: !teamId },
  );

  if (isLoading) {
    return <Loader type='oval' className='translate-y-[50vh]' />;
  }

  if (!team) {
    return (
      <Box className='h-screen'>
        <Header />
        <div className='flex h-screen w-full flex-col items-center justify-center gap-5 bg-quarter-pearl-lusta-50'>
          <Box className='flex size-24 items-center justify-center rounded-full bg-light-warning text-warning'>
            <IoIosWarning size={64} />
          </Box>
          <Text className='text-[24px] font-bold capitalize'>
            Team not found
          </Text>
          <Text className='text-md'>
            The team you are trying to access does not exist.
          </Text>
          <Button
            title='Go back to My Forms'
            variant='outline'
            onClick={() => navigate(PATH.OVERVIEW_PAGE)}
          />
        </div>
      </Box>
    );
  }

  return (
    <FormParamsProvider>
      <Box className='h-screen'>
        <Header />

        <TeamTopBar team={team} isTeamSettingsPage={isTeamSettingsPage} />

        {isTeamSettingsPage ? (
          <TeamSettings team={team} />
        ) : (
          <Box className='flex h-full w-full items-start justify-between gap-0'>
            <Stack className='h-full w-[20%] border-y-0 border-l-0 border-r border-solid border-slate-300'>
              <TeamSidebar
                team={team}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                setSelectedRecords={setSelectedRecords}
              />
            </Stack>
            <Stack className='h-full w-[80%] gap-0'>
              <TeamActionToolbar
                teamId={team.id}
                selectedRecords={selectedRecords}
                setSelectedRecords={setSelectedRecords}
              />
              <FormsTableInTeam
                team={team}
                selectedRecords={selectedRecords}
                setSelectedRecords={setSelectedRecords}
                folderId={selectedOption.folder.id}
                selectedOption={selectedOption}
              />
            </Stack>
          </Box>
        )}
      </Box>
    </FormParamsProvider>
  );
};
