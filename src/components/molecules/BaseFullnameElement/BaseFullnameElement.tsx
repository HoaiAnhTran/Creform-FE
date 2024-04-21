import { Box, Group } from '@mantine/core';
import { Field } from 'formik';

import { useElementLayouts } from '@/contexts';
import { FullnameElement } from '@/types';
import { cn } from '@/utils';
import { stringRequired } from '@/utils/schemas/validation';

import { BaseElementProps } from '../FactoryElement';
import { Text } from '../Text';
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
    <Group>
      <Box className='w-full'>
        <Field
          name={`${item.id}.fieldLabel`}
          nameElementField='fieldLabel'
          text={item.config.fieldLabel}
          placeholder='Type a question'
          required={item.config.required}
          validate={validate}
          component={Text}
          classNameWrapper='min-h-[40px]'
          className={cn('flex min-h-[20px] items-start gap-1', {
            'text-slate-500': !item.config.fieldLabel,
          })}
        />
        <Group className='w-full flex-nowrap items-center justify-between'>
          <Box className='flex w-1/2 flex-col justify-between'>
            <Field
              name={`${item.fields[0].id}.fieldValue`}
              readOnly={isReadOnly}
              validate={!isReadOnly && item.config.required ? validate : null}
              handleChange={handleOnChangeAnswer}
              nameElementField={item.fields[0].id}
              component={TextInput}
              value={item.fields[0].text}
              classNameWrapper='min-h-[60px]'
            />
            <Field
              name={`${item.id}.sublabels.firstName`}
              nameElementField='sublabels.firstName'
              text={item.config.sublabels.firstName}
              placeholder='Type a sublabel'
              validate={validate}
              component={Text}
              classNameWrapper='min-h-[40px]'
              className='text-[13px] font-thin text-slate-500'
            />
          </Box>
          <Box className='flex w-1/2 flex-col justify-between'>
            <Field
              name={`${item.fields[1].id}.fieldValue`}
              readOnly={isReadOnly}
              validate={!isReadOnly && item.config.required ? validate : null}
              handleChange={handleOnChangeAnswer}
              nameElementField={item.fields[1].id}
              component={TextInput}
              value={item.fields[1].text}
              classNameWrapper='min-h-[60px]'
            />
            <Field
              name={`${item.id}.sublabels.lastName`}
              nameElementField='sublabels.lastName'
              text={item.config.sublabels.lastName}
              placeholder='Type a sublabel'
              validate={validate}
              component={Text}
              classNameWrapper='min-h-[40px]'
              className='text-[13px] font-thin text-slate-500'
            />
          </Box>
        </Group>
      </Box>
    </Group>
  );
};
