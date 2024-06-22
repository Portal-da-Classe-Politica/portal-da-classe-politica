import React from 'react';
import Image from 'next/image';
import Text from '../base/Text';

const BoxIcon = ({ texto, src }: { texto: string; src: string }) => {
  return (
    <div className="flex flex-col bg-white h-[161px] w-[163px] py-5 px-7  rounded-[10px] items-center text-center ">
      <Image src={src} height={64} width={64} className="w-[64px] h-[64px] pb-3" alt="" />
      <Text sizes={'B1'} className="font-bold text-orange">
        {texto}
      </Text>
    </div>
  );
};

export default BoxIcon;
