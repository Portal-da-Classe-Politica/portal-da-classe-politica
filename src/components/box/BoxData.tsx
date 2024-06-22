import React from 'react';
import Text from '@base/Text';
import Heading from '@base/Heading';

const BoxData = ({ numero, texto, title }: { numero: number | string; texto: string; title: string }) => {
  return (
    <div className="flex flex-col bg-white h-[193px] w-[298px] p-5  rounded-[10px] ">
      <Heading headingLevel={3} className="font-bold text-orange">
        {numero}
      </Heading>
      <Text className=" text-[18px] text-orange font-bold pb-[10px]">{title}</Text>
      <Text sizes={'B2'} className="mt-auto ">
        {texto}
      </Text>
    </div>
  );
};

export default BoxData;
