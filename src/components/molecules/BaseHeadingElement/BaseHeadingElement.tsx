import { Box, Group } from '@mantine/core';
import { Field } from 'formik';

import { useElementLayouts } from '@/contexts';
import { HeadingElement } from '@/types';
import { cn, validateFieldLabel, validateSubLabel } from '@/utils';

import { BaseElementProps } from '../FactoryElement';
import { Text } from '../Text';

export const BaseHeadingElement = (props: BaseElementProps<HeadingElement>) => {
  const { item } = props;
  const { isReadOnly } = useElementLayouts();

  return (
    <Group className='justify-between'>
      <Box className='w-full'>
        <Field
          name={`${item.id}.headingText`}
          text={item.config.headingText}
          placeholder='Type a question'
          validate={isReadOnly ? validateFieldLabel : null}
          component={Text}
          classNameWrapper='min-h-[45px] mt-2'
          className={cn(
            'flex min-h-[20px] items-start gap-1 text-2xl font-bold',
            {
              'text-slate-400': !item.config.headingText,
            },
            { invisible: !item.config.headingText && !isReadOnly },
          )}
        />
        <Field
          name={`${item.id}.subheadingText`}
          text={item.config.subheadingText}
          placeholder='Type a subheading'
          validate={isReadOnly ? validateSubLabel : null}
          component={Text}
          classNameWrapper='min-h-[42px]'
          className={cn(
            'flex min-h-[20px] items-start gap-1 text-[13px] text-slate-600',
            {
              'text-slate-400': !item.config.subheadingText,
            },
            { invisible: !item.config.subheadingText && !isReadOnly },
          )}
        />
      </Box>
    </Group>
  );
};
