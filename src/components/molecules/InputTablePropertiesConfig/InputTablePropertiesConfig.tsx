import { ChangeEvent } from 'react';
import {
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';

import { BasePropertiesProps } from '@/organisms/PropertiesRightbar';
import { InputTableElement } from '@/types';

export enum INPUT_TABLE_TYPE {
  RADIO = 'Radio Button',
  CHECKBOX = 'Checkbox',
}

export const InputTablePropertiesConfig = (
  props: BasePropertiesProps<InputTableElement>,
) => {
  const { edittingItem, updateItem, handleConfig } = props;

  const handleChangeFieldLabel = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleConfig({
      ...edittingItem?.config,
      fieldLabel: event.currentTarget.value,
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem.config,
        fieldLabel: event.currentTarget.value,
      },
    });
  };

  const handleChangeRequired = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleConfig({
      ...edittingItem?.config,
      required: event.currentTarget.checked,
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem.config,
        required: event.currentTarget.checked,
      },
    });
  };

  const handleChangeInputType = (value: string) => {
    handleConfig({
      ...edittingItem?.config,
      inputType: value,
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem.config,
        inputType: value,
      },
    });
  };

  const handleChangeRows = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleConfig({
      ...edittingItem?.config,
      rows: event.currentTarget.value.split('\n'),
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem?.config,
        rows: event.currentTarget.value.split('\n'),
      },
    });
  };

  const handleChangeColumns = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleConfig({
      ...edittingItem?.config,
      columns: event.currentTarget.value.split('\n'),
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem?.config,
        columns: event.currentTarget.value.split('\n'),
      },
    });
  };

  const handleOnBlurRows = () => {
    handleConfig({
      ...edittingItem?.config,
      rows: edittingItem?.config.rows.filter((row) => !!row),
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem?.config,
        rows: edittingItem?.config.rows.filter((row) => !!row),
      },
    });
  };

  const handleOnBlurColumns = () => {
    handleConfig({
      ...edittingItem?.config,
      columns: edittingItem?.config.columns.filter((column) => !!column),
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem?.config,
        columns: edittingItem?.config.columns.filter((column) => !!column),
      },
    });
  };

  return (
    <Stack className='justify-between gap-3'>
      <Stack className='justify-between gap-2 p-3'>
        <Text className='text-base font-semibold text-white'>Field Label</Text>
        <TextInput
          autoComplete='off'
          classNames={{
            input:
              'bg-slate-100 text-black border-none outline-none hover:bg-slate-200',
          }}
          value={edittingItem.config.fieldLabel}
          onChange={handleChangeFieldLabel}
        />
      </Stack>

      <Stack className='justify-between gap-2 p-3'>
        <Text className='text-base font-semibold text-white'>Required</Text>
        <Switch
          size='lg'
          onLabel='ON'
          offLabel='OFF'
          checked={edittingItem.config.required}
          onChange={handleChangeRequired}
          classNames={{ thumb: 'cursor-pointer', track: 'cursor-pointer' }}
        />
      </Stack>

      <Stack className='justify-between gap-2 p-3'>
        <Text className='text-base font-semibold text-white'>Input Type</Text>
        <Select
          placeholder='Choose an input type'
          data={[INPUT_TABLE_TYPE.RADIO, INPUT_TABLE_TYPE.CHECKBOX]}
          value={edittingItem.config.inputType}
          onChange={(value) => {
            if (!value) return;
            handleChangeInputType(value);
          }}
          checkIconPosition='right'
          comboboxProps={{
            position: 'bottom',
            middlewares: { flip: false, shift: false },
            offset: 0,
            shadow: 'md',
          }}
          classNames={{
            option: 'hover:bg-slate-100 text-sm',
            input: 'text-sm',
          }}
        />
      </Stack>

      <Stack className='justify-between gap-2 p-3'>
        <Text className='text-base font-semibold text-white'>Rows</Text>
        <Textarea
          autosize
          minRows={2}
          maxRows={5}
          resize='vertical'
          value={edittingItem.config.rows.join('\n')}
          onChange={handleChangeRows}
          onBlur={handleOnBlurRows}
          classNames={{
            input:
              'bg-slate-100 text-black border-none outline-none hover:bg-slate-200',
          }}
        />
        <Text className='text-justify text-[13px] text-slate-50'>
          Add more rows by enter each row name on a new line.
        </Text>
      </Stack>

      <Stack className='justify-between gap-2 p-3'>
        <Text className='text-base font-semibold text-white'>Columns</Text>
        <Textarea
          autosize
          minRows={2}
          maxRows={5}
          resize='vertical'
          value={edittingItem.config.columns.join('\n')}
          onChange={handleChangeColumns}
          onBlur={handleOnBlurColumns}
          classNames={{
            input:
              'bg-slate-100 text-black border-none outline-none hover:bg-slate-200',
          }}
        />
        <Text className='text-justify text-[13px] text-slate-50'>
          Add more columns by enter each column name on a new line.
        </Text>
      </Stack>
    </Stack>
  );
};
