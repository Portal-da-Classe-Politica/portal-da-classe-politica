import React from 'react';
import { Text, TextProps } from './Text';
import Image from 'next/image';

interface TextIconProps extends TextProps {
  src: string;
  sizeImg?: number;
  position: 'left' | 'right';
}

export const TextIcon = ({ children, src, sizeImg = 32, position, ...props }: TextIconProps) => {
  return (
    <Text {...props} className="flex">
      {position === 'left' && <Image src={src} height={sizeImg} width={sizeImg} alt="" className="mr-2" />}
      {children}
      {position === 'right' && <Image src={src} height={sizeImg} width={sizeImg} alt="" className="ml-2" />}
    </Text>
  );
};
