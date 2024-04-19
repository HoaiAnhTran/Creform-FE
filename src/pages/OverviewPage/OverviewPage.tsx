import { Group, Stack } from '@mantine/core';

import { FormsTable } from '@/organisms/FormsTable';
import { Header } from '@/templates/Header';

export const OverviewPage = () => (
  <>
    <Header />
    <Group className='items-start justify-between'>
      {/* TODO: place overview sidebar here */}
      <Stack flex={1}>Sidebar</Stack>
      <Stack className='px-2' flex={4}>
        {/* TODO: place action toolbar here */}
        <div>Action toolbar</div>
        <FormsTable />
      </Stack>
    </Group>
  </>
);
