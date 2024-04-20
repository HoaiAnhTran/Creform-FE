import { Box, Group, Stack, Text, TextInput } from '@mantine/core';

import { useElementLayouts } from '@/contexts';
import { FullnameElement } from '@/types';
import { cn } from '@/utils';

import { BaseElementProps } from '../FactoryElement';

export const BaseFullnameElement = (
  props: BaseElementProps<FullnameElement>,
) => {
  const { item } = props;
  const { isReadOnly } = useElementLayouts();

  return (
    <Stack className='w-full justify-between gap-2.5'>
      <TextInput
        label={item.config.fieldLabel || 'Type a question'}
        withAsterisk={item.config.required}
        classNames={{
          input: 'hidden',
          label: cn('text-lg font-medium', {
            'text-gray-400': item.config.fieldLabel.length === 0,
          }),
        }}
      />
      <Group className='w-full flex-nowrap items-center justify-between'>
        <Box className='flex w-1/2 flex-col justify-between gap-2'>
          <TextInput readOnly={isReadOnly} />
          <Text className='text-[13px]'>{item.config.sublabels.firstName}</Text>
        </Box>
        <Box className='flex w-1/2 flex-col justify-between gap-2'>
          <TextInput readOnly={isReadOnly} />
          <Text className='text-[13px]'>{item.config.sublabels.lastName}</Text>
        </Box>
      </Group>
    </Stack>
  );
};
