import React from 'react';
import { cva } from 'cva';

const textVariants = cva('font-montserrat', {
  variants: {
    size: {
      B1: 'text-b1',
      B2: 'text-b2',
      L1: 'text-l1',
      L2: 'text-l2',
      S1: 'text-s1',
      C1: 'text-c1',
      C2: 'text-c2',
    },
  },
  defaultVariants: {
    size: 'B1',
  },
});

export const Text = ({
  children,
  className = '',
  size,
  textType = 'p',
  href,
  props,
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'B1' | 'B2' | 'L1' | 'L2' | 'S1' | 'C1' | 'C2';
  textType?: string;
  href?: string;
  props?: any;
}) => {
  const TextTag = `${textType}`;
  const combinedStyles = `${textVariants({ size })} ${className}`;

  return (
    <TextTag className={combinedStyles} href={href} {...props}>
      {children}
    </TextTag>
  );
};
