import { Anchor, Avatar, Image } from '@mantine/core';

import WhiteLogo from '@/assets/images/whitelogo.png';

interface HeaderProps {
  avatarSrc: string;
}
const LOGO_HIGHT = 48;
const AVATAR_SIZE = 40;
export const Header = ({ avatarSrc }: HeaderProps) => (
  <header className='flex h-16 flex-row items-center justify-between bg-malachite-500 px-10'>
    <Anchor href='/'>
      <Image src={WhiteLogo} h={LOGO_HIGHT} />
    </Anchor>
    <div className='ml-auto'>
      <Avatar src={avatarSrc} size={AVATAR_SIZE} radius='xl' />
    </div>
  </header>
);
