import { FaSave } from 'react-icons/fa';
import { Tooltip, UnstyledButton } from '@mantine/core';

import { useScroll } from '@/hooks';
import { cn } from '@/utils';

interface SaveButtonProps {
  className?: string;
  handleSave?: () => void;
}
const TOPBAR_HEIGHT = 50;

export const SaveButton = ({ className, handleSave }: SaveButtonProps) => {
  const isFixed = useScroll(TOPBAR_HEIGHT);

  return (
    <Tooltip
      label='Save changes'
      position='left'
      arrowSize={6}
      withArrow
      offset={12}
    >
      <UnstyledButton
        className={cn(
          'flex flex-col items-center text-malachite-500 transition-all duration-[600ms] ease-linear',
          className,
          { 'fixed top-20': isFixed },
        )}
        onClick={handleSave}
      >
        <span className='relative flex h-12 w-12 items-center justify-center rounded-full bg-malachite-400'>
          <span className='absolute h-full w-full animate-ping rounded-full bg-malachite-400 opacity-65 duration-1000'></span>
          <FaSave size={24} className='text-white' />
        </span>
      </UnstyledButton>
    </Tooltip>
  );
};
