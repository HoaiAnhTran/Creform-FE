import { IoPerson } from 'react-icons/io5';
import { Anchor, Avatar, Button, Image } from '@mantine/core';

import GreenLogo from '@/assets/images/greenlogo.png';

interface HeaderProps {
  onButtonClick: () => void;
  avatarSrc: string;
}
const LOGO_HIGHT = 48;
const AVATAR_SIZE = 40;
export const WhiteHeader = ({ onButtonClick, avatarSrc }: HeaderProps) => (
  <header className='flex h-16 flex-row items-center justify-between gap-1 px-10'>
    <div className='flex flex-row gap-2'>
      <Anchor href='/'>
        <Image src={GreenLogo} h={LOGO_HIGHT} />
      </Anchor>
    </div>
    <div className='flex flex-col'>
      <div className='flex justify-center font-bold'>Form</div>
      <div className='flex justify-center text-malachite-500'>
        last edited at
      </div>
    </div>
    <div className='flex flex-row gap-6'>
      <Button
        className='!rounded-2xl !border-malachite-500 !text-malachite-500'
        variant='outline'
        onClick={onButtonClick}
        leftSection={<IoPerson />}
      >
        Add colaborator
      </Button>
      <div>
        <Avatar src={avatarSrc} size={AVATAR_SIZE} radius='xl' />
      </div>
    </div>
  </header>
);
