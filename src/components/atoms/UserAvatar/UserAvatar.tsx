import { forwardRef } from 'react';
import { FaUser } from 'react-icons/fa6';
import { Avatar, AvatarProps } from '@mantine/core';

interface UserAvatarProps extends AvatarProps {
  avatarUrl: string;
  defaultIconSize?: string | number;
}

const AVATAR_SIZE = 40;

export const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ avatarUrl, defaultIconSize = 20, ...props }: UserAvatarProps, ref) =>
    avatarUrl ? (
      <Avatar
        ref={ref}
        src={avatarUrl}
        size={AVATAR_SIZE}
        radius='xl'
        {...props}
        className='cursor-pointer shadow-whiteShadow'
      />
    ) : (
      <Avatar
        ref={ref}
        size={AVATAR_SIZE}
        radius='xl'
        {...props}
        className='cursor-pointer bg-ocean-green-50 shadow-whiteShadow'
      >
        <FaUser size={defaultIconSize} className='text-ocean-green-500' />
      </Avatar>
    ),
);
