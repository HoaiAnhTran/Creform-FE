import { Field, FieldArray } from 'formik';

import { LongTextElement } from '@/types';
import { stringRequired } from '@/utils/schemas/validation';

import { Text } from '../Text';

import { Textarea } from '.';

interface LongTextProps {
  isReadOnly?: boolean;
  item: LongTextElement;
  handleOnChangeAnswer: (
    fieldId: string,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LongText = (props: LongTextProps) => {
  const { isReadOnly = false, item, handleOnChangeAnswer } = props;

  const validate = async (value: string) =>
    stringRequired
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);

  return (
    <FieldArray
      name='longText'
      render={() => (
        <div className='flex flex-col gap-2'>
          <Field
            required={item.config.required}
            validate={validate}
            text={item.config.fieldLabel}
            name={`${item.id}.fieldLabel`}
            nameElementField='fieldLabel'
            component={Text}
          />
          <Field
            readOnly={isReadOnly}
            name={`${item.id}.fieldValue`}
            classNameWrapper='w-full'
            size='xl'
            validate={!isReadOnly && item.config.required ? validate : null}
            nameElementField={item.fields[0].id}
            handleChange={handleOnChangeAnswer}
            component={Textarea}
          />
          <Field
            validate={validate}
            name={`${item.id}.subLabel`}
            size='xs'
            placeholder={item.config.placeholder}
            nameElementField={isReadOnly ? 'sublabel' : undefined}
            text={item.config.sublabel}
            component={Text}
          />
        </div>
      )}
    />
  );
};
