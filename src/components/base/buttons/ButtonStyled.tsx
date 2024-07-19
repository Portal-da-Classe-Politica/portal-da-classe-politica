'use client';

import { cva } from 'cva';
import { ButtonBase, ButtonBaseProps } from './ButtonBase';

const buttonVariants = cva('font-montserrat rounded-[10px] font-bold', {
  variants: {
    style: {
      fillOrange: 'text-white bg-orange hover:bg-orangeDark2',
      fillBlack: 'text-white bg-black hover:bg-grayDark2',
      outlinedOrange:
        'text-orange bg-white border-orange border-2 hover:text-white hover:bg-orangeLight3 hover:border-orangeLight3',
      outlinedBlack:
        'text-black bg-white border-black border-2 hover:text-white hover:bg-grayDark2 hover:border-grayDark2',
      ghostOrange: 'text-orange bg-transparent font-normal hover:bg-orangeLight1',
      ghostBlack: 'text-orange bg-transparent font-normal hover:bg-orangeLight1',
      linkOrange: 'bg-transparent font-normal underline text-orange',
      linkBlack: 'bg-transparent font-normal underline text-black',

      fillGray: 'text-black bg-grayMix1 hover:opacity-80',
    },
    size: {
      small: 'px-7 py-2',
      standard: 'px-7 py-3',
      large: 'px-7 py-4',
    },
    state: {
      '': '',
      disabled: 'opacity-20',
    },
  },
  defaultVariants: {
    style: 'fillOrange',
    size: 'standard',
  },
});

export interface ButtonStyledProps extends ButtonBaseProps {
  color?: 'orange' | 'black';
  style?:
    | 'fillOrange'
    | 'fillBlack'
    | 'outlinedOrange'
    | 'outlinedBlack'
    | 'ghostOrange'
    | 'ghostBlack'
    | 'linkOrange'
    | 'linkBlack'
    | 'fillGray';
  size?: 'small' | 'standard' | 'large';
}

export const ButtonStyled = ({
  style = 'fillOrange',
  size = 'standard',
  className = '',
  disabled = false,
  children,
  ...restProps
}: ButtonStyledProps) => {
  const classes = buttonVariants({ style, size, state: disabled ? 'disabled' : '' });
  return (
    <ButtonBase className={`${classes} ${className}`} {...restProps}>
      {children}
    </ButtonBase>
  );
};
