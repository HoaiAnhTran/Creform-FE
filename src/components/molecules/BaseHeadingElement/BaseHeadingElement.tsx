import { Box, Group, TextInput } from '@mantine/core';

import { HeadingElement } from '@/types';

import { BaseElementProps } from '../FactoryElement';

export const BaseHeadingElement = (props: BaseElementProps<HeadingElement>) => {
  const { item } = props;

  return (
    <Group className='justify-between'>
      <Box className='w-full'>
        <TextInput
          autoComplete='off'
          name='headingText'
          classNames={{
            input: 'text-xl font-bold w-fit',
          }}
          variant='unstyled'
          placeholder='Type a question'
          value={item.config.headingText}
          readOnly
        ></TextInput>
        <TextInput
          autoComplete='off'
          name='subheadingText'
          variant='unstyled'
          classNames={{
            input: 'text-sm font-thin text-slate-500',
          }}
          value={item.config.subheadingText}
          readOnly
        ></TextInput>
      </Box>
    </Group>
  );
};
