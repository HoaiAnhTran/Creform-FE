import { Field, FieldArray } from 'formik';

import { ShortTextElement, TextConfig } from '@/types';
import { stringRequired } from '@/utils/schemas/validation';

import { Text } from '../Text';

import { TextInput } from '.';

interface ShortTextProps {
  isDisabledValue?: boolean;
  handleChange?: (
    key: keyof TextConfig,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  item: ShortTextElement;
}

export const ShortText = (props: ShortTextProps) => {
  const { isDisabledValue = false, handleChange, item } = props;

  const validate = async (value: string) =>
    stringRequired
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);

  return (
    <FieldArray
      name='shortText'
      render={() => (
        <div className='flex flex-col'>
          <Field
            required={item.config.required}
            validate={validate}
            text={item.config.fieldLabel}
            name={`${item.id}.fieldLabel`}
            nameElementField='fieldLabel'
            component={Text}
          />
          <Field
            disabled={isDisabledValue}
            name={`${item.id}.fieldValue`}
            className='w-1/2'
            validate={item.config.required ? validate : null}
            handleChange={handleChange}
            component={TextInput}
          />
          <Field
            validate={validate}
            name={`${item.id}.subLabel`}
            size='xs'
            variant='unstyled'
            placeholder={item.config.placeholder}
            nameElementField='sublabel'
            valueConfig={item.config.sublabel}
            handleChange={handleChange}
            component={TextInput}
          />
        </div>
      )}
    />
  );
};
