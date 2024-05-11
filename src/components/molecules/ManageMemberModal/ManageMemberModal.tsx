import { IoSend, IoTrash } from 'react-icons/io5';
import { RiTeamFill } from 'react-icons/ri';
import {
  ActionIcon,
  Box,
  Group,
  ModalProps as MantineModalProps,
  Stack,
  Text,
} from '@mantine/core';
import { Field, Form, Formik } from 'formik';

import { Button } from '@/atoms/Button';
import { UserAvatar } from '@/atoms/UserAvatar';
import { TeamResponse } from '@/types';
import { addRoleToTeamMembers, signUpSchema } from '@/utils';

import { Modal } from '../Modal';
import { TextInput } from '../TextInput';

interface ManageMemberModalProps extends MantineModalProps {
  teamList?: TeamResponse[];
  teamId: string;
  handleInviteMember: (value: { email: string }) => void;
  handleRemoveMember: (id: string) => void;
  isLoading: boolean;
}

const getTeamMembersWithRole = (teamList: TeamResponse[], teamId: string) => {
  const team = teamList.find((team) => team.id === teamId);
  if (!team) return null;
  const membersWithRoles = addRoleToTeamMembers(team);
  return membersWithRoles;
};

export const ManageMemberModal = ({
  teamList = [],
  teamId,
  handleInviteMember,
  handleRemoveMember,
  isLoading,
  ...props
}: ManageMemberModalProps) => {
  const membersInTeam = getTeamMembersWithRole(teamList, teamId) || [];

  return (
    <Modal
      {...props}
      headerIcon={<RiTeamFill className='text-white' />}
      headerTitle='Manage members'
      body={
        <Stack className='gap-4 pb-1 pt-4'>
          <Stack className='justify-between gap-4'>
            <Text className='font-bold' size='md'>
              {`TEAM MEMBERS (${membersInTeam.length})`}
            </Text>
            <Stack>
              {membersInTeam.map((member) => (
                <Group key={member.id} className='justify-between'>
                  <Group>
                    <UserAvatar avatarUrl={member.avatarUrl} />
                    <Stack gap='2'>
                      <Text size='sm' className='font-semibold text-gray-700'>
                        {member.username}
                      </Text>
                      <Text size='xs' className='font-medium text-gray-500'>
                        {member.email}
                      </Text>
                    </Stack>
                  </Group>
                  <Group className='gap-3'>
                    <Box className='rounded-[4px] bg-gray-200 p-2'>
                      <Text className='text-sm font-bold text-gray-600'>
                        {member.isOwner ? 'Team Owner' : 'Member'}
                      </Text>
                    </Box>
                    {!member.isOwner && (
                      <ActionIcon
                        className='h-[34px] w-[34px] bg-red-500 text-white hover:bg-red-600 hover:text-white'
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <IoTrash size={18} />
                      </ActionIcon>
                    )}
                  </Group>
                </Group>
              ))}
            </Stack>
          </Stack>
          <Formik
            initialValues={{ email: '' }}
            validateOnBlur={true}
            validateOnChange={true}
            validationSchema={signUpSchema.pick(['email'])}
            onSubmit={handleInviteMember}
          >
            <div className='flex flex-col justify-between gap-4'>
              <Text className='font-bold' size='md'>
                INVITE MEMBER
              </Text>
              <Form className='flex w-full justify-between'>
                <Field
                  name='email'
                  placeholder='Enter an email address'
                  classNameWrapper='w-[75%]'
                  component={TextInput}
                />
                <Button
                  className='font-bold'
                  title='Send Invitation'
                  variant='outline'
                  color='gray'
                  type='submit'
                  leftSection={<IoSend />}
                />
              </Form>
            </div>
          </Formik>
        </Stack>
      }
      hasFooter={false}
      isLoading={isLoading}
    />
  );
};
