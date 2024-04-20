import { Stack, Text, TextInput } from '@mantine/core';

import { BasePropertiesProps } from '@/organisms/PropertiesRightbar';
import { ShortTextElement } from '@/types';

export const ShortTextPropertiesConfig = (
  props: BasePropertiesProps<ShortTextElement>,
) => {
  const { edittingItem, updateItem, handleConfig } = props;

  const handleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleConfig({
        ...edittingItem?.config,
        [key]: event.currentTarget.value,
      });
      updateItem({
        ...edittingItem,
        config: {
          ...edittingItem.config,
          [key]: event.currentTarget.value,
        },
      });
    };

  return (
    <>
      <Stack className='p-3'>
        <Text className='font-bold text-white'>Field Label</Text>
        <TextInput
          autoComplete='off'
          className='rounded-md border border-solid border-slate-600 bg-slate-100'
          value={edittingItem?.config.fieldLabel}
          onChange={handleChange('fieldLabel')}
        />
      </Stack>
      <Stack className='p-3'>
        <Text className='font-bold text-white'>Sub Label</Text>
        <TextInput
          autoComplete='off'
          className='rounded-md border border-solid border-slate-600 bg-slate-100'
          value={edittingItem?.config.sublabel}
          onChange={handleChange('sublabel')}
        />
      </Stack>
    </>
  );
};
