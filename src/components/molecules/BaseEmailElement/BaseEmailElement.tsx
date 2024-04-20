import { Box, Group, Text, TextInput } from '@mantine/core';

//TODO: update BaseEmailElement
export const BaseEmailElement = () => (
  <Group>
    <Box className='w-full'>
      <Text className='text-lg font-bold'>Email</Text>
      <TextInput />
    </Box>
  </Group>
);
