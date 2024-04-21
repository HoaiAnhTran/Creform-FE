import { Box, Group } from '@mantine/core';
import { Field } from 'formik';

import { useElementLayouts } from '@/contexts';
import { EmailElement } from '@/types';
import { cn } from '@/utils';
import {
  emailFormat,
  emailRequired,
  stringRequired,
} from '@/utils/schemas/validation';

import { BaseElementProps } from '../FactoryElement';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

export const BaseEmailElement = (props: BaseElementProps<EmailElement>) => {
  const { item, handleOnChangeAnswer } = props;
  const { isReadOnly } = useElementLayouts();

  const emailValidate = async (value: string) =>
    (item.config.required ? emailRequired : emailFormat)
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);

  const fieldValidate = async (value: string) =>
    stringRequired
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);

  return (
    <Group>
      <Box className='w-full'>
        <Field
          name={`${item.id}.fieldLabel`}
          nameElementField='fieldLabel'
          text={item.config.fieldLabel}
          placeholder='Type a question'
          required={item.config.required}
          validate={fieldValidate}
          component={Text}
          classNameWrapper='min-h-[45px]'
          className={cn('flex min-h-[20px] items-start gap-1', {
            'text-slate-500': !item.config.fieldLabel,
          })}
        />
        <Field
          name={`${item.fields[0].id}.fieldValue`}
          readOnly={isReadOnly}
          value={item.fields[0].text}
          validate={!isReadOnly ? emailValidate : null}
          handleChange={handleOnChangeAnswer}
          nameElementField={item.fields[0].id}
          component={TextInput}
          classNameWrapper='min-h-[60px]'
        />
        <Field
          name={`${item.id}.sublabel`}
          nameElementField='sublabel'
          text={item.config.sublabel}
          placeholder='Type a sublabel'
          validate={fieldValidate}
          component={Text}
          classNameWrapper='min-h-[42px]'
          className='text-xs font-thin text-slate-500'
        />
      </Box>
    </Group>
  );
};
