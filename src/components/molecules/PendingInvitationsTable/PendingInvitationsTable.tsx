import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { ScrollArea, Stack, Table, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { useDeleteInvitationMutation } from '@/redux/api/invitationApi';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { ErrorResponse, TeamResponse } from '@/types';
import { formatDate, toastify } from '@/utils';

interface PendingInvitationsTableProps {
  team: TeamResponse;
}

export const PendingInvitationsTable = ({
  team,
}: PendingInvitationsTableProps) => {
  const invitations = team.invitations.filter(
    ({ accepted, expiresAt }) =>
      accepted === false && new Date(expiresAt) > new Date(Date.now()),
  );

  const { data: myProfile } = useGetMyProfileQuery({});

  const [deletedInvitationId, setDeletedInvitationId] = useState<string>('');

  const [deleteInvitation, { isLoading: isInvitationDeleting }] =
    useDeleteInvitationMutation();

  const handleDeleteInvitation = (invitationId: string) => {
    deleteInvitation({ id: invitationId }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  return (
    <Stack className='relative h-full gap-10'>
      <Text className='text-[26px] font-semibold text-ocean-green-600'>
        Pending Invitations
      </Text>

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
              <Table.Th>Email</Table.Th>
              <Table.Th>Invited On</Table.Th>
              <Table.Th>Invited By</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {invitations.length > 0 ? (
              invitations.map((invitation) => (
                <Table.Tr key={invitation.id} className='border-0 [&>td]:py-4'>
                  <Table.Td>{invitation.email}</Table.Td>
                  <Table.Td>
                    {formatDate(invitation.createdAt, 'MMM D, YYYY HH:mm:ss A')}
                  </Table.Td>
                  <Table.Td>
                    {invitation.creator.email === myProfile?.email
                      ? 'Me'
                      : invitation.creator.username}
                  </Table.Td>
                  <Table.Td className='flex justify-center'>
                    {invitation.creator.email === myProfile?.email ? (
                      <Button
                        size='sm'
                        title='Cancel Invitation'
                        variant='light'
                        color='error'
                        leftSection={<IoClose size={16} />}
                        onClick={() => {
                          setDeletedInvitationId(invitation.id);
                          handleDeleteInvitation(invitation.id);
                        }}
                        disabled={
                          isInvitationDeleting &&
                          deletedInvitationId === invitation.id
                        }
                        classNames={{
                          section: 'mr-1',
                        }}
                      />
                    ) : null}
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr className='border-0'>
                <Table.Td
                  className='px-[10px] py-4 text-center text-sm text-slate-500'
                  colSpan={3}
                >
                  No pending invitations found.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Stack>
  );
};
