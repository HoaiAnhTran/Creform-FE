import {
  TextInput as TextInputMantine,
  TextInputProps as TextInputMantineProps,
} from '@mantine/core';
import { FieldInputProps, FieldMetaProps } from 'formik';

import { cn } from '@/utils/cn';

interface TextInputProps extends Omit<TextInputMantineProps, 'form'> {
  classNameError?: string;
  classNameWrapper?: string;
  field: FieldInputProps<string>;
  type: string;
  form: {
    touched: Record<string, boolean>;
    errors: Record<string, string>;
  };
  meta: FieldMetaProps<string>;
}

export const TextInput = (props: TextInputProps) => {
  const {
    field,
    classNameWrapper,
    form: { errors, touched },
    classNameError,
    ...rest
  } = props;

  return (
    <div className={cn('flex flex-col', classNameWrapper)}>
      <TextInputMantine {...field} {...rest} />
      <div
        className={cn('mt-1 min-h-[2rem] text-xs text-red-600', classNameError)}
      >
        {touched[field.name] && errors[field.name]}
      </div>
    </div>
  );
};
