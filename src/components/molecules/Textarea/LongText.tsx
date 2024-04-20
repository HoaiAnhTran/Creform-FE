import { Field, FieldArray } from 'formik';

import { LongTextElement, TextConfig } from '@/types';
import { stringRequired } from '@/utils/schemas/validation';

import { Text } from '../Text';
import { TextInput } from '../TextInput';

import { Textarea } from '.';

interface LongTextProps {
  isDisabledValue?: boolean;
  handleChange?: (
    key: keyof TextConfig,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  item: LongTextElement;
}

export const LongText = (props: LongTextProps) => {
  const { isDisabledValue = false, handleChange, item } = props;

  const validate = async (value: string) =>
    stringRequired
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);

  return (
    <FieldArray
      name='longText'
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
            classNameWrapper='w-full'
            size='xl'
            validate={item.config.required ? validate : null}
            handleChange={handleChange}
            component={Textarea}
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
