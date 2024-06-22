import React from 'react';
import { cva } from 'cva';

const textVariants = cva('font-montserrat', {
  variants: {
    sizes: {
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
    sizes: 'B1',
  },
});

const Text = ({
  children,
  className = '',
  sizes,
  textType = 'p',
  props,
}: {
  children: React.ReactNode;
  className?: string;
  sizes?: 'B1' | 'B2' | 'L1' | 'L2' | 'S1' | 'C1' | 'C2';
  textType?: string;
  props?: any;
}) => {
  const TextTag = `${textType}`;
  const combinedStyles = `${textVariants({ sizes })} ${className}`;

  return (
    <TextTag className={combinedStyles} {...props}>
      {children}
    </TextTag>
  );
};

export default Text;
