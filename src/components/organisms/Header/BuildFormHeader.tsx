import { useEffect, useMemo, useRef, useState } from 'react';
import { FaFileImport, FaRobot } from 'react-icons/fa6';
import { IoIosLogOut } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ActionIcon,
  Anchor,
  Divider,
  Group,
  Image,
  Menu,
  Tooltip,
} from '@mantine/core';

import GreenLogo from '@/assets/images/green-logo.png';
import { UserAvatar } from '@/atoms/UserAvatar';
import { PATH } from '@/constants/routes';
import { DEFAULT_FORM_TITLE, useBuildFormContext } from '@/contexts';
import { AutoGenFormModal } from '@/molecules/AutoGenFormModal';
import { ImportFormModal } from '@/molecules/ImportFormModal';
import { Loader } from '@/molecules/Loader';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { ModalType, ModalTypes } from '@/types';
import { formatDate, httpClient } from '@/utils';

export const BuildFormHeader = () => {
  const [modalType, setModalType] = useState<ModalType | ''>('');
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const { id: formId } = useParams();

  const { data: formData } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );

  const { data: myProfile, isLoading } = useGetMyProfileQuery({});

  const {
    form,
    isEditForm,
    setForm,
    isPublishSection,
    currentTitle,
    setCurrentTitle,
  } = useBuildFormContext();

  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const createdDate = useMemo(
    () => formatDate(form.createdAt, 'MMM D, YYYY h:mm A'),
    [form.createdAt],
  );

  const updatedDate = useMemo(
    () => formatDate(form.updatedAt, 'MMM D, YYYY h:mm A'),
    [form.updatedAt],
  );

  const handleLogout = async () => {
    await httpClient.logout();
    navigate(PATH.ROOT_PAGE);
  };

  useEffect(() => {
    if (isEditForm && form.title !== '') {
      setCurrentTitle(form.title);
    } else {
      setCurrentTitle(currentTitle);
    }
  }, [isEditForm, currentTitle, form.title, setCurrentTitle]);

  useEffect(() => {
    if (isEditForm) return;
    setForm((prevState) => ({
      ...prevState,
      title: currentTitle,
    }));
  }, [currentTitle, isEditForm, setForm]);

  return (
    <header className='flex h-headerHeight flex-row items-center justify-between bg-quarter-pearl-lusta-50 px-10 py-3'>
      <Anchor
        href={PATH.ROOT_PAGE}
        className='z-20 no-underline hover:no-underline'
      >
        <Group className='items-end justify-center gap-0'>
          <Image src={GreenLogo} className='h-logoHeight' />
          <span className='text-[24px] font-bold tracking-[4px] text-ocean-green-500'>
            REFORM
          </span>
        </Group>
      </Anchor>
      <div className='absolute left-1/2 flex w-full -translate-x-1/2 flex-col items-center justify-center gap-0.5'>
        <div className='flex max-w-[50%] items-center justify-between gap-0.5 text-xl font-bold'>
          {formData?.teamId &&
            (formData.team.logoUrl ? (
              <Tooltip
                label={formData.team.name}
                offset={10}
                withArrow
                arrowOffset={20}
                arrowSize={5}
                position='left'
                className='bg-ocean-green-500 text-xs font-medium text-quarter-pearl-lusta-50'
              >
                <Image
                  className='h-[28px] w-[28px] rounded-full object-cover'
                  src={formData.team.logoUrl}
                />
              </Tooltip>
            ) : (
              <Tooltip
                label={formData.team.name}
                offset={10}
                withArrow
                arrowOffset={20}
                arrowSize={5}
                position='left'
                className='bg-ocean-green-500 text-xs font-medium text-quarter-pearl-lusta-50'
              >
                <ActionIcon
                  radius='xl'
                  className='cursor-default bg-transparent hover:bg-transparent'
                >
                  <RiTeamFill
                    size={27}
                    className='bg-gray-200 p-1 text-gray-600'
                  />
                </ActionIcon>
              </Tooltip>
            ))}
          <input
            ref={titleInputRef}
            value={currentTitle}
            onChange={(event) => {
              setCurrentTitle(event.target.value);
              setForm((prevState) => ({
                ...prevState,
                title: event.target.value,
              }));
            }}
            onFocus={() => {
              setIsEditingTitle(true);
            }}
            onBlur={() => {
              setIsEditingTitle(false);
              if (currentTitle === '') {
                setCurrentTitle(DEFAULT_FORM_TITLE);
              }
            }}
            className='min-w-14 overflow-hidden text-ellipsis whitespace-nowrap border-none bg-transparent text-center outline-none'
            style={{ width: `${currentTitle.length * 12}px` }}
          />
          {isPublishSection || isEditingTitle || (
            <MdOutlineModeEditOutline
              size={18}
              onClick={() => {
                titleInputRef.current?.focus();
                setIsEditingTitle(true);
              }}
              className='min-w-[5%]'
            />
          )}
        </div>
        <div className='text-[13px] text-ocean-green-500'>
          {isEditForm &&
            (form.updatedAt
              ? `Last updated at ${updatedDate}`
              : `Created at ${createdDate}`)}
        </div>
      </div>

      {!myProfile || isLoading ? (
        <Loader />
      ) : (
        <div className='flex flex-row items-center gap-6'>
          <Tooltip
            label='Auto generate form'
            offset={7}
            withArrow
            arrowOffset={20}
            arrowSize={4}
            position='bottom'
            className='bg-burnt-sienna-50 text-xs font-medium capitalize text-burnt-sienna-500'
          >
            <ActionIcon
              radius='xl'
              className='size-10 cursor-pointer bg-burnt-sienna-100 p-2 text-burnt-sienna-500 hover:bg-burnt-sienna-100 hover:text-burnt-sienna-500'
              onClick={() => openModal(ModalTypes.AUTO_GEN_FORM)}
            >
              <FaRobot size={24} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label='Import form'
            offset={7}
            withArrow
            arrowOffset={20}
            arrowSize={4}
            position='bottom'
            className='bg-burnt-sienna-50 text-xs font-medium capitalize text-burnt-sienna-500'
          >
            <ActionIcon
              radius='xl'
              className='size-10 cursor-pointer bg-burnt-sienna-100 p-2 text-burnt-sienna-500 hover:bg-burnt-sienna-100 hover:text-burnt-sienna-500'
              onClick={() => openModal(ModalTypes.IMPORT_FORM)}
            >
              <FaFileImport size={20} />
            </ActionIcon>
          </Tooltip>

          <Divider variant='solid' orientation='vertical' color='gray.3' />

          <Menu shadow='sm' offset={5} position='bottom-end' withArrow>
            <Menu.Target>
              <UserAvatar avatarUrl={myProfile.avatarUrl} />
            </Menu.Target>
            <Menu.Dropdown className='min-w-[230px]'>
              <Menu.Item className='p-3 font-medium text-gray-600 delay-100 ease-linear hover:bg-transparent'>
                <Group>
                  <UserAvatar avatarUrl={myProfile.avatarUrl} />
                  <div className='flex gap-1'>
                    <span className='text-[14px] font-normal'>Hello,</span>
                    <span className='text-[14px] font-medium'>
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

      <ImportFormModal
        opened={modalType === ModalTypes.IMPORT_FORM}
        onClose={closeModal}
        onClickCancel={closeModal}
      />

      <AutoGenFormModal
        opened={modalType === ModalTypes.AUTO_GEN_FORM}
        onClose={closeModal}
        onClickCancel={closeModal}
      />
    </header>
  );
};
