import { ButtonHTMLAttributes } from 'react';
import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from '@mantine/core';

import { cn } from '@/utils';

type ButtonVariant = 'filled' | 'light' | 'outline' | 'subtle';

type ButtonColor = 'primary' | 'error' | 'gray';

interface ButtonProps
  extends Omit<MantineButtonProps, 'style'>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  className?: string;
}

export const Button = ({
  title,
  color = 'primary',
  variant = 'filled',
  className,
  ...props
}: ButtonProps) => {
  const checkButtonType = () => {
    let buttonStyles;
    switch (true) {
      case color === 'primary':
        switch (true) {
          case variant === 'filled':
            buttonStyles = 'bg-malachite-500 text-white hover:bg-malachite-600';
            break;
          case variant === 'light':
            buttonStyles =
              'bg-malachite-50 text-malachite-500 hover:bg-malachite-100';
            break;
          case variant === 'outline':
            buttonStyles =
              'border-malachite-500 bg-white text-malachite-500 hover:bg-malachite-50';
            break;
          case variant === 'subtle':
            buttonStyles =
              'bg-transparent text-malachite-500 hover:bg-malachite-100';
            break;
          default:
            break;
        }
        break;
      case color === 'error':
        switch (true) {
          case variant === 'filled':
            buttonStyles = 'bg-red-500 text-white hover:bg-red-600';
            break;
          case variant === 'light':
            buttonStyles = 'bg-red-50 text-red-500 hover:bg-red-100';
            break;
          case variant === 'outline':
            buttonStyles =
              'border-red-500 bg-white text-red-500 hover:bg-red-50';
            break;
          case variant === 'subtle':
            buttonStyles = 'bg-transparent text-red-500 hover:bg-red-100 ';
            break;
          default:
            break;
        }
        break;
      case color === 'gray':
        switch (true) {
          case variant === 'filled':
            buttonStyles = 'bg-gray-400 text-white hover:bg-gray-500';
            break;
          case variant === 'light':
            buttonStyles = 'bg-gray-100 text-gray-600 hover:bg-gray-200';
            break;
          case variant === 'outline':
            buttonStyles =
              'border-gray-600 bg-white text-gray-600 hover:bg-gray-50';
            break;
          case variant === 'subtle':
            buttonStyles = 'bg-transparent text-gray-600 hover:bg-gray-200';
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    return buttonStyles;
  };

  return (
    <MantineButton
      className={cn(
        'px-3 py-1 font-medium capitalize',
        checkButtonType(),
        className,
      )}
      {...props}
    >
      {title}
    </MantineButton>
  );
};
