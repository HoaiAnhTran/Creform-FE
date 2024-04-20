import { Field, FieldArray } from 'formik';

import { stringRequired } from '@/utils/schemas/validation';

import { TextInput } from '../TextInput';

import { Textarea } from '.';

//TODO: add id to identify between longText
interface LongTextProps {
  label?: string;
  width?: string;
}

export const LongText = (props: LongTextProps) => {
  const { label = 'Type a question', width = '100%' } = props;

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
          //TODO : add id to name to identify this field
          <Field
            validate={validate}
            variant='unstyled'
            defaultValue={label}
            size='lg'
            classNameError='min-h-[0rem]'
            name='longText_value'
            component={TextInput}
          />
          <Field
            name='longText_label'
            style={{ width }}
            classNameError='min-h-[0rem]'
            component={Textarea}
          />
        </div>
      )}
    />
  );
};
