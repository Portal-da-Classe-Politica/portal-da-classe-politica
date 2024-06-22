import React from 'react';
import Image from 'next/image';

import { Text } from '@base';

const BoxFerramenta = ({ src, title, subTitle }: { src: string; title: string; subTitle: string }) => {
  return (
    <div className="flex flex-col bg-white h-[312px] w-[295px] py-9 px-6 items-center rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <Image src={src} width={180} height={110} alt="" />
      <Text size={'B1'} className="font-bold text-center">
        {title}
      </Text>
      <Text size={'B2'} className="text-center">
        {subTitle}
      </Text>
      <Text textType="a" size={'C2'} className="mt-auto text-orange">
        Acessar Ferramenta
      </Text>
    </div>
  );
};

export default BoxFerramenta;
