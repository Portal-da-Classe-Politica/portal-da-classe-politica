import React from 'react';
import { cva } from 'cva';

const headingVariants = cva('font-montserrat', {
  variants: {
    size: {
      D1: 'text-d1 font-bold',
      D2: 'text-d2 font-medium',
      H1: 'text-h1 font-bold',
      H2: 'text-h2',
      H3: 'text-h3',
      H4: 'text-h4',
      H5: 'text-h5',
      H6: 'text-h6',
    },
  },
  defaultVariants: {
    size: 'H1',
  },
});

export const Heading = ({
  headingLevel = 1,
  className = '',
  size,
  children,
}: {
  headingLevel?: number;
  size?: 'D1' | 'D2' | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';
  className?: string;
  children: React.ReactNode;
}) => {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  const combinedStyles = `${headingVariants({ size })} ${className}`;

  return <HeadingTag className={combinedStyles}>{children}</HeadingTag>;
};
