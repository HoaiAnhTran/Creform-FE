import { Box, Group, TextInput as TextInputMantine } from '@mantine/core';
import { Field } from 'formik';

import { useElementLayouts } from '@/contexts';
import { EmailElement } from '@/types';
import { cn } from '@/utils';
import { emailFormat, emailRequired } from '@/utils/schemas/validation';

import { BaseElementProps } from '../FactoryElement';
import { TextInput } from '../TextInput';

export const BaseEmailElement = (props: BaseElementProps<EmailElement>) => {
  const { item, handleOnChangeAnswer } = props;
  const { isReadOnly } = useElementLayouts();

  const validate = async (value: string) =>
    (item.config.required ? emailRequired : emailFormat)
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);

  return (
    <Group>
      <Box className='w-full'>
        <TextInputMantine
          label={item.config.fieldLabel || 'Type a question'}
          withAsterisk={item.config.required}
          classNames={{
            input: 'hidden',
            label: cn('mb-2 text-base font-[500]', {
              'text-gray-400': item.config.fieldLabel.length === 0,
            }),
          }}
        />
        <Field
          name={`${item.id}.fieldValue`}
          required={item.config.required}
          readOnly={isReadOnly}
          value={item.fields[0].text}
          validate={!isReadOnly ? validate : null}
          handleChange={handleOnChangeAnswer(item.fields[0].id)}
          component={TextInput}
        />

        <TextInputMantine
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
