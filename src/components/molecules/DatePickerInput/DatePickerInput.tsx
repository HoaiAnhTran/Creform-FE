import { useState } from 'react';
import { LuCalendarCheck2 } from 'react-icons/lu';
import { MantineSize, TextInput } from '@mantine/core';
import { DatePickerInput as DatePickerInputMantine } from '@mantine/dates';

import { cn } from '@/utils';

interface DatePickerInputProps {
  icon?: React.ReactNode;
  withAsterisk?: boolean;
  size?: MantineSize | undefined;
  label?: string;
  sublabel?: string;
  className?: string;
}

export const DatePickerInput = (props: DatePickerInputProps) => {
  const {
    icon = <LuCalendarCheck2 />,
    withAsterisk = false,
    size = 'md',
    label = 'Date',
    sublabel = 'Date',
    className,
  } = props;
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div className={cn('flex flex-col', className)}>
      <TextInput
        size='lg'
        defaultValue={label}
        variant='unstyled'
        withAsterisk={withAsterisk}
      />
      <DatePickerInputMantine
        valueFormat='YYYY MMM DD'
        value={value}
        onChange={setValue}
        rightSection={icon}
        size={size}
      />
      <TextInput size='xs' variant='unstyled' defaultValue={sublabel} />
    </div>
  );
};
