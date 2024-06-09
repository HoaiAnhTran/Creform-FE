import { Field, FieldArray } from 'formik';

import { ShortTextElement } from '@/types';
import {
  cn,
  validateFieldLabel,
  validateFieldValue,
  validateSubLabel,
} from '@/utils';

import { Text } from '../Text';

import { TextInput } from '.';

interface ShortTextProps {
  isReadOnly?: boolean;
  handleOnChangeAnswer: (
    elementId: string,
    elementFieldId: string,
    value: string,
  ) => void;
  item: ShortTextElement;
}

export const ShortText = (props: ShortTextProps) => {
  const { isReadOnly = false, item, handleOnChangeAnswer } = props;

  return (
    <FieldArray
      name='shortText'
      render={() => (
        <div className='flex flex-col gap-2'>
          <Field
            required={item.config.required}
            validate={isReadOnly ? validateFieldLabel : null}
            text={item.config.fieldLabel}
            placeholder='Type a question'
            name={`${item.id}.fieldLabel`}
            component={Text}
            classNameWrapper='min-h-[45px] mt-4'
            className={cn(
              'flex min-h-[20px] items-start gap-1',
              {
                'text-slate-400': !item.config.fieldLabel,
              },
              { invisible: !item.config.fieldLabel && !isReadOnly },
            )}
          />
          <Field
            readOnly={isReadOnly}
            name={`${item.id}.fieldValue`}
            className='min-h-[60px] w-1/2'
            validate={
              !isReadOnly && item.config.required ? validateFieldValue : null
            }
            elementFieldId={item.fields[0].id}
            elementId={item.id}
            handleChange={handleOnChangeAnswer}
            component={TextInput}
          />
          <Field
            validate={isReadOnly ? validateSubLabel : null}
            name={`${item.id}.sublabel`}
            size='xs'
            placeholder={item.config.placeholder}
            text={item.config.sublabel}
            component={Text}
            classNameWrapper='min-h-[42px]'
            className={cn(
              'flex min-h-[20px] items-start gap-1 text-[13px] text-slate-600',
              {
                'text-slate-400': !item.config.sublabel,
              },
              { invisible: !item.config.sublabel && !isReadOnly },
            )}
          />
        </div>
      )}
    />
  );
};
