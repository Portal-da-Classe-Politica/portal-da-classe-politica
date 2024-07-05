import React from 'react';
import { cva } from 'cva';

const headingVariants = cva('font-montserrat', {
  variants: {
    size: {
      D1: 'text-h1 md:text-d1 font-bold',
      D2: 'text-h3 md:text-d2 font-medium',
      H1: 'text-h5 md:text-h1 font-bold',
      H2: 'text-h2',
      H3: 'text-h3',
      H4: 'text-h4',
      H5: 'text-h5',
      H6: 'text-h6',
      S1: 'text-h6 md:text-s1',
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
  onClick,
}: {
  headingLevel?: number;
  size?: 'D1' | 'D2' | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'S1';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  const combinedStyles = `${headingVariants({ size })} ${className}`;

  return (
    <HeadingTag className={combinedStyles} onClick={onClick}>
      {children}
    </HeadingTag>
  );
};
