import { Field, FieldArray } from 'formik';

import { ShortTextElement } from '@/types';
import { stringRequired } from '@/utils/schemas/validation';

import { Text } from '../Text';

import { TextInput } from '.';

interface ShortTextProps {
  isDisabledValue?: boolean;
  handleOnChangeAnswer: (
    fieldId: string,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  item: ShortTextElement;
}

export const ShortText = (props: ShortTextProps) => {
  const { isDisabledValue = false, item, handleOnChangeAnswer } = props;

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
            validate={
              !isDisabledValue && item.config.required ? validate : null
            }
            nameElementField={item.fields[0].id}
            handleChange={handleOnChangeAnswer}
            component={TextInput}
          />
          <Field
            validate={validate}
            name={`${item.id}.subLabel`}
            size='xs'
            placeholder={item.config.placeholder}
            nameElementField={isDisabledValue ? 'sublabel' : undefined}
            text={item.config.sublabel}
            component={Text}
          />
        </div>
      )}
    />
  );
};
