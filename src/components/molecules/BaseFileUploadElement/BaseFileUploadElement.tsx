import { Box, Group } from '@mantine/core';
import { Field } from 'formik';

import { useElementLayouts } from '@/contexts';
import { FileUploadElement } from '@/types';
import { cn, validateFieldValue, validateLabel } from '@/utils';

import { BaseElementProps } from '../FactoryElement';
import { FileUpload } from '../FileUpload';
import { Text } from '../Text';

export const BaseFileUploadElement = (
  props: BaseElementProps<FileUploadElement>,
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
          classNameWrapper='min-h-[40px] mt-4'
          className={cn('flex min-h-[20px] items-start gap-1', {
            'text-slate-500': !item.config.fieldLabel,
          })}
        />

        <Field
          name={`${item.fields[0].id}.fieldValue`}
          validate={
            !isReadOnly && item.config.required ? validateFieldValue : null
          }
          handleChange={handleOnChangeAnswer}
          elementFieldId={item.fields[0].id}
          elementId={item.id}
          component={FileUpload}
          value={item.fields[0].text}
          classNameWrapper='min-h-[60px]'
          readOnly={isReadOnly}
        />

        <Field
          name={`${item.id}.sublabel`}
          text={item.config.sublabel}
          placeholder='Type a sublabel'
          validate={validateLabel}
          component={Text}
          classNameWrapper='min-h-[40px] mt-4'
          className={cn(
            'flex min-h-[20px] items-start gap-1 text-[13px] text-slate-500',
            {
              'text-slate-400': !item.config.sublabel,
            },
          )}
        />
      </Box>
    </Group>
  );
};
