import { Field, FieldArray, useField } from 'formik';

import { NumberPhoneElement } from '@/types';
import { isValidPhoneNumber, stringRequired } from '@/utils/schemas/validation';

import { PhoneNumberInput } from '../PhoneNumberInput';
import { Text } from '../Text';

interface NumberPhoneProps {
  isReadOnly?: boolean;
  item: NumberPhoneElement;
  handleOnChangeAnswer: (
    elementId: string,
    elementFieldId: string,
    value: string,
  ) => void;
}

export const NumberPhone = (props: NumberPhoneProps) => {
  const { isReadOnly = false, item, handleOnChangeAnswer } = props;

  const validate = async (value: string) =>
    stringRequired
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);

  const phoneNumberValidate = async (value: string) =>
    isValidPhoneNumber
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);
  const [field] = useField(`${item.id}.fieldValue`);

  return (
    <FieldArray
      name='numberPhone'
      render={() => (
        <div className='flex flex-col gap-2'>
          <Field
            required={item.config.required}
            validate={validate}
            text={item.config.fieldLabel}
            name={`${item.id}.fieldLabel`}
            component={Text}
          />
          <Field
            readOnly={isReadOnly}
            name={`${item.id}.fieldValue`}
            classNameWrapper='w-1/2'
            allowLeadingZeros={true}
            size='xs'
            elementFieldId={item.fields[0].id}
            elementId={item.id}
            validate={
              !isReadOnly && item.config.required
                ? phoneNumberValidate
                : field.value === ''
                  ? null
                  : phoneNumberValidate
            }
            handleChange={handleOnChangeAnswer}
            component={PhoneNumberInput}
          />
          <Field
            validate={validate}
            name={`${item.id}.subLabel`}
            size='xs'
            text={item.config.sublabel}
            component={Text}
          />
        </div>
      )}
    />
  );
};
