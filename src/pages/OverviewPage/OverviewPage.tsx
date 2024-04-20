import { useState } from 'react';
import { Box, Group, Stack } from '@mantine/core';

import { ElementLayoutProvider, FormParamsProvider } from '@/contexts';
import { FormsTable } from '@/organisms/FormsTable';
import { OverviewSidebar } from '@/organisms/OverviewSidebar';
import { TopBar } from '@/organisms/TopBar';
import { Header } from '@/templates/Header';
import { FormResponse } from '@/types';

export const OverviewPage = () => {
  const [selectedRecords, setSelectedRecords] = useState<FormResponse[]>([]);

  return (
    <FormParamsProvider>
      <Box className='h-screen'>
        <Header />
        <Group className='h-full items-start justify-between gap-0'>
          <Stack flex={1} className='h-full'>
            <ElementLayoutProvider>
              <OverviewSidebar />
            </ElementLayoutProvider>
          </Stack>
          <Stack className='h-full justify-between gap-0 px-2' flex={4.5}>
            <TopBar selectedFormIds={selectedRecords.map(({ id }) => id)} />
            <FormsTable
              selectedRecords={selectedRecords}
              setSelectedRecords={setSelectedRecords}
            />
          </Stack>
        </Group>
      </Box>
    </FormParamsProvider>
  );
};
