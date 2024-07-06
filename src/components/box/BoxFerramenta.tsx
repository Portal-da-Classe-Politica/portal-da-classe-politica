import React from 'react';
import Image from 'next/image';

import { Icon, Text } from '@base';

export const BoxFerramenta = ({
  src,
  title,
  subTitle,
  alt,
}: {
  src: string;
  title: string;
  subTitle: string;
  alt: string;
}) => {
  return (
    <div className="flex flex-col bg-white h-[312px] w-[295px] py-9 px-6 items-center rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex flex-1 h-[40%]">
        <Image src={src} width={180} height={110} alt={alt} />
      </div>
      <div className="flex flex-2 flex-col justify-between items-center mt-4">
        <Text size={'B1'} className="font-bold text-center">
          {title}
        </Text>
        <Text size={'B2'} className="text-center">
          {subTitle}
        </Text>
        <Text textType="a" size={'C2'} className="text-orange flex">
          Acessar Ferramenta
          <div className="ml-2">
            <Icon type="ArrowRight" />
          </div>{' '}
        </Text>
      </div>
    </div>
  );
};
