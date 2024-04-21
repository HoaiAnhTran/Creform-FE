import { useEffect } from 'react';
import {
  TextInput as TextInputMantine,
  TextInputProps as TextInputMantineProps,
} from '@mantine/core';
import {
  ErrorMessage,
  FieldInputProps,
  FieldMetaProps,
  FormikErrors,
} from 'formik';

import { cn } from '@/utils/cn';

interface TextInputProps extends Omit<TextInputMantineProps, 'form'> {
  handleChange?: (
    key: string,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  classNameError?: string;
  classNameWrapper?: string;
  nameElementField?: string;
  field: FieldInputProps<string>;
  form: {
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<unknown>>;
  };
  meta: FieldMetaProps<string>;
  classNameLabel?: string;
  valueConfig: string;
}

export const TextInput = (props: TextInputProps) => {
  const {
    handleChange,
    field,
    nameElementField,
    classNameWrapper,
    form: { setFieldValue },
    classNameError,
    classNameLabel,
    ...rest
  } = props;

  useEffect(() => {
    setFieldValue(field.name, '');
  }, []);

  return (
    <div className={cn('flex w-full flex-col', classNameWrapper)}>
      <TextInputMantine
        {...field}
        {...rest}
        onChange={(e) => {
          if (nameElementField) handleChange?.(nameElementField)(e);
          field.onChange(e);
        }}
        classNames={{
          label: cn('mb-2', classNameLabel),
        }}
      />
      {rest.disabled || (
        <ErrorMessage
          name={field.name}
          render={(msg) => (
            <div className={cn('mt-1 text-xs text-red-600', classNameError)}>
              {msg}
            </div>
          )}
        />
      )}
    </div>
  );
};
