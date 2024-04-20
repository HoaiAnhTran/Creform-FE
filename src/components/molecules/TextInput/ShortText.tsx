import { Field, FieldArray } from 'formik';

import { stringRequired } from '@/utils/schemas/validation';

import { TextInput } from '.';

//TODO: add id to identify between shortText

interface ShortTextProps {
  label?: string;
  sublabel?: string;
  placeholder?: string;
  width?: string;
}

export const ShortText = (props: ShortTextProps) => {
  const {
    label = 'Type a question',
    sublabel,
    placeholder = 'Type a sublabel',
    width = '50%',
  } = props;

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
          //TODO : add id to name to identify this field
          <Field
            validate={validate}
            variant='unstyled'
            defaultValue={label}
            size='lg'
            classNameError='min-h-[0rem]'
            name='shortText-label'
            component={TextInput}
          />
          <Field name='value' style={{ width }} classNameError='min-h-[0rem]' />
          <Field
            classNameError='min-h-[0rem]'
            validate={validate}
            name='shortText-sublabel'
            size='xs'
            variant='unstyled'
            placeholder={placeholder}
            defaultValue={sublabel}
            component={TextInput}
          />
        </div>
      )}
    />
  );
};
