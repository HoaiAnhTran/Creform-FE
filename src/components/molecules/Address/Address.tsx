import { Field } from 'formik';

import { Text } from '@/molecules/Text';
import { AddressElement } from '@/types';
import {
  cn,
  validateFieldLabel,
  validateFieldValue,
  validateSubLabel,
} from '@/utils';

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

  return (
    <div className='flex flex-col gap-2'>
      <Field
        required={item.config.required}
        validate={isReadOnly ? validateFieldLabel : null}
        placeholder='Type your question'
        text={item.config.fieldLabel}
        name={`${item.id}.fieldLabel`}
        nameElementField='fieldLabel'
        classNameWrapper='min-h-[40px]'
        component={Text}
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
        name={`${item.fields[0].id}.fieldValue`}
        classNameWrapper='w-full'
        validate={
          !isReadOnly && item.config.required ? validateFieldValue : null
        }
        elementFieldId={item.fields[0].id}
        elementId={item.id}
        handleChange={handleOnChangeAnswer}
        classNameError='min-h-[0rem]'
        component={TextInput}
      />
      <Field
        validate={isReadOnly ? validateSubLabel : null}
        name={`${item.fields[0].id}.subLabel`}
        size='xs'
        nameElementField={isReadOnly ? 'sublabel' : undefined}
        text={item.config.sublabels.street}
        component={Text}
        placeholder='Type a sublabel'
        className={cn(
          'flex min-h-[20px] items-start gap-1 text-[13px] text-slate-600',
          {
            'text-slate-400': !item.config.sublabels.street,
          },
          { invisible: !item.config.sublabels.street && !isReadOnly },
        )}
      />

      <Field
        readOnly={isReadOnly}
        name={`${item.fields[1].id}.fieldValue`}
        classNameWrapper='w-full'
        validate={
          !isReadOnly && item.config.required ? validateFieldValue : null
        }
        elementFieldId={item.fields[1].id}
        elementId={item.id}
        handleChange={handleOnChangeAnswer}
        classNameError='min-h-[0rem]'
        component={TextInput}
      />
      <Field
        validate={isReadOnly ? validateSubLabel : null}
        name={`${item.fields[1].id}.subLabel`}
        placeholder='Type a sublabel'
        size='xs'
        nameElementField={isReadOnly ? 'sublabel' : undefined}
        text={item.config.sublabels.ward}
        component={Text}
        className={cn(
          'flex min-h-[20px] items-start gap-1 text-[13px] text-slate-600',
          {
            'text-slate-400': !item.config.sublabels.ward,
          },
          { invisible: !item.config.sublabels.ward && !isReadOnly },
        )}
      />

      <Field
        readOnly={isReadOnly}
        name={`${item.fields[2].id}.fieldValue`}
        classNameWrapper='w-full'
        validate={
          !isReadOnly && item.config.required ? validateFieldValue : null
        }
        elementFieldId={item.fields[2].id}
        elementId={item.id}
        handleChange={handleOnChangeAnswer}
        classNameError='min-h-[0rem]'
        component={TextInput}
      />
      <Field
        validate={isReadOnly ? validateSubLabel : null}
        name={`${item.fields[2].id}.subLabel`}
        placeholder='Type a sublabel'
        size='xs'
        nameElementField={isReadOnly ? 'sublabel' : undefined}
        text={item.config.sublabels.district}
        component={Text}
        className={cn(
          'flex min-h-[20px] items-start gap-1 text-[13px] text-slate-600',
          {
            'text-slate-400': !item.config.sublabels.district,
          },
          { invisible: !item.config.sublabels.district && !isReadOnly },
        )}
      />

      <Field
        readOnly={isReadOnly}
        name={`${item.fields[3].id}.fieldValue`}
        classNameWrapper='w-full'
        validate={
          !isReadOnly && item.config.required ? validateFieldValue : null
        }
        elementFieldId={item.fields[3].id}
        elementId={item.id}
        handleChange={handleOnChangeAnswer}
        classNameError='min-h-[0rem]'
        component={TextInput}
      />
      <Field
        validate={isReadOnly ? validateSubLabel : null}
        name={`${item.fields[3].id}.subLabel`}
        size='xs'
        nameElementField={isReadOnly ? 'sublabel' : undefined}
        text={item.config.sublabels.city}
        component={Text}
        placeholder='Type a sublabel'
        className={cn(
          'flex min-h-[20px] items-start gap-1 text-[13px] text-slate-600',
          {
            'text-slate-400': !item.config.sublabels.city,
          },
          { invisible: !item.config.sublabels.city && !isReadOnly },
        )}
      />
    </div>
  );
};
