import { useState } from 'react';
import {
  Button,
  ColorPicker,
  Group,
  Radio,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';

import {
  BUTTON_ALIGNMENT_OPTIONS,
  BUTTON_COLORS,
  DEFAULT_BUTTON_COLOR,
} from '@/constants';
import { BasePropertiesProps } from '@/organisms/PropertiesRightbar';
import { SubmitConfig, SubmitElement } from '@/types';
import { capitalize, cn } from '@/utils';

export const SubmitPropertiesConfig = (
  props: BasePropertiesProps<SubmitElement>,
) => {
  const { edittingItem, updateItem, handleConfig } = props;
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleTextChange =
    (key: keyof SubmitConfig) =>
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

  const handleChange = (key: keyof SubmitConfig) => (value: string) => {
    handleConfig({
      ...edittingItem?.config,
      [key]: value,
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem.config,
        [key]: value,
      },
    });
  };

  return (
    <>
      <Stack className='p-3'>
        <Text className='font-semibold text-white'>Button Text</Text>
        <TextInput
          autoComplete='off'
          className='rounded-md border border-solid border-slate-600 bg-slate-100'
          value={edittingItem.config.buttonText}
          onChange={handleTextChange('buttonText')}
        />
      </Stack>

      <Stack className='p-3'>
        <Text className='font-semibold text-white'>Button Alignment</Text>
        <Radio.Group
          value={edittingItem.config.buttonAlignment}
          onChange={handleChange('buttonAlignment')}
        >
          <Group className='gap-0'>
            {BUTTON_ALIGNMENT_OPTIONS.map((alignment) => (
              <Radio
                key={alignment}
                value={alignment}
                label={capitalize(alignment)}
                classNames={{
                  inner: 'hidden',
                  label: cn(
                    'bg-slate-700 px-4 py-3 cursor-pointer text-base text-white',
                    {
                      'bg-ocean-green-400':
                        edittingItem.config.buttonAlignment === alignment,
                    },
                  ),
                }}
              />
            ))}
          </Group>
        </Radio.Group>
      </Stack>

      <Stack className='p-3'>
        <Text className='font-semibold text-white'>Button Style</Text>
        <Button
          className={cn('h-[40px]', {
            'bg-slate-200 font-semibold uppercase text-gray-800 transition-all duration-75 ease-linear hover:bg-slate-200/85 hover:text-gray-800':
              edittingItem.config.buttonColor === DEFAULT_BUTTON_COLOR,
          })}
          style={{
            backgroundColor:
              edittingItem.config.buttonColor !== DEFAULT_BUTTON_COLOR
                ? edittingItem.config.buttonColor
                : undefined,
          }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          {edittingItem.config.buttonColor === DEFAULT_BUTTON_COLOR
            ? 'CHOOSE STYLE'
            : 'Change Button Style'}
        </Button>
        {showColorPicker && (
          <ColorPicker
            value={edittingItem.config.buttonColor}
            onChange={handleChange('buttonColor')}
            swatchesPerRow={5}
            format='hex'
            withPicker={false}
            className='w-full rounded bg-white px-3 py-2'
            swatches={Object.values(BUTTON_COLORS)}
          />
        )}
      </Stack>
    </>
  );
};
