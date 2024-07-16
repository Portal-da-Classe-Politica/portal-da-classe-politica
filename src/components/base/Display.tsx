import React from 'react';
import { cva } from 'cva';

const displayVariants = cva('font-montserrat', {
  variants: {
    style: { D1: 'text-d1 font-bold', D2: 'text-d2 font-medium' },
  },
  defaultVariants: {
    style: 'D2',
  },
});

export const Display = ({
  style,
  children,
  className,
}: {
  style?: any;
  children: React.ReactNode;
  className?: string;
}) => {
  const combinedStyles = `${displayVariants({ style })} ${className}`;

  return <h1 className={combinedStyles}>{children}</h1>;
};
