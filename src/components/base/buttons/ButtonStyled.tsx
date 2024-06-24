'use client';

import { cva } from 'cva';
import { Button, ButtonProps } from './Button';
import { Text } from '../text/Text';

const buttonVariants = cva('font-montserrat rounded-[10px] font-bold', {
  variants: {
    color: {
      orange: 'text-white',
      black: 'text-white',
    },
    style: {
      fill: '',
      outlined: 'border-2 bg-white',
      ghost: 'bg-transparent !font-normal',
      link: 'bg-transparent !font-normal underline',
    },
    size: {
      small: 'px-[28px] py-[7.5px]',
      standard: 'px-[28px] py-[11.5px]',
      large: 'px-[28px] py-[15.5px]',
    },
    state: {
      '': '',
      disabled: 'opacity-20',
    },
  },
  compoundVariants: [
    // Fill
    {
      color: 'orange',
      style: 'fill',
      class: 'bg-orange hover:bg-orangeDark2',
    },
    {
      color: 'black',
      style: 'fill',
      class: 'bg-black hover:bg-grayDark2',
    },
    // Outlined
    {
      color: 'orange',
      style: 'outlined',
      class: [
        'border-orange !text-orange',
        'hover:!text-white hover:bg-orangeLight3 hover:border-orangeLight3',
      ],
    },
    {
      color: 'black',
      style: 'outlined',
      class: 'border-black !text-black hover:!text-white hover:bg-grayDark2 hover:border-grayDark2',
    },
    // Ghost
    {
      color: 'orange',
      style: 'ghost',
      class: '!text-orange hover:bg-orangeLight1',
    },
    {
      color: 'black',
      style: 'ghost',
      class: '!text-black hover:bg-grayLight1',
    },
    // Link
    {
      color: 'orange',
      style: 'link',
      class: '!text-orange',
    },
    {
      color: 'black',
      style: 'link',
      class: '!text-black',
    },
  ],
  defaultVariants: {
    color: 'orange',
    style: 'fill',
    size: 'standard',
  },
});

export interface ButtonStyledProps extends ButtonProps {
  text: string;
  color?: 'orange' | 'black';
  style?: 'fill' | 'outlined' | 'ghost' | 'link';
  size?: 'small' | 'standard' | 'large';
}

export const ButtonStyled = ({
  text,
  color = 'orange',
  style = 'fill',
  size = 'standard',

  id = '',
  name = '',
  className = '',
  type = 'button',
  disabled = false,
  onClick = () => {},
}: ButtonStyledProps) => {
  const classes = buttonVariants({
    color,
    style,
    size,
    state: disabled ? 'disabled' : '',
  });

  return (
    <Button
      id={id}
      name={name}
      type={type}
      className={`${classes} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <Text>{text}</Text>
    </Button>
  );
};

export default ButtonStyled;
