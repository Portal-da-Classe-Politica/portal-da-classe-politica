import React from 'react';
import { cva } from 'cva';

const headingVariants = cva('font-montserrat', {
  variants: {
    sizes: {
      H1: 'text-h1',
      H2: 'text-h2',
      H3: 'text-h3',
      H4: 'text-h4',
      H5: 'text-h5',
      H6: 'text-h6',
    },
  },
  defaultVariants: {
    sizes: 'H1',
  },
});

const Heading = ({
  headingLevel = 1,
  className = '',
  sizes,
  children,
}: {
  headingLevel?: number;
  sizes?: 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';
  className?: string;
  children: React.ReactNode;
}) => {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  const combinedStyles = `${headingVariants({ sizes })} ${className}`;

  return <HeadingTag className={combinedStyles}>{children}</HeadingTag>;
};

export default Heading;
