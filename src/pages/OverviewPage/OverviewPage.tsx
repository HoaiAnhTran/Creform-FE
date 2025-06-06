import { useEffect } from 'react';
import { Box, Stack } from '@mantine/core';

import { FormParamsProvider, useOverviewContext } from '@/contexts';
import { ActionToolbar } from '@/organisms/ActionToolbar';
import { FormsTable } from '@/organisms/FormsTable';
import { Header } from '@/organisms/Header';
import { OverviewSidebar } from '@/organisms/OverviewSidebar';
import { removeInvitationTokenFromLS } from '@/utils';

export const OverviewPage = () => {
  const { selectedRecords } = useOverviewContext();

  useEffect(() => {
    removeInvitationTokenFromLS();
  }, []);

  return (
    <FormParamsProvider>
      <Box className='h-screen'>
        <Header />
        <Box className='flex h-full w-full items-start justify-between gap-0'>
          <Stack className='h-full w-[20%] border-y-0 border-l-0 border-r border-solid border-slate-300'>
            <OverviewSidebar />
          </Stack>
          <Stack className='h-full w-[80%] gap-0'>
            <ActionToolbar
              selectedFormIds={selectedRecords.map(({ id }) => id)}
            />
            <FormsTable />
          </Stack>
        </Box>
      </Box>
    </FormParamsProvider>
  );
};
