import React from 'react';
import Image from 'next/image';
import Text from '../base/Text';
import ChipContainer from '../ChipContainer';
import Button from '../base/Button';
import Heading from '../base/Heading';

const BoxTreinamento = ({
  title,
  src,
  className,
  customHeight = 276,
}: {
  title: string;
  src: string;
  className?: string;
  customHeight?: number;
}) => {
  return (
    <div
      className={`flex flex-col h-full bg-white items-center rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div className={`w-full h-[${customHeight}px] relative flex-1`}>
        <Image src={src} layout="fill" objectFit="cover" className="rounded-t-[10px]" alt="" />
      </div>
      <div className="pt-[12px] px-[16px] pb-[12px] ">
        <div className="pb-[8px]">
          <ChipContainer>Leitura de 3min </ChipContainer>
          <ChipContainer>Categoria Aqui </ChipContainer>
        </div>
        <Heading sizes="H6" className="font-bold ">
          {title}
        </Heading>
        <div className="h-[32-px]">
          <Button style={'laranjaSmall'}>
            <Text className="text-[12px] font-bold">Saiba mais</Text>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BoxTreinamento;
