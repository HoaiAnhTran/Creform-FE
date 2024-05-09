import { useEffect } from 'react';
import {
  Box,
  Rating as RatingMantine,
  RatingProps as RatingMantineProps,
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
    <Box className={emptySymbolStyles}>
      {itemConfig.lowestRatingValue === 0 ? value - 1 : value}
    </Box>
  );

  const fullSymbol = (value: number) => (
    <Box className={fullSymbolStyles}>
      {itemConfig.lowestRatingValue === 0 ? value - 1 : value}
    </Box>
  );

  return (
    <div className={cn('flex w-full flex-col gap-2', classNameWrapper)}>
      <RatingMantine
        {...rest}
        onBlur={field.onBlur}
        onChange={(value: number) => {
          if (elementFieldId && elementId)
            handleChange?.(
              elementId,
              elementFieldId,
              itemConfig.lowestRatingValue === 0
                ? (value - 1).toString()
                : value.toString(),
            );
          setFieldValue(
            field.name,
            itemConfig.lowestRatingValue === 0
              ? (value - 1).toString()
              : value.toString(),
          );
        }}
        classNames={{
          root: `flex gap-1.5 w-max flex-wrap`,
        }}
        count={itemConfig.highestRatingValue - itemConfig.lowestRatingValue + 1}
        emptySymbol={emptySymbol}
        fullSymbol={fullSymbol}
        highlightSelectedOnly
      />
      <ErrorMessage
        name={field.name}
        render={(msg) => (
          <div className={cn('mb-1 text-xs text-red-600', classNameError)}>
            {msg}
          </div>
        )}
      />
    </div>
  );
};
