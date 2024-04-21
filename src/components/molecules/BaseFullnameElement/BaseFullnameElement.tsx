import {
  Box,
  Group,
  Stack,
  Text,
  TextInput as TextInputMantine,
} from '@mantine/core';
import { Field } from 'formik';

import { useElementLayouts } from '@/contexts';
import { FullnameElement } from '@/types';
import { cn } from '@/utils';
import { stringRequired } from '@/utils/schemas/validation';

import { BaseElementProps } from '../FactoryElement';
import { TextInput } from '../TextInput';

export const BaseFullnameElement = (
  props: BaseElementProps<FullnameElement>,
) => {
  const { item, handleOnChangeAnswer } = props;
  const { isReadOnly } = useElementLayouts();

  const validate = async (value: string) =>
    stringRequired
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);

  return (
    <Stack className='w-full justify-between gap-2.5'>
      <TextInputMantine
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
          <Field
            name={`${item.fields[0].id}.fieldValue`}
            required={item.config.required}
            readOnly={isReadOnly}
            validate={!isReadOnly && item.config.required ? validate : null}
            handleChange={handleOnChangeAnswer(item.fields[0].id)}
            component={TextInput}
            value={item.fields[0].text}
          />
          <Text className='text-[13px]'>{item.config.sublabels.firstName}</Text>
        </Box>
        <Box className='flex w-1/2 flex-col justify-between gap-2'>
          <Field
            name={`${item.fields[1].id}.fieldValue`}
            required={item.config.required}
            readOnly={isReadOnly}
            validate={!isReadOnly && item.config.required ? validate : null}
            handleChange={handleOnChangeAnswer(item.fields[1].id)}
            component={TextInput}
            value={item.fields[1].text}
          />
          <Text className='text-[13px]'>{item.config.sublabels.lastName}</Text>
        </Box>
      </Group>
    </Stack>
  );
};
