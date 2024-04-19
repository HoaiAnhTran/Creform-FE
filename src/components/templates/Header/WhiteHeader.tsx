import { FaUser } from 'react-icons/fa6';
import { IoPerson } from 'react-icons/io5';
import { Anchor, Avatar, Button, Image } from '@mantine/core';

import GreenLogo from '@/assets/images/greenlogo.png';

interface HeaderProps {
  onButtonClick?: () => void;
  avatarSrc?: string;
}

const LOGO_HEIGHT = 45;
const AVATAR_SIZE = 38;

export const WhiteHeader = ({ onButtonClick, avatarSrc }: HeaderProps) => (
  <header className='relative flex flex-row items-center justify-between px-10 py-3'>
    <Anchor href='/'>
      <Image src={GreenLogo} h={LOGO_HEIGHT} />
    </Anchor>
    <div className='absolute left-1/2 flex -translate-x-1/2 flex-col justify-center'>
      <div className='text-xl font-bold'>Form Title</div>
      <div className='text-sm text-malachite-500'>Last edited at</div>
    </div>
    <div className='flex flex-row gap-6'>
      <Button
        className='!rounded-2xl !border-malachite-500 text-sm !text-malachite-500'
        variant='outline'
        onClick={onButtonClick}
        leftSection={<IoPerson />}
      >
        Add collaborators
      </Button>
      <div>
        {avatarSrc ? (
          <Avatar src={avatarSrc} size={AVATAR_SIZE} radius='xl' />
        ) : (
          <Avatar size={AVATAR_SIZE} radius='xl' className='bg-malachite-50'>
            <FaUser size={20} className='text-malachite-500' />
          </Avatar>
        )}
      </div>
    </div>
  </header>
);
