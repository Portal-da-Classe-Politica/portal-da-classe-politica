import React from 'react';
import { cva } from 'cva';

const textVariants = cva('font-montserrat whitespace-pre-line	', {
  variants: {
    size: {
      B1: 'text-b1',
      B2: 'text-b2',
      L1: 'text-l1',
      L2: 'text-l2',
      S1: 'text-h6 md:text-s1',
      C1: 'text-c1',
      C2: 'text-c2',
      MIN: 'text-min',
    },
  },
  defaultVariants: {
    size: 'B1',
  },
});

export type TextSize = 'B1' | 'B2' | 'L1' | 'L2' | 'S1' | 'C1' | 'C2' | 'MIN';

export type TextProps = {
  children: React.ReactNode;
  className?: string;
  size?: TextSize;
  textType?: 'p' | 'a' | 'span';
  href?: string;
  props?: any;
};

export const Text = ({ children, className = '', size, textType = 'p', href, props }: TextProps) => {
  const TextTag = `${textType}`;
  const combinedStyles = `${textVariants({ size })} ${className}`;

  return (
    <TextTag className={combinedStyles} href={href} {...props}>
      {children}
    </TextTag>
  );
};
