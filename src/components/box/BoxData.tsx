import React from 'react';
import { cva } from 'cva';

import { Text, Heading } from '@base';

const variants = cva('font-montserrat', {
  variants: {
    background: {
      white: 'bg-white',
      orange: 'bg-orange',
    },
    header: {
      white: 'text-orange',
      orange: 'text-white',
    },
    content: {
      white: 'text-black',
      orange: 'text-white',
    },
  },
});

export const BoxData = ({
  variant = 'white',
  header,
  title,
  content,
}: {
  variant?: 'white' | 'orange';
  header: string;
  title: string;
  content: string;
}) => {
  const divClassName = variants({ background: variant });
  const headerClassName = variants({ header: variant });
  const contentClassName = variants({ content: variant });

  return (
    <div className={`flex flex-col p-5 rounded-[10px] ${divClassName}`}>
      <Heading headingLevel={2} className={`font-bold text-h1 md:text-h1 ${headerClassName}`}>
        {header}
      </Heading>
      <Text size="B1" className={`font-bold pb-2 ${headerClassName}`}>
        {title}
      </Text>
      <Text size="B2" className={`mt-auto ${contentClassName}`}>
        {content}
      </Text>
    </div>
  );
};
