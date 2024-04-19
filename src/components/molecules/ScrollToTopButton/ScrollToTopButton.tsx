import { useEffect, useState } from 'react';
import { PiArrowLineUp } from 'react-icons/pi';
import { UnstyledButton } from '@mantine/core';

import { cn } from '@/utils';

interface ScrollButtonProps {
  className?: string;
}

const SCROLL_THRESHOLD = 200;

export const ScrollToTopButton = ({ className }: ScrollButtonProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset >= SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <UnstyledButton
      className={cn('flex flex-col items-center gap-2 ', className, {
        hidden: !isVisible,
      })}
      onClick={handleClick}
    >
      <PiArrowLineUp
        size={40}
        className='rounded border-2 border-solid border-black pb-1'
      />
      <span className='text-xs'>Go to top</span>
    </UnstyledButton>
  );
};
