import { useEffect, useState } from 'react';
import {
  Checkbox,
  Radio,
  ScrollArea,
  Table as MantineTable,
  TableProps as MantineTableProps,
} from '@mantine/core';
import {
  ErrorMessage,
  FieldInputProps,
  FieldMetaProps,
  FormikErrors,
} from 'formik';

import { InputTableElement } from '@/types';
import { isEmpty } from '@/utils';
import { cn } from '@/utils/cn';

import { INPUT_TABLE_TYPE } from '../InputTablePropertiesConfig';

interface InputTableProps extends Omit<MantineTableProps, 'form'> {
  handleChange?: (
    elementId: string,
    elementFieldId: string,
    value: string,
  ) => void;
  classNameError?: string;
  classNameWrapper?: string;
  elementFieldId?: string;
  elementId?: string;
  field: FieldInputProps<string>;
  form: {
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<unknown>>;
  };
  meta: FieldMetaProps<string>;
  item: InputTableElement;
  readOnly: boolean;
}

export const InputTable = (props: InputTableProps) => {
  const {
    handleChange,
    field,
    elementFieldId,
    elementId,
    classNameWrapper,
    form: { setFieldValue },
    classNameError,
    item,
    readOnly,
  } = props;

  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string | string[];
  }>({});

  useEffect(() => {
    setFieldValue(field.name, null);

    if (item.config.inputType === INPUT_TABLE_TYPE.RADIO) {
      item.config.rows.map((row) => {
        setSelectedValues((prev) => ({ ...prev, [row]: '' }));
      });
    } else {
      item.config.rows.map((row) => {
        setSelectedValues((prev) => ({ ...prev, [row]: [] }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let fieldValue: string = '';

    for (const [key, value] of Object.entries(selectedValues)) {
      if (!isEmpty(value)) {
        if (item.config.inputType === INPUT_TABLE_TYPE.RADIO) {
          fieldValue += `${key}: ${value}\n`;
        } else {
          fieldValue += `${key}: ${(value as string[]).join(', ')}\n`;
        }
      }
    }
    if (fieldValue.endsWith('\n')) {
      fieldValue = fieldValue.slice(0, -1);
    }

    if (elementFieldId && elementId) {
      handleChange?.(elementId, elementFieldId, fieldValue);
      setFieldValue(field.name, fieldValue);
    }
    field.onChange(fieldValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues]);

  const handleChangeRadioValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue =
      event.currentTarget.value.split('-')[
        event.currentTarget.value.split('-').length - 1
      ];

    setSelectedValues((prev) => ({
      ...prev,
      [event.currentTarget.name]: newValue,
    }));
  };

  const handleChangeCheckboxValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue =
      event.currentTarget.value.split('-')[
        event.currentTarget.value.split('-').length - 1
      ];

    if (
      event.currentTarget.checked &&
      !selectedValues[event.currentTarget.name].includes(newValue)
    ) {
      setSelectedValues((prev) => ({
        ...prev,
        [event.currentTarget.name]: [
          ...prev[event.currentTarget.name],
          newValue,
        ],
      }));
    } else if (!event.currentTarget.checked) {
      setSelectedValues((prev) => ({
        ...prev,
        [event.currentTarget.name]: (
          prev[event.currentTarget.name] as string[]
        ).filter((val) => val !== newValue),
      }));
    }
  };

  return (
    <div className={cn('flex w-full flex-col', classNameWrapper)}>
      <ScrollArea
        mih={100}
        mah={190}
        scrollbarSize={8}
        type='auto'
        className='w-full'
        offsetScrollbars
        classNames={{
          thumb: 'bg-gray-300 hover:!bg-gray-400',
        }}
      >
        <MantineTable withColumnBorders stickyHeader className='!rounded-md'>
          <MantineTable.Thead className='z-30'>
            <MantineTable.Tr className='relative'>
              <MantineTable.Th className='left-0 z-20 w-40 bg-white first:sticky'></MantineTable.Th>
              {item.config.columns.map((column) => (
                <MantineTable.Th className='bg-slate-200 text-center text-[13px] font-medium'>
                  {column}
                </MantineTable.Th>
              ))}
            </MantineTable.Tr>
          </MantineTable.Thead>

          <MantineTable.Tbody>
            {item.config.rows.map((row, index) => (
              <MantineTable.Tr key={index} className='relative'>
                <MantineTable.Td className='left-0 z-20 bg-slate-200 text-[13px] font-medium first:sticky'>
                  {row}
                </MantineTable.Td>

                {item.config.columns.map((column) => (
                  <MantineTable.Td>
                    {item.config.inputType === INPUT_TABLE_TYPE.RADIO ? (
                      <Radio
                        name={row}
                        value={`${row}-${column}`}
                        onChange={handleChangeRadioValue}
                        size='xs'
                        disabled={readOnly}
                        classNames={{
                          radio: 'cursor-pointer',
                          body: 'justify-center',
                        }}
                      />
                    ) : (
                      <Checkbox
                        name={row}
                        value={`${row}-${column}`}
                        onChange={handleChangeCheckboxValue}
                        size='xs'
                        disabled={readOnly}
                        classNames={{
                          input: 'cursor-pointer',
                          body: 'justify-center',
                        }}
                      />
                    )}
                  </MantineTable.Td>
                ))}
              </MantineTable.Tr>
            ))}
          </MantineTable.Tbody>
        </MantineTable>
      </ScrollArea>
      <ErrorMessage
        name={field.name}
        render={(msg) => (
          <div className={cn('mt-2 text-xs text-red-600', classNameError)}>
            {msg}
          </div>
        )}
      />
    </div>
  );
};
