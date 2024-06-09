import { Stack } from '@mantine/core';
import { Field } from 'formik';
import * as yup from 'yup';

import { MESSAGES } from '@/constants';
import { useElementLayouts } from '@/contexts';
import { InputTableElement } from '@/types';
import { cn, validateFieldLabel } from '@/utils';

import { BaseElementProps } from '../FactoryElement';
import { InputTable } from '../InputTable';
import { Text } from '../Text';

export const BaseInputTableElement = (
  props: BaseElementProps<InputTableElement>,
) => {
  const { item, handleOnChangeAnswer } = props;
  const { isReadOnly } = useElementLayouts();

  const inputTableFieldValueSchema = yup
    .string()
    .test({
      message: MESSAGES.REQUIRE_AN_ANSWER_IN_EVERY_ROW,
      test: (value) => {
        let checkFlag: boolean = true;
        item.config.rows.map((row) => {
          if (!value?.includes(row)) {
            checkFlag = false;
          }
        });
        return checkFlag;
      },
    })
    .required(MESSAGES.REQUIRED_FIELD);

  const validateInputTableFieldValue = async (value: string) =>
    await inputTableFieldValueSchema
      .validate(value)
      .then(() => {})
      .catch((err) => err.errors[0]);

  return (
    <Stack className='w-full justify-between gap-2.5'>
      <Field
        name={`${item.id}.fieldLabel`}
        placeholder='Type a question'
        required={item.config.required}
        validate={isReadOnly ? validateFieldLabel : null}
        component={Text}
        text={item.config.fieldLabel}
        classNameWrapper='min-h-[50px] mt-4'
        className={cn(
          'flex min-h-[20px] items-start gap-1',
          {
            'text-slate-400': !item.config.fieldLabel,
          },
          { invisible: !item.config.fieldLabel && !isReadOnly },
        )}
      />
      <Field
        name={`${item.fields[0].id}.fieldValue`}
        validate={
          !isReadOnly && item.config.required
            ? validateInputTableFieldValue
            : null
        }
        handleChange={handleOnChangeAnswer}
        elementFieldId={item.fields[0].id}
        elementId={item.id}
        component={InputTable}
        value={item.fields[0].text}
        classNameWrapper='min-h-[175px] max-h-[250px]'
        item={item}
        readOnly={isReadOnly}
      />
    </Stack>
  );
};
