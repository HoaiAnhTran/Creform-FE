import { useState } from 'react';
import { NumberInput, Stack, Switch, Text, TextInput } from '@mantine/core';

import { BasePropertiesProps } from '@/organisms/PropertiesRightbar';
import { ScaleRatingConfig, ScaleRatingElement } from '@/types';

export const ScaleRatingProptertiesConfig = (
  props: BasePropertiesProps<ScaleRatingElement>,
) => {
  const { edittingItem, updateItem, handleConfig } = props;
  const [required, setRequired] = useState<boolean>(
    edittingItem.config.required,
  );

  const handleChange =
    (key: keyof ScaleRatingConfig) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleConfig({
        ...edittingItem?.config,
        [key]: event.currentTarget.value,
      });
      updateItem({
        ...edittingItem,
        config: {
          ...edittingItem.config,
          [key]: event.currentTarget.value,
        },
      });
    };

  const handleChangeSwitch = (key: keyof ScaleRatingConfig) => () => {
    const newStatus = !required;
    setRequired(newStatus);
    handleConfig({
      ...edittingItem?.config,
      [key]: newStatus,
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem.config,
        [key]: newStatus,
      },
    });
  };

  const handleChangeRatingAmount = (value: string | number) => {
    handleConfig({
      ...edittingItem?.config,
      ratingAmount: Number(value),
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem.config,
        ratingAmount: Number(value),
      },
    });
  };

  return (
    <>
      <Stack className='p-3'>
        <Text className='font-bold text-white'>Field label</Text>
        <TextInput
          autoComplete='off'
          className='rounded-md border border-solid border-slate-600 bg-slate-100'
          value={edittingItem?.config.fieldLabel}
          onChange={handleChange('fieldLabel')}
        />
      </Stack>
      <Stack className='w-20 p-3'>
        <Text className='font-bold text-white'>Required</Text>
        <Switch
          size='xl'
          onLabel='ON'
          offLabel='OFF'
          checked={required}
          onChange={handleChangeSwitch('required')}
        />
      </Stack>
      <Stack className='p-3'>
        <Text className='font-bold text-white'>Lowest rating text</Text>
        <TextInput
          autoComplete='off'
          className='rounded-md border border-solid border-slate-600 bg-slate-100'
          value={edittingItem?.config.lowestRatingText}
          onChange={handleChange('lowestRatingText')}
        />
      </Stack>
      <Stack className='p-3'>
        <Text className='font-bold text-white'>Highest rating text</Text>
        <TextInput
          autoComplete='off'
          className='rounded-md border border-solid border-slate-600 bg-slate-100'
          value={edittingItem?.config.highestRatingText}
          onChange={handleChange('highestRatingText')}
        />
      </Stack>
      <Stack className='p-3'>
        <Text className='font-bold text-white'>Rating amount</Text>
        <NumberInput
          autoComplete='off'
          className='rounded-md border border-solid border-slate-600 bg-slate-100'
          value={edittingItem?.config.ratingAmount}
          onChange={handleChangeRatingAmount}
          min={2}
          max={10}
          clampBehavior='strict'
          allowDecimal={false}
          allowNegative={false}
        />
      </Stack>
    </>
  );
};
