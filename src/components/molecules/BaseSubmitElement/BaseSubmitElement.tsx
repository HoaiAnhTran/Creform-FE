import { Button, Stack } from '@mantine/core';

import { ALIGNMENT_OPTIONS } from '@/constants/buttonStyles';
import { SubmitElement } from '@/types';

import { BaseElementProps } from '../FactoryElement';

export const BaseSubmitElement = (props: BaseElementProps<SubmitElement>) => {
  const { item } = props;
  const getAlignmentClass = (buttonAlignment: string) => {
    if (!ALIGNMENT_OPTIONS.includes(buttonAlignment)) {
      buttonAlignment = 'auto';
    }

    return (
      {
        center: 'items-center',
        right: 'items-end',
        left: 'items-start',
        auto: 'items-auto',
      }[buttonAlignment] || ''
    );
  };

  const alignment = getAlignmentClass(item.config.buttonAlignment);

  const handleSubmit = () => {};

  return (
    <Stack className={`py-2 ${alignment}`}>
      <Button
        type='submit'
        className='h-[48px] w-[190px]'
        color={item.config.buttonColor}
        onClick={handleSubmit}
      >
        {item.config.buttonText}
      </Button>
    </Stack>
  );
};
