import Image from 'next/image';

import React from 'react';

import { Heading } from '@base';

export const BoxImageText = ({
  text,
  src,
  imgWidth = 130,
  imgHeight = 110,
  imgClassName,
}: {
  text: string;
  src: string;
  imgWidth?: number;
  imgHeight?: number;
  imgClassName?: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center text-left aspect-square bg-white w-[300px] p-6 rounded-[10px] shadow-lg">
      <Image src={src} className={imgClassName} alt="" width={imgWidth} height={imgHeight} />
      <Heading size={'H4'} className="font-bold text-orange mt-auto text-center">
        {text}
      </Heading>
    </div>
  );
};
