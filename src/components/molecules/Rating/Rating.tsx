import { useEffect } from 'react';
import {
  Box,
  Group,
  Rating as RatingMantine,
  RatingProps as RatingMantineProps,
  Text,
} from '@mantine/core';
import { ErrorMessage, FieldInputProps, FormikErrors } from 'formik';

import { ScaleRatingConfig } from '@/types';
import { cn } from '@/utils/cn';

interface RatingProps extends Omit<RatingMantineProps, 'form'> {
  handleChange?: (
    elementId: string,
    elementFieldId: string,
    value: string,
  ) => void;
  classNameError?: string;
  classNameWrapper?: string;
  elementFieldId?: string;
  elementId?: string;
  field: FieldInputProps<string>;
  form: {
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<unknown>>;
  };
  classNameLabel?: string;
  itemConfig: ScaleRatingConfig;
  placeholderWorstText?: string;
  placeholderBestText?: string;
}

export const Rating = (props: RatingProps) => {
  const {
    handleChange,
    field,
    elementFieldId,
    elementId,
    classNameWrapper,
    form: { setFieldValue },
    classNameError,
    itemConfig,
    ...rest
  } = props;

  useEffect(() => {
    setFieldValue(field.name, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commonSymbolStyles =
    'size-9 rounded-full border border-solid p-3 flex justify-center items-center text-sm';

  const emptySymbolStyles = cn(
    commonSymbolStyles,
    'border-slate-500 text-slate-500',
  );

  const fullSymbolStyles = cn(
    commonSymbolStyles,
    'border-ocean-green-500 text-white bg-ocean-green-500',
  );

  const emptySymbol = (value: number) => (
    <Box className={emptySymbolStyles}>{value}</Box>
  );

  const fullSymbol = (value: number) => (
    <Box className={fullSymbolStyles}>{value}</Box>
  );

  return (
    <div className={cn('flex max-w-fit flex-col gap-2', classNameWrapper)}>
      <RatingMantine
        {...rest}
        onBlur={field.onBlur}
        onChange={(value: number) => {
          if (elementFieldId && elementId)
            handleChange?.(elementId, elementFieldId, value.toString());
          setFieldValue(field.name, value.toString());
        }}
        classNames={{
          root: 'flex gap-5 max-w-full flex-wrap',
        }}
        count={itemConfig.ratingAmount}
        emptySymbol={emptySymbol}
        fullSymbol={fullSymbol}
      />
      <Group className='justify-between px-1'>
        <Box>
          <Text
            className={cn('text-xs  text-slate-500', {
              'text-slate-400': !itemConfig.lowestRatingText,
            })}
          >
            {itemConfig.lowestRatingText
              ? itemConfig.lowestRatingText
              : rest.placeholderWorstText}
          </Text>
        </Box>
        <Box>
          <Text
            className={cn('text-xs  text-slate-500', {
              'text-slate-400': !itemConfig.highestRatingText,
            })}
          >
            {itemConfig.highestRatingText
              ? itemConfig.highestRatingText
              : rest.placeholderBestText}
          </Text>
        </Box>
      </Group>
      <ErrorMessage
        name={field.name}
        render={(msg) => (
          <div className={cn('mt-1 text-xs text-red-600', classNameError)}>
            {msg}
          </div>
        )}
      />
    </div>
  );
};
