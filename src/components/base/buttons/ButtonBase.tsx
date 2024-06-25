'use client';

import { MouseEventHandler } from 'react';
import { cva } from 'cva';

const buttonVariants = cva('font-montserrat rounded-[10px] font-bold', {
  variants: {},
  defaultVariants: {},
});

export interface ButtonBaseProps {
  id?: string;
  name?: string;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: any;
}

export const ButtonBase = ({
  id = '',
  name = '',
  className = '',
  type = 'button',
  disabled = false,
  onClick = () => {},
  children,
}: ButtonBaseProps) => {
  const classes = buttonVariants();

  return (
    <button
      id={id}
      name={name}
      type={type}
      className={`${classes} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
