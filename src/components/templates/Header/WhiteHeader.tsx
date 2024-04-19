import { IoIosLogOut } from 'react-icons/io';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Anchor, Group, Image, Menu } from '@mantine/core';

import GreenLogo from '@/assets/images/greenlogo.png';
import { Button } from '@/atoms/Button';
import { UserAvatar } from '@/atoms/UserAvatar';
import { PATH } from '@/constants/routes';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { httpClient } from '@/utils';

interface HeaderProps {
  onButtonClick?: () => void;
}

const LOGO_HEIGHT = 45;

export const WhiteHeader = ({ onButtonClick }: HeaderProps) => {
  const { data: myProfile } = useGetMyProfileQuery();

  const navigate = useNavigate();

  const handleLogout = () => {
    httpClient.logout();
    navigate(PATH.ROOT_PAGE);
  };

  return (
    <header className='flex h-16 flex-row items-center justify-between gap-1 px-10'>
      <div className='flex flex-row gap-2'>
        <Anchor href='/'>
          <Image src={GreenLogo} h={LOGO_HEIGHT} />
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
          title='Add collaborators'
          variant='outline'
          className='rounded-3xl'
          leftSection={<IoPerson />}
          onClick={onButtonClick}
        />
        <div>
          <Menu shadow='sm' offset={5} position='bottom-end' withArrow>
            <Menu.Target>
              <UserAvatar avatarUrl={myProfile?.avatarUrl ?? ''} />
            </Menu.Target>
            <Menu.Dropdown className='!min-w-[230px]'>
              <Menu.Item className='p-3 font-medium text-gray-600 delay-100 ease-linear hover:bg-transparent'>
                <Group>
                  <UserAvatar avatarUrl={myProfile?.avatarUrl ?? ''} />
                  <div className='flex gap-1'>
                    <span className='text-[14px] font-normal'>Hello,</span>
                    <span className='text-[14px] font-medium'>
                      {myProfile?.username}
                    </span>
                  </div>
                </Group>
              </Menu.Item>
              <Menu.Item
                leftSection={<IoPersonOutline size={16} />}
                className='gap-4 px-6 py-3 text-[15px] font-normal text-gray-600 delay-100 ease-linear hover:bg-malachite-50 hover:text-malachite-500'
                onClick={() => navigate(PATH.MY_ACCOUNT_PAGE)}
              >
                Account
              </Menu.Item>
              <Menu.Item
                leftSection={<IoIosLogOut size={16} />}
                className='gap-4 px-6 py-3 text-[15px] font-normal text-gray-600 delay-100 ease-linear hover:bg-malachite-50 hover:text-malachite-500'
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </header>
  );
};
