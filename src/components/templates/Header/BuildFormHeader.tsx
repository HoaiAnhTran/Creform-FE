import { useEffect, useRef, useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Anchor, Group, Image, Menu } from '@mantine/core';

import GreenLogo from '@/assets/images/greenlogo.png';
import { Button } from '@/atoms/Button';
import { UserAvatar } from '@/atoms/UserAvatar';
import { PATH } from '@/constants/routes';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { FormResponse } from '@/types';
import { formatDate, httpClient } from '@/utils';

interface HeaderProps {
  form: FormResponse;
  onButtonClick?: () => void;
}

const LOGO_HEIGHT = 45;
const DEFAULT_FORM_TITLE = 'Form';

export const BuildFormHeader = ({ form, onButtonClick }: HeaderProps) => {
  const { data: myProfile } = useGetMyProfileQuery();

  const [currentTitle, setCurrentTitle] = useState<string>(
    form.title || DEFAULT_FORM_TITLE,
  );
  const [inputWidth, setInputWidth] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    httpClient.logout();
    navigate(PATH.ROOT_PAGE);
  };

  useEffect(() => {
    setInputWidth(`${currentTitle.length * 11}px`);
  }, [currentTitle]);

  return (
    <header className='relative flex flex-row items-center justify-between px-10 py-3'>
      <Anchor href='/'>
        <Image src={GreenLogo} h={LOGO_HEIGHT} />
      </Anchor>

      <div className='absolute left-1/2 flex w-full -translate-x-1/2 flex-col items-center justify-center'>
        <div className='flex max-w-[50%] items-center justify-between gap-0.5 text-xl font-bold'>
          <input
            ref={titleInputRef}
            value={currentTitle}
            onChange={(event) => {
              setCurrentTitle(event.target.value);
            }}
            onBlur={() => setIsEditing(false)}
            className='min-w-14 max-w-full overflow-hidden text-ellipsis whitespace-nowrap border-none text-center outline-none'
            style={{ width: inputWidth }}
          />
          {isEditing || (
            <MdOutlineModeEditOutline
              size={18}
              onClick={() => {
                titleInputRef.current?.focus();
                setIsEditing(true);
              }}
              className='min-w-[5%]'
            />
          )}
        </div>
        <div className='text-[13px] text-malachite-500'>
          {form.updatedAt
            ? `Last updated at ${formatDate(form.updatedAt, 'MMM D, YYYY h:mm A')}`
            : `Created at ${formatDate(form.createdAt, 'MMM D, YYYY h:mm A')}`}
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
