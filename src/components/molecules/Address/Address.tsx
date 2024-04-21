import { Field } from 'formik';

import { Text } from '@/molecules/Text';
import { AddressElement } from '@/types';
import { stringRequired } from '@/utils/schemas/validation';

import { TextInput } from '../TextInput';

interface AddressProps {
  isReadOnly?: boolean;
  item: AddressElement;
  handleOnChangeAnswer: (
    elementId: string,
    elementFieldId: string,
    value: string,
  ) => void;
}

export const Address = (props: AddressProps) => {
  const { isReadOnly, item, handleOnChangeAnswer } = props;

  const validate = async (value: string) =>
    stringRequired
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);

  return (
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
        name={`${item.fields[0].id}.fieldValue`}
        classNameWrapper='w-full'
        validate={!isReadOnly && item.config.required ? validate : null}
        elementFieldId={item.fields[0].id}
        elementId={item.id}
        handleChange={handleOnChangeAnswer}
        classNameError='min-h-[0rem]'
        component={TextInput}
      />
      <Field
        validate={validate}
        name={`${item.fields[0].id}.subLabel`}
        size='xs'
        nameElementField={isReadOnly ? 'sublabel' : undefined}
        text={item.config.sublabels.street}
        component={Text}
      />
      <Field
        readOnly={isReadOnly}
        name={`${item.fields[1].id}.fieldValue`}
        classNameWrapper='w-full'
        validate={!isReadOnly && item.config.required ? validate : null}
        elementFieldId={item.fields[1].id}
        elementId={item.id}
        handleChange={handleOnChangeAnswer}
        classNameError='min-h-[0rem]'
        component={TextInput}
      />
      <Field
        validate={validate}
        name={`${item.fields[1].id}.subLabel`}
        size='xs'
        nameElementField={isReadOnly ? 'sublabel' : undefined}
        text={item.config.sublabels.ward}
        component={Text}
      />
      <Field
        readOnly={isReadOnly}
        name={`${item.fields[2].id}.fieldValue`}
        classNameWrapper='w-full'
        validate={!isReadOnly && item.config.required ? validate : null}
        elementFieldId={item.fields[2].id}
        elementId={item.id}
        handleChange={handleOnChangeAnswer}
        classNameError='min-h-[0rem]'
        component={TextInput}
      />
      <Field
        validate={validate}
        name={`${item.fields[2].id}.subLabel`}
        size='xs'
        nameElementField={isReadOnly ? 'sublabel' : undefined}
        text={item.config.sublabels.district}
        component={Text}
      />
      <Field
        readOnly={isReadOnly}
        name={`${item.fields[3].id}.fieldValue`}
        classNameWrapper='w-full'
        validate={!isReadOnly && item.config.required ? validate : null}
        elementFieldId={item.fields[3].id}
        elementId={item.id}
        handleChange={handleOnChangeAnswer}
        classNameError='min-h-[0rem]'
        component={TextInput}
      />
      <Field
        validate={validate}
        name={`${item.fields[3].id}.subLabel`}
        size='xs'
        nameElementField={isReadOnly ? 'sublabel' : undefined}
        text={item.config.sublabels.city}
        component={Text}
      />
    </div>
  );
};
