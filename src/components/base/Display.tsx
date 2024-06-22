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

const Display = ({ style, children }: { style?: any; children: React.ReactNode }) => {
  return <h1 className={displayVariants({ style })}>{children}</h1>;
};

export default Display;
