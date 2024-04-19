import { FaPlusCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Group,
  ModalProps as MantineModalProps,
  Stack,
  Text,
} from '@mantine/core';
import { Field, Form, Formik } from 'formik';

import { Button } from '@/atoms/Button';
import { TeamResponse } from '@/types';
import { signUpSchema } from '@/utils';

import { Modal } from '../Modal';
import { TextInput } from '../TextInput';

interface ManageMemberModalProps extends MantineModalProps {
  teamList?: TeamResponse[];
  teamId: number;
  handleInviteMember: (value: { email: string }) => void;
  handleRemoveMember: (id: number) => void;
}
const emailSchema = signUpSchema.pick(['email']);

const getMembersInTeamWithOwnership = (
  teamList: TeamResponse[],
  teamId: number,
) => {
  const team = teamList.find((team) => team.id === teamId);

  if (!team) return null;

  const membersWithOwnership = team.members.map((member) => ({
    ...member,
    isOwner: member.id === team.creatorId,
  }));

  return membersWithOwnership;
};

export const ManageMemberModal = ({
  teamList = [],
  teamId,
  handleInviteMember,
  handleRemoveMember,
  ...props
}: ManageMemberModalProps) => {
  const membersInTeam = getMembersInTeamWithOwnership(teamList, teamId) || [];
  return (
    <Modal
      {...props}
      headerIcon={<RiTeamFill className='text-white' />}
      headerTitle='Manage member of team'
      body={
        <>
          <Stack className='gap-4 pb-8'>
            <Divider />
            <Text className='font-bold' size='lg'>
              TEAM MEMBERS
            </Text>
            <Stack>
              {membersInTeam.map((member) => (
                <Group className='justify-between'>
                  <Group>
                    <Avatar />
                    <Stack gap='2'>
                      <Text size='sm' className='font-bold text-gray-700'>
                        {member.username}
                      </Text>
                      <Text size='xs' className='font-bold text-blue-950'>
                        {member.email}
                      </Text>
                    </Stack>
                  </Group>
                  <Group>
                    <Box className='rounded-sm bg-gray-200 p-2'>
                      <Text className='font-bold text-gray-600'>
                        {member.isOwner ? 'Owner' : 'Member'}
                      </Text>
                    </Box>
                    <ActionIcon
                      className='bg-red-500 text-white hover:bg-red-600 hover:text-white'
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <MdDelete size={18} />
                    </ActionIcon>
                  </Group>
                </Group>
              ))}
            </Stack>
          </Stack>
          <Formik
            initialValues={{ email: '' }}
            validateOnBlur={true}
            validateOnChange={false}
            validationSchema={emailSchema}
            onSubmit={handleInviteMember}
          >
            <Form className='flex w-full justify-between'>
              <Field
                name='email'
                placeholder='Type email'
                classNameWrapper='w-[75%]'
                component={TextInput}
              />
              <Button
                className='font-bold'
                title='Invite member'
                variant='outline'
                color='gray'
                type='submit'
                leftSection={<FaPlusCircle />}
              />
            </Form>
          </Formik>
        </>
      }
      hasFooter={false}
    />
  );
};
