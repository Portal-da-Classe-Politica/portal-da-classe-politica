import Image from 'next/image';

import React from 'react';

import { Heading } from '@base';

export const BoxImageText = ({
  text,
  src,
  imgClassName,
}: {
  text: string;
  src: string;
  imgClassName?: string;
}) => {
  return (
    <div className="flex flex-col items-center text-left aspect-square bg-white w-[250px] p-6 rounded-[10px] shadow-lg">
      <Image src={src} className={imgClassName} alt="" width={160} height={110} />
      <Heading size={'H4'} className="font-bold text-orange mt-auto">
        {text}
      </Heading>
    </div>
  );
};
