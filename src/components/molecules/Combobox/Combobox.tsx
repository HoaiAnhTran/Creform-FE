import { useEffect } from 'react';
import {
  Combobox as MantineCombobox,
  ComboboxProps as ComboboxMantineProps,
  Input,
  InputBase,
  ScrollArea,
  useCombobox,
} from '@mantine/core';
import {
  ErrorMessage,
  FieldInputProps,
  FieldMetaProps,
  FormikErrors,
} from 'formik';

import { DropdownElement } from '@/types';
import { cn } from '@/utils';

interface ComboboxProps extends Omit<ComboboxMantineProps, 'form'> {
  item: DropdownElement;
  handleChange: (elementId: string, fieldId: string, value: string) => void;
  classNameError?: string;
  classNameWrapper?: string;
  elementFieldId: string;
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

export const Combobox = ({
  item,
  handleChange,
  field,
  elementFieldId,
  classNameWrapper,
  form: { setFieldValue },
  classNameError,
  ...rest
}: ComboboxProps) => {
  useEffect(() => {
    setFieldValue(field.name, '');
  }, []);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = item.config.options.map((item) => (
    <MantineCombobox.Option
      value={item}
      key={item}
      className='hover:bg-malachite-100'
    >
      {item}
    </MantineCombobox.Option>
  ));

  return (
    <div className={cn('flex flex-col', classNameWrapper)}>
      <MantineCombobox
        {...field}
        {...rest}
        store={combobox}
        offset={0}
        onOptionSubmit={(value) => {
          handleChange(item.id, elementFieldId, value);
          setFieldValue(field.name, value);
          combobox.closeDropdown();
        }}
      >
        <MantineCombobox.Target>
          <InputBase
            component='button'
            type='button'
            rightSection={<MantineCombobox.Chevron />}
            rightSectionPointerEvents='none'
            onClick={() => combobox.toggleDropdown()}
          >
            {item.fields[0].text || (
              <Input.Placeholder>Please select</Input.Placeholder>
            )}
          </InputBase>
        </MantineCombobox.Target>

        <MantineCombobox.Dropdown hidden={rest.readOnly}>
          <MantineCombobox.Options>
            <ScrollArea.Autosize type='scroll' mah={100}>
              {options}
            </ScrollArea.Autosize>
          </MantineCombobox.Options>
        </MantineCombobox.Dropdown>
      </MantineCombobox>
      {rest.readOnly || (
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
