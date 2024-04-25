import { Field, FieldArray } from 'formik';

import { TimeInputElement } from '@/types';
import { validateFieldValue, validateLabel } from '@/utils';

import { Text } from '../Text';

import { TimeInput as CustomTimeInput } from './CustomTimeInput';

interface TimeInputProps {
  isReadOnly?: boolean;
  handleOnChangeAnswer: (
    elementId: string,
    fieldId: string,
    value: string,
  ) => void;
  item: TimeInputElement;
}

export const TimeInput = (props: TimeInputProps) => {
  const { isReadOnly = false, item, handleOnChangeAnswer } = props;

  return (
    <FieldArray
      name='timeInput'
      render={() => (
        <div className='flex flex-col gap-2'>
          <Field
            required={item.config.required}
            validate={validateLabel}
            text={item.config.fieldLabel}
            name={`${item.id}.fieldLabel`}
            nameElementField='fieldLabel'
            component={Text}
          />
          <Field
            readOnly={isReadOnly}
            name={`${item.id}.fieldValue`}
            className='w-1/2'
            validate={
              !isReadOnly && item.config.required ? validateFieldValue : null
            }
            elementFieldId={item.fields[0].id}
            elementId={item.id}
            handleChange={handleOnChangeAnswer}
            component={CustomTimeInput}
          />
        </div>
      )}
    />
  );
};
