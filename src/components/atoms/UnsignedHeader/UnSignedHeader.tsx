import { Anchor, Group, Image } from '@mantine/core';

import BeigeLogo from '@/assets/images/beige-logo.png';
import { PATH } from '@/constants/routes';

export const UnSignedHeader = () => (
  <header className='flex h-headerHeight flex-row items-center justify-between bg-ocean-green-500 px-10 py-3'>
    <Anchor href={PATH.ROOT_PAGE} className='no-underline hover:no-underline'>
      <Group className='items-end justify-center gap-0'>
        <Image src={BeigeLogo} className='h-logoHeight' />
        <span className='text-[24px] font-bold tracking-[4px] text-quarter-pearl-lusta-50'>
          REFORM
        </span>
      </Group>
    </Anchor>
  </header>
);
