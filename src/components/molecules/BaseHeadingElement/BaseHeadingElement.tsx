import { Box, Group, TextInput } from '@mantine/core';

import { HeadingConfig, HeadingElement } from '@/types';

import { BaseElementProps } from '../FactoryElement';

export const BaseHeadingElement = (props: BaseElementProps<HeadingElement>) => {
  const { item, updateItem, handleConfig } = props;

  const handleChange =
    (key: keyof HeadingConfig) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleConfig({
        ...item.config,
        [key]: event.currentTarget.value,
      });
      updateItem({
        ...item,
        config: {
          ...item.config,
          [key]: event.currentTarget.value,
        },
      });
    };

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
          placeholder='Type a header'
          value={item.config.headingText || ''}
          onChange={handleChange('headingText')}
        ></TextInput>
        <TextInput
          autoComplete='off'
          name='subheadingText'
          variant='unstyled'
          classNames={{
            input: 'text-sm font-thin text-slate-500',
          }}
          placeholder='Type a subheader'
          value={item.config.subheadingText || ''}
          onChange={handleChange('subheadingText')}
        ></TextInput>
      </Box>
    </Group>
  );
};
