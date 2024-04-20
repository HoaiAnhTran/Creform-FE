import { Checkbox, Flex, Text } from '@mantine/core';

import { cn } from '@/utils';

interface ToggleButtonProps {
  label: string;
  className?: string;
  isEnable: boolean;
  handleToggleButton: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  className,
  isEnable,
  handleToggleButton,
}) => (
  <Flex className={cn('cursor-pointer gap-2.5', className)}>
    <Text className='text-sm' onClick={handleToggleButton}>
      {label}
    </Text>
    <label className='relative inline-block h-5 w-12 cursor-pointer'>
      <Checkbox
        className='absolute left-0 top-0 h-full w-full opacity-0'
        checked={isEnable}
        onChange={handleToggleButton}
      />
      <span
        className={cn(
          'absolute bottom-0 left-0 right-0 top-0 inline-block rounded-full transition duration-300',
          isEnable ? 'bg-toggleOn' : 'bg-toggleOff',
        )}
      ></span>
      <span
        className={cn(
          'absolute -bottom-1 left-0 h-7 w-7 rounded-full bg-white shadow-lg transition duration-300',
          isEnable && 'translate-x-5 transform',
        )}
      ></span>
    </label>
  </Flex>
);
