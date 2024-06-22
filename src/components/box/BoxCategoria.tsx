import React from 'react';
import Image from 'next/image';
import Text from '../base/Text';
import ChipContainer from '../ChipContainer';
import Button from '../base/Button';

const BoxCategoria = ({
  title,
  subTitle,
  src,
  className,
  customHeight = 276,
}: {
  title: string;
  subTitle: string;
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
      <div className="pt-[22px] px-[28px] pb-[33px] ">
        <div className="pb-[18px]">
          <ChipContainer>Leitura de 3min</ChipContainer>
          <ChipContainer>Categoria Aqui</ChipContainer>
        </div>
        <Text sizes={'S1'} className="font-bold ">
          {title}
        </Text>
        <div className="flex items-center">
          {subTitle && (
            <Text sizes={'B2'} className=" flex-1 mr-5">
              {subTitle}
            </Text>
          )}

          <div>
            <Button style={'orange'}>
              <Text sizes={'C1'} className="font-bold">
                Saiba mais
              </Text>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxCategoria;
