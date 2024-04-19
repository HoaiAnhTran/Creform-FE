import { useState } from 'react';
import { Box, Group, Stack } from '@mantine/core';

import { ParamsProvider } from '@/contexts';
import { FormsTable } from '@/organisms/FormsTable';
import { OverviewSidebar } from '@/organisms/OverviewSidebar';
import { TopBar } from '@/organisms/TopBar';
import { Header } from '@/templates/Header';
import { FormResponse } from '@/types';

export const OverviewPage = () => {
  const [selectedRecords, setSelectedRecords] = useState<FormResponse[]>([]);

  return (
    <ParamsProvider>
      <Box>
        <Header />
        <Group className='h-screen items-start justify-between'>
          <Stack flex={1} className='h-full'>
            <OverviewSidebar />
          </Stack>
          <Stack className='mt-2 h-full px-2' flex={4.5}>
            <TopBar selectedFormIds={selectedRecords.map(({ id }) => id)} />
            <FormsTable
              selectedRecords={selectedRecords}
              setSelectedRecords={setSelectedRecords}
            />
          </Stack>
        </Group>
      </Box>
    </ParamsProvider>
  );
};
