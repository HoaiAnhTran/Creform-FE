import { IoIosArrowDown, IoIosLogOut } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import { RiTeamFill } from 'react-icons/ri';
import { TiTick } from 'react-icons/ti';
import { useNavigate, useParams } from 'react-router-dom';
import { Anchor, Group, Image, Menu, NavLink, Skeleton } from '@mantine/core';

import BeigeLogo from '@/assets/images/beige-logo.png';
import { UserAvatar } from '@/atoms/UserAvatar';
import { PATH } from '@/constants/routes';
import { useGetMyTeamsQuery } from '@/redux/api/teamApi';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { cn, httpClient } from '@/utils';

export const Header = () => {
  const { data: myProfile, isLoading: isLoadingProfile } = useGetMyProfileQuery(
    {},
  );

  const { data: myTeams, isLoading: isLoadingTeams } = useGetMyTeamsQuery();

  const { teamId } = useParams();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await httpClient.logout();
    navigate(PATH.ROOT_PAGE);
  };

  return (
    <header className='flex h-headerHeight flex-row items-center justify-between bg-ocean-green-500 px-5 py-3'>
      <Anchor href={PATH.ROOT_PAGE} className='no-underline hover:no-underline'>
        <Group className='items-end justify-center gap-0'>
          <Image src={BeigeLogo} className='h-logoHeight' />
          <span className='text-[24px] font-bold tracking-[4px] text-quarter-pearl-lusta-50'>
            REFORM
          </span>
        </Group>
      </Anchor>
      {!myProfile || isLoadingProfile || !myTeams || isLoadingTeams ? (
        <Skeleton height={38} circle className='shadow-whiteShadow' />
      ) : (
        <div className='flex flex-row items-center justify-end gap-12'>
          <NavLink
            href={PATH.OVERVIEW_PAGE}
            label='My Forms'
            classNames={{
              label:
                'text-quarter-pearl-lusta-50 text-base font-medium hover:font-semibold transition-all ease-linear duration-75',
            }}
            className='w-max bg-transparent p-0 text-center hover:bg-transparent'
          />

          <Menu
            trigger='click-hover'
            shadow='sm'
            offset={5}
            position='bottom-end'
            withArrow
          >
            <Menu.Target>
              <div className='group flex w-[120px] flex-row items-center justify-center gap-2'>
                <NavLink
                  label='My Teams'
                  classNames={{
                    label:
                      'text-quarter-pearl-lusta-50 text-base font-medium hover:font-semibold transition-all ease-linear duration-75',
                  }}
                  className='w-max bg-transparent p-0 hover:bg-transparent'
                />
                <IoIosArrowDown
                  size={16}
                  className='bg-transparent text-quarter-pearl-lusta-50'
                />
              </div>
            </Menu.Target>
            <Menu.Dropdown className='min-w-[180px]'>
              {myTeams.length > 0 ? (
                myTeams.map((team) => (
                  <Menu.Item
                    key={team.id}
                    leftSection={
                      team.logoUrl ? (
                        <img
                          className='h-[20px] w-[20px] rounded-full object-cover'
                          src={team.logoUrl}
                        />
                      ) : (
                        <RiTeamFill
                          size={24}
                          className='rounded-full bg-gray-200 p-1 text-gray-600'
                        />
                      )
                    }
                    rightSection={
                      team.id === teamId ? (
                        <TiTick className='text-ocean-green-500' />
                      ) : null
                    }
                    className={cn(
                      'mb-1 gap-1 p-[10px] text-sm font-medium text-gray-600 delay-100 ease-linear last-of-type:mb-0 hover:bg-ocean-green-50 hover:text-ocean-green-500',
                      {
                        'bg-ocean-green-50 text-ocean-green-500':
                          team.id === teamId,
                      },
                    )}
                    onClick={() => {
                      navigate(
                        PATH.MY_TEAMS_PAGE.replace(
                          ':teamId',
                          team.id.toString(),
                        ),
                      );
                    }}
                  >
                    {team.name}
                  </Menu.Item>
                ))
              ) : (
                <Menu.Item className='cursor-default bg-transparent p-[10px] text-sm font-medium text-slate-500'>
                  You don't have any teams.
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>

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
