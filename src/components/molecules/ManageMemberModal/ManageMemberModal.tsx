import { FaPlusCircle } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import {
  Avatar,
  Box,
  Divider,
  Group,
  ModalProps as MantineModalProps,
  Stack,
  Text,
} from '@mantine/core';

import { Button } from '@/atoms/Button';

import { Modal } from '../Modal';

interface ManageMemberModalProps extends MantineModalProps {
  handleInviteMember: () => void;
}

export const ManageMemberModal = ({
  handleInviteMember,
  ...props
}: ManageMemberModalProps) => (
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
            <Group className='justify-between'>
              <Group>
                <Avatar />
                <Stack gap='2'>
                  <Text size='sm' className='font-bold text-gray-700'>
                    Trinh trần
                  </Text>
                  <Text size='xs' className='font-bold text-blue-950'>
                    trinhtran.dmx2@gmail.com
                  </Text>
                </Stack>
              </Group>
              <Box className='rounded-sm bg-gray-200 p-2'>
                <Text className='font-bold text-gray-600'>Team admin</Text>
              </Box>
            </Group>
          </Stack>
        </Stack>
        <Button
          onClick={handleInviteMember}
          className='font-bold'
          title='Invite member'
          variant='outline'
          color='gray'
          leftSection={<FaPlusCircle />}
        />
      </>
    }
    hasFooter={false}
  />
);
