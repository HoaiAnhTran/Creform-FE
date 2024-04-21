import { Box, Group, Stack } from '@mantine/core';

import { FormParamsProvider, useOverviewContext } from '@/contexts';
import { ActionToolbar } from '@/organisms/ActionToolbar';
import { FormsTable } from '@/organisms/FormsTable';
import { OverviewSidebar } from '@/organisms/OverviewSidebar';
import { Header } from '@/templates/Header';

export const OverviewPage = () => {
  const { selectedRecords } = useOverviewContext();

  return (
    <FormParamsProvider>
      <Box className='h-screen overflow-hidden'>
        <Header />
        <Group className='h-full items-start justify-between gap-0'>
          <Stack flex={1} className='h-full'>
            <OverviewSidebar />
          </Stack>
          <Stack className='h-full gap-0 px-2' flex={4.5}>
            <ActionToolbar
              selectedFormIds={selectedRecords.map(({ id }) => id)}
            />
            <FormsTable />
          </Stack>
        </Group>
      </Box>
    </FormParamsProvider>
  );
};
