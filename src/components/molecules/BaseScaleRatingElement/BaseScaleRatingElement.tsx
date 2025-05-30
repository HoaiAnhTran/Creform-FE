import { Box, Group } from '@mantine/core';
import { Field } from 'formik';

import { useElementLayouts } from '@/contexts';
import { ScaleRatingElement } from '@/types';
import {
  cn,
  validateFieldLabel,
  validateFieldValue,
  validateSubLabel,
} from '@/utils';

import { BaseElementProps } from '../FactoryElement';
import { Rating } from '../Rating';
import { Text } from '../Text';

export const BaseScaleRatingElement = (
  props: BaseElementProps<ScaleRatingElement>,
) => {
  const { item, handleOnChangeAnswer } = props;
  const { isReadOnly } = useElementLayouts();

  return (
    <Box className='flex w-full flex-col justify-center gap-2'>
      <Field
        name={`${item.id}.fieldLabel`}
        text={item.config.fieldLabel}
        placeholder='Type a question'
        required={item.config.required}
        validate={isReadOnly ? validateFieldLabel : null}
        component={Text}
        classNameWrapper='min-h-[50px]'
        className={cn(
          'flex min-h-[20px] items-start gap-1',
          {
            'text-slate-400': !item.config.fieldLabel,
          },
          { invisible: !item.config.fieldLabel && !isReadOnly },
        )}
      />
      <Box className='flex w-max flex-col gap-0 self-center'>
        <Field
          readOnly={isReadOnly}
          name={`${item.fields[0].id}.fieldValue`}
          validate={
            !isReadOnly && item.config.required ? validateFieldValue : null
          }
          elementFieldId={item.fields[0].id}
          elementId={item.id}
          handleChange={handleOnChangeAnswer}
          component={Rating}
          classNameWrapper='min-h-[65px]'
          itemConfig={item.config}
        />
        <Group className='justify-between'>
          <Field
            name={`${item.id}.lowestRatingText`}
            text={item.config.lowestRatingText}
            placeholder='Type worst text'
            validate={isReadOnly ? validateSubLabel : null}
            component={Text}
            classNameWrapper='min-h-[42px] w-max'
            className={cn(
              'flex min-h-[20px] items-start gap-1 text-xs text-slate-600',
              {
                'text-slate-400': !item.config.lowestRatingText,
              },
              { invisible: !item.config.lowestRatingText && !isReadOnly },
            )}
          />
          <Field
            name={`${item.id}.highestRatingText`}
            text={item.config.highestRatingText}
            placeholder='Type best text'
            validate={isReadOnly ? validateSubLabel : null}
            component={Text}
            classNameWrapper='min-h-[42px] w-max'
            className={cn(
              'flex min-h-[20px] items-start gap-1 text-xs text-slate-600',
              {
                'text-slate-400': !item.config.highestRatingText,
              },
              { invisible: !item.config.highestRatingText && !isReadOnly },
            )}
          />
        </Group>
      </Box>
    </Box>
  );
};
