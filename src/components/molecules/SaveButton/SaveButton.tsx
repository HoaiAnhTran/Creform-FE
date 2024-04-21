import { FaSave } from 'react-icons/fa';
import { Box, LoadingOverlay, Tooltip, UnstyledButton } from '@mantine/core';

import { useScroll } from '@/hooks';
import { cn } from '@/utils';

interface SaveButtonProps {
  className?: string;
  handleSave?: () => void;
  isLoading: boolean;
  canSave: boolean;
}
const TOPBAR_HEIGHT = 50;

export const SaveButton = ({
  isLoading,
  canSave,
  className,
  handleSave,
}: SaveButtonProps) => {
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
        type='submit'
        className={cn(
          'flex flex-col items-center text-malachite-500 transition-all duration-[600ms] ease-linear',
          className,
          { 'fixed right-0 top-[90px]': isFixed },
        )}
        onClick={handleSave}
        disabled={!canSave}
      >
        <Box pos='relative'>
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ blur: 2 }}
            className='rounded-full'
            loaderProps={{ color: 'green', size: 22 }}
          />
          <span
            className={cn(
              'relative flex h-12 w-12 items-center justify-center rounded-full bg-malachite-400',
              {
                'bg-malachite-300': !canSave,
              },
            )}
          >
            {canSave && (
              <span className='absolute h-full w-full animate-ping rounded-full bg-malachite-400 opacity-65 duration-1000'></span>
            )}
            <FaSave size={24} className='text-white' />
          </span>
        </Box>
      </UnstyledButton>
    </Tooltip>
  );
};
