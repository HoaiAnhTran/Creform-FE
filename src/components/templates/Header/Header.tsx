import { FaUser } from 'react-icons/fa6';
import { Anchor, Avatar, Image } from '@mantine/core';

import WhiteLogo from '@/assets/images/whitelogo.png';

interface HeaderProps {
  avatarSrc?: string;
}
const LOGO_HEIGHT = 45;
const AVATAR_SIZE = 38;
export const Header = ({ avatarSrc }: HeaderProps) => (
  <header className='flex h-16 flex-row items-center justify-between bg-malachite-500 px-6'>
    <Anchor href='/'>
      <Image src={WhiteLogo} h={LOGO_HEIGHT} />
    </Anchor>
    <div className='ml-auto'>
      {avatarSrc ? (
        <Avatar src={avatarSrc} size={AVATAR_SIZE} radius='xl' />
      ) : (
        <Avatar size={AVATAR_SIZE} radius='xl' className='bg-malachite-50'>
          <FaUser size={20} className='text-malachite-500' />
        </Avatar>
      )}
    </div>
  </header>
);
