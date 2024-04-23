import { Box, Group } from '@mantine/core';
import { Field } from 'formik';

import { useElementLayouts } from '@/contexts';
import { DropdownElement } from '@/types';
import { cn, validateLabel } from '@/utils';

import { Combobox } from '../Combobox';
import { BaseElementProps } from '../FactoryElement';
import { Text } from '../Text';

export const BaseDropdownElement = (
  props: BaseElementProps<DropdownElement>,
) => {
  const { item, handleOnChangeAnswer } = props;
  const { isReadOnly } = useElementLayouts();

  return (
    <Group>
      <Box className='w-full'>
        <Field
          name={`${item.id}.fieldLabel`}
          text={item.config.fieldLabel}
          placeholder='Type a question'
          required={item.config.required}
          validate={validateLabel}
          component={Text}
          classNameWrapper='min-h-[45px]'
          className={cn('flex min-h-[28px] items-start gap-1', {
            'text-slate-500': !item.config.fieldLabel,
          })}
        />
        <Field
          name={`${item.fields[0].id}.fieldValue`}
          readOnly={isReadOnly}
          item={item}
          validate={!isReadOnly && item.config.required ? validateLabel : null}
          handleChange={handleOnChangeAnswer}
          elementFieldId={item.fields[0].id}
          component={Combobox}
          classNameWrapper='min-h-[56px]'
        />
        <Field
          name={`${item.id}.sublabel`}
          text={item.config.sublabel}
          placeholder='Type a sublabel'
          validate={validateLabel}
          component={Text}
          classNameWrapper='min-h-[42px]'
          className='text-xs font-thin text-slate-500'
        />
      </Box>
    </Group>
  );
};
