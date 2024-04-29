import { IoIosLogOut } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Anchor, Group, Image, Menu } from '@mantine/core';

import BeigeLogo from '@/assets/images/beige-logo.png';
import { UserAvatar } from '@/atoms/UserAvatar';
import { PATH } from '@/constants/routes';
import { Loader } from '@/molecules/Loader';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { httpClient } from '@/utils';

export const Header = () => {
  const { data: myProfile, isLoading } = useGetMyProfileQuery({});

  const navigate = useNavigate();

  const handleLogout = () => {
    httpClient.logout();
    navigate(PATH.ROOT_PAGE);
  };

  return (
    <header className='flex h-headerHeight flex-row items-center justify-between bg-ocean-green-500 px-10 py-3'>
      <Anchor href={PATH.ROOT_PAGE} className='no-underline hover:no-underline'>
        <Group className='items-end justify-center gap-0'>
          <Image src={BeigeLogo} className='h-logoHeight' />
          <span className='text-[24px] font-bold tracking-[4px] text-quarter-pearl-lusta-50'>
            REFORM
          </span>
        </Group>
      </Anchor>
      {!myProfile || isLoading ? (
        <Loader color='white' />
      ) : (
        <div>
          <Menu shadow='sm' offset={5} position='bottom-end' withArrow>
            <Menu.Target>
              <UserAvatar avatarUrl={myProfile.avatarUrl ?? ''} />
            </Menu.Target>
            <Menu.Dropdown className='min-w-[230px]'>
              <Menu.Item className='p-3 font-medium text-gray-600 delay-100 ease-linear hover:bg-transparent'>
                <Group>
                  <UserAvatar avatarUrl={myProfile.avatarUrl ?? ''} />
                  <div className='flex gap-1'>
                    <span className='text-[15px] font-normal'>Hello,</span>
                    <span className='text-[15px] font-medium'>
                      {myProfile.username}
                    </span>
                  </div>
                </Group>
              </Menu.Item>
              <Menu.Item
                leftSection={<IoPersonOutline size={16} />}
                className='gap-4 px-6 py-3 text-[15px] font-normal text-gray-600 delay-100 ease-linear hover:bg-ocean-green-50 hover:text-ocean-green-500'
                onClick={() => navigate(PATH.MY_ACCOUNT_PAGE)}
              >
                Account
              </Menu.Item>
              <Menu.Item
                leftSection={<IoIosLogOut size={16} />}
                className='gap-4 px-6 py-3 text-[15px] font-normal text-gray-600 delay-100 ease-linear hover:bg-ocean-green-50 hover:text-ocean-green-500'
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      )}
    </header>
  );
};
