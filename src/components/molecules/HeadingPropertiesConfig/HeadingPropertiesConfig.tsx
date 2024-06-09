import { Stack, Text, Textarea, TextInput } from '@mantine/core';

import { BasePropertiesProps } from '@/organisms/PropertiesRightbar';
import { HeadingConfig, HeadingElement } from '@/types';

export const HeadingPropertiesConfig = (
  props: BasePropertiesProps<HeadingElement>,
) => {
  const { edittingItem, updateItem, handleConfig } = props;

  const handleChange =
    (key: keyof HeadingConfig) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleConfig({
        ...edittingItem.config,
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

  const handleChangeSubheadingText = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    handleConfig({
      ...edittingItem?.config,
      subheadingText: event.currentTarget.value,
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem?.config,
        subheadingText: event.currentTarget.value,
      },
    });
  };

  return (
    <>
      <Stack className='p-3'>
        <Text className='font-semibold text-white'>Heading text</Text>
        <TextInput
          autoComplete='off'
          className='rounded-md bg-slate-100'
          value={edittingItem.config.headingText}
          onChange={handleChange('headingText')}
        />
      </Stack>
      <Stack className='p-3'>
        <Text className='font-semibold text-white'>Subheading text</Text>
        <Textarea
          autosize
          minRows={1}
          maxRows={5}
          resize='vertical'
          value={edittingItem.config.subheadingText}
          onChange={handleChangeSubheadingText}
          maxLength={250}
        />
      </Stack>
    </>
  );
};
