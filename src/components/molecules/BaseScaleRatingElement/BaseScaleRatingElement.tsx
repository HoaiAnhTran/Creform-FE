import { Box } from '@mantine/core';
import { Field } from 'formik';

import { useElementLayouts } from '@/contexts';
import { ScaleRatingElement } from '@/types';
import { cn, validateLabel } from '@/utils';

import { BaseElementProps } from '../FactoryElement';
import { Rating } from '../Rating';
import { Text } from '../Text';

export const BaseScaleRatingElement = (
  props: BaseElementProps<ScaleRatingElement>,
) => {
  const { item, handleOnChangeAnswer } = props;
  const { isReadOnly } = useElementLayouts();

  return (
    <Box className='w-full'>
      <Field
        name={`${item.id}.fieldLabel`}
        text={item.config.fieldLabel}
        placeholder='Type a question'
        required={item.config.required}
        validate={validateLabel}
        component={Text}
        classNameWrapper='min-h-[40px]'
        className={cn('flex min-h-[20px] items-start gap-1', {
          'text-slate-500': !item.config.fieldLabel,
        })}
      />
      <Field
        name={`${item.fields[0].id}.fieldValue`}
        classNameWrapper='w-full'
        validate={!isReadOnly && item.config.required ? validateLabel : null}
        elementFieldId={item.fields[0].id}
        elementId={item.id}
        highlightSelectedOnly
        readOnly={isReadOnly}
        handleChange={handleOnChangeAnswer}
        itemConfig={item.config}
        component={Rating}
      />
    </Box>
  );
};
