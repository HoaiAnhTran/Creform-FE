import { Box, Group, TextInput } from '@mantine/core';

import { EmailElement } from '@/types';
import { cn } from '@/utils';

import { BaseElementProps } from '../FactoryElement';

export const BaseEmailElement = (props: BaseElementProps<EmailElement>) => {
  const { item } = props;

  return (
    <Group>
      <Box className='w-full'>
        <TextInput
          label={item.config.fieldLabel || 'Type a question'}
          withAsterisk={item.config.required}
          classNames={{
            input: 'hidden',
            label: cn('mb-2 text-base font-[500]', {
              'text-gray-400': item.config.fieldLabel.length === 0,
            }),
          }}
        />
        <TextInput name='fieldLabel' required={item.config.required} readOnly />
        <TextInput
          autoComplete='off'
          name='sublabel'
          variant='unstyled'
          classNames={{
            input: 'text-xs font-thin text-slate-500',
          }}
          value={item.config.sublabel}
          readOnly
        />
      </Box>
    </Group>
  );
};
