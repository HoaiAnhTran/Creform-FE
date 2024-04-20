import { useEffect } from 'react';
import {
  Textarea as TextareaMantine,
  TextareaProps as TextareaMantineProps,
} from '@mantine/core';
import { FieldInputProps, FieldMetaProps, FormikErrors } from 'formik';

import { cn } from '@/utils/cn';

interface TextareaProps extends Omit<TextareaMantineProps, 'form'> {
  classNameError?: string;
  classNameInput?: string;
  field: FieldInputProps<string>;
  form: {
    touched: Record<string, boolean>;
    errors: Record<string, string>;
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<unknown>>;
  };
  meta: FieldMetaProps<string>;
}

export const Textarea = (props: TextareaProps) => {
  const {
    field,
    form: { errors, touched, setFieldValue },
    classNameError,
    resize = 'vertical',
    ...rest
  } = props;

  useEffect(() => {
    if (rest.defaultValue) {
      setFieldValue(field.name, rest.defaultValue);
      return;
    }
    setFieldValue(field.name, '');
  }, [field.name, rest.defaultValue, setFieldValue]);

  return (
    <div className='flex flex-col'>
      <TextareaMantine {...field} resize={resize} {...rest} />
      <div
        className={cn('mt-1 min-h-[2rem] text-xs text-red-600', classNameError)}
      >
        {touched[field.name] && errors[field.name]}
      </div>
    </div>
  );
};
