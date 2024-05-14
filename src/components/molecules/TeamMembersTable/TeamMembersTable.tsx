import { useState } from 'react';
import { IoPersonAdd, IoTrash } from 'react-icons/io5';
import { ActionIcon, ScrollArea, Stack, Table, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { UserAvatar } from '@/atoms/UserAvatar';
import { useRemoveMemberMutation } from '@/redux/api/teamApi';
import { ErrorResponse, ModalType, ModalTypes, TeamResponse } from '@/types';
import { addRoleToTeamMembers, toastify } from '@/utils';

import { InviteMemberModal } from '../InviteMemberModal';

interface TeamMembersTableProps {
  team: TeamResponse;
}

export const TeamMembersTable = ({ team }: TeamMembersTableProps) => {
  const [modalType, setModalType] = useState<ModalType | ''>('');

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const [deletedMemberId, setDeletedMemberId] = useState<string>('');

  const membersWithRole = addRoleToTeamMembers(team);

  const [removeMember, { isLoading: isRemovingMember }] =
    useRemoveMemberMutation();

  const handleRemoveMember = (id: string) => {
    removeMember({ id: team.id, memberIds: [id] }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  return (
    <>
      <Stack className='relative h-full gap-4'>
        <Text className='text-[26px] font-semibold text-ocean-green-600'>
          Team Members
        </Text>

        <Button
          title='Invite Member'
          leftSection={<IoPersonAdd size={16} />}
          className='w-max self-end'
          onClick={() => openModal(ModalTypes.INVITE_MEMBER)}
        />

        <ScrollArea
          className='relative h-full w-full'
          classNames={{
            scrollbar: 'mt-[52px]',
            thumb: 'bg-scrollbarThumbBgColor',
          }}
        >
          <Table className='text-sm'>
            <Table.Thead className='sticky top-0 bg-ocean-green-50'>
              <Table.Tr className='border-0 [&>th]:py-4 [&>th]:font-semibold [&>th]:text-slate-800'>
                <Table.Th className='w-24'></Table.Th>
                <Table.Th>Username</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {membersWithRole.map((member) => (
                <Table.Tr key={member.id} className='border-0 [&>td]:py-4'>
                  <Table.Td className='flex justify-center'>
                    <UserAvatar
                      avatarUrl={member.avatarUrl}
                      size={32}
                      defaultIconSize={16}
                    />
                  </Table.Td>
                  <Table.Td>{member.username}</Table.Td>
                  <Table.Td>{member.email}</Table.Td>
                  <Table.Td>{member.role}</Table.Td>
                  <Table.Td className='flex justify-center'>
                    {member.isOwner ? null : (
                      <ActionIcon
                        variant='light'
                        color='red'
                        onClick={() => {
                          setDeletedMemberId(member.id);
                          handleRemoveMember(member.id);
                        }}
                        disabled={
                          isRemovingMember && deletedMemberId === member.id
                        }
                      >
                        <IoTrash size={16} />
                      </ActionIcon>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Stack>
      <InviteMemberModal
        opened={modalType === ModalTypes.INVITE_MEMBER}
        onClose={closeModal}
        onClickCancel={closeModal}
        teamId={team.id}
      />
    </>
  );
};
