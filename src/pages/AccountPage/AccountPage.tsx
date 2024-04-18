import { ChangeEvent, useRef, useState } from 'react';
import {
  Avatar,
  Container,
  Group,
  Input,
  PasswordInput,
  Stack,
  Text,
} from '@mantine/core';

import { Button } from '@/atoms/Button';
import { UserInfoItem } from '@/molecules/UserInfoItem';
import { type ImageType, UploadImage } from '@/types';

// TODO: remove this data later when have API
const userData = {
  username: 'Jane',
  avatar: '',
  email: 'jane@gmail.com',
  organizationName: '',
  organizationLogo: '',
};

interface CurrentUser {
  username: string;
  avatar: string;
  email: string;
  organizationName: string;
  organizationLogo: string;
}

export const AccountPage = () => {
  const [editingFieldName, setEditingFieldName] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    username: userData.username ?? '',
    avatar: userData.avatar ?? '',
    email: userData.email ?? '',
    organizationName: userData.organizationName ?? '',
    organizationLogo: userData.organizationLogo ?? '',
  });

  const handleEdit = (fieldName: string) => {
    setEditingFieldName(fieldName);
  };

  const handleCancelEdit = () => {
    setEditingFieldName('');
  };

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = (type: ImageType) =>
    type === UploadImage.AVATAR
      ? avatarInputRef.current?.click()
      : logoInputRef.current?.click();

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: ImageType,
  ) => {
    if (!event.target.files) return;
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Encoded = reader?.result?.toString() ?? '';
      if (type === UploadImage.AVATAR) {
        setCurrentUser((prev) => ({ ...prev, avatar: base64Encoded }));
        handleEdit('Avatar');
      } else {
        setCurrentUser((prev) => ({
          ...prev,
          organizationLogo: base64Encoded,
        }));
        handleEdit('Organization Logo');
      }
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const userInfoItems = [
    {
      fieldName: 'Username',
      content:
        editingFieldName === 'Username' ? (
          <Stack className='w-1/2'>
            <Input
              placeholder='Username'
              value={currentUser.username}
              onChange={(event) =>
                setCurrentUser((prev) => ({
                  ...prev,
                  username: event.target.value,
                }))
              }
              autoFocus
            />
            <Button title='Save' />
          </Stack>
        ) : (
          <Text>{userData.username}</Text>
        ),
      hasEditButton: true,
      isLastItem: false,
    },
    {
      fieldName: 'Password',
      content:
        editingFieldName === 'Password' ? (
          <Stack className='w-1/2'>
            <PasswordInput placeholder='Current password' autoFocus />
            <PasswordInput placeholder='New password' />
            <PasswordInput placeholder='Confirm password' />
            <Group>
              <Button title='Save' className='flex-1' />
              <Button
                title='Cancel'
                color='gray'
                className='flex-1'
                onClick={handleCancelEdit}
              />
            </Group>
          </Stack>
        ) : (
          <Button
            title='Change password'
            onClick={() => handleEdit('Password')}
          />
        ),
      hasEditButton: false,
      isLastItem: false,
    },
    {
      fieldName: 'Avatar',
      content:
        editingFieldName === 'Avatar' ? (
          <Group align='center'>
            <Avatar variant='filled' radius='sm' src={currentUser.avatar} />
            <input
              type='file'
              ref={avatarInputRef}
              onChange={(event) => handleImageChange(event, UploadImage.AVATAR)}
              className='hidden'
              accept='image/*'
            />
            <Button title='Save' />
            <Button
              title='Cancel'
              color='gray'
              onClick={() => {
                setCurrentUser((prev) => ({
                  ...prev,
                  avatar: userData.avatar ?? '',
                }));
                handleCancelEdit();
              }}
            />
          </Group>
        ) : (
          <Group>
            {userData.avatar ? (
              <Avatar variant='filled' radius='sm' src={currentUser.avatar} />
            ) : null}
            <input
              type='file'
              ref={avatarInputRef}
              onChange={(event) => handleImageChange(event, UploadImage.AVATAR)}
              className='hidden'
              accept='image/*'
            />
            <Button
              title={userData.avatar ? 'Change avatar' : 'Upload avatar'}
              onClick={() => handleUploadImage(UploadImage.AVATAR)}
            />
          </Group>
        ),
      hasEditButton: false,
      isLastItem: false,
    },
    {
      fieldName: 'Email',
      content:
        editingFieldName === 'Email' ? (
          <Stack className='w-1/2'>
            <Input
              placeholder='Email'
              value={currentUser.email}
              onChange={(event) =>
                setCurrentUser((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              autoFocus
            />
            <Button title='Save' />
          </Stack>
        ) : (
          <Text>{userData.email}</Text>
        ),
      hasEditButton: true,
      isLastItem: false,
    },
    {
      fieldName: 'Organization Name',
      content:
        editingFieldName === 'Organization Name' ? (
          <Stack className='w-1/2'>
            <Input
              placeholder='Organization Name'
              value={currentUser.organizationName}
              onChange={(event) =>
                setCurrentUser((prev) => ({
                  ...prev,
                  organizationName: event.target.value,
                }))
              }
              autoFocus
            />
            <Button title='Save' />
          </Stack>
        ) : (
          <Text>{userData.organizationName}</Text>
        ),
      hasEditButton: true,
      isLastItem: false,
    },
    {
      fieldName: 'Organization Logo',
      content:
        editingFieldName === 'Organization Logo' ? (
          <Group align='center'>
            <Avatar
              variant='filled'
              radius='sm'
              src={currentUser.organizationLogo}
            />
            <input
              type='file'
              ref={logoInputRef}
              onChange={(event) => handleImageChange(event, UploadImage.LOGO)}
              className='hidden'
              accept='image/*'
            />
            <Button title='Save' />
            <Button
              title='Cancel'
              color='gray'
              onClick={() => {
                setCurrentUser((prev) => ({
                  ...prev,
                  organizationLogo: userData.organizationLogo ?? '',
                }));
                handleCancelEdit();
              }}
            />
          </Group>
        ) : (
          <Group>
            {userData.organizationLogo ? (
              <Avatar
                variant='filled'
                radius='sm'
                src={currentUser.organizationLogo}
              />
            ) : null}
            <input
              type='file'
              ref={logoInputRef}
              onChange={(event) => handleImageChange(event, UploadImage.LOGO)}
              className='hidden'
              accept='image/*'
            />
            {userData.organizationLogo ? (
              <>
                <Button
                  title='Change logo'
                  onClick={() => handleUploadImage(UploadImage.LOGO)}
                />
                <Button title='Remove' variant='outline' />
              </>
            ) : (
              <Button
                title='Add organization logo'
                onClick={() => handleUploadImage(UploadImage.LOGO)}
              />
            )}
          </Group>
        ),
      hasEditButton: false,
      isLastItem: true,
    },
  ];

  return (
    <Container size='xl' className='m-0 p-0'>
      <Stack className='h-full w-screen bg-malachite-600 px-60'>
        <Stack className='items-center justify-start gap-12 rounded-md bg-white px-14 py-7'>
          <Text className='text-center text-3xl font-medium'>
            Update Account and General Information
          </Text>
          <Stack className='w-full gap-5'>
            {userInfoItems.map((item) => (
              <UserInfoItem
                editingFieldName={editingFieldName}
                handleEdit={handleEdit}
                handleCancelEdit={handleCancelEdit}
                fieldName={item.fieldName}
                content={item.content}
                hasEditButton={item.hasEditButton}
                isLastItem={item.isLastItem}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
