import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Text } from '@base';
import { ChipContainer } from '@components/ChipContainer';

type CarouselItemProps = {
  title: string;
  subTitle?: string;
  src: string;
  className?: string;
  customHeight?: number;
  category: string[];
  type: 'Primary' | 'Secondary' | 'Tertiary';
  alt: string;
  href: string;
};

export const CarouselItem = ({
  title,
  subTitle,
  src,
  className,
  customHeight = 150,
  category,
  type,
  alt,
  href,
}: CarouselItemProps) => {
  const imgSize = `min-h-[${customHeight}px] ${type === 'Tertiary' ? 'max-h-[150px]' : ''}`;

  return (
    <Link
      target="_blank"
      href={href}
      className={`flex flex-1 flex-col h-full w-full bg-white items-center !border-[0px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-lg ${className}`}
    >
      <div className={`flex flex-1 w-full ${imgSize} relative`}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image src={src} fill className="rounded-t-[10px] object-cover h-auto w-auto" alt={alt} />
        </div>
      </div>
      <div className="flex w-full flex-col p-3 mb-6">
        <div className="flex mb-2">
          {category.map((categoryText, i) => {
            return (
              <ChipContainer key={i} className="text-min !p-2">
                {categoryText}
              </ChipContainer>
            );
          })}
        </div>
        <div className="flex flex-1 flex-col items-start">
          <Text className="font-bold md:text-s1 text-b1 mb-2 text-left">{title}</Text>
          {subTitle && (
            <Text size={'B2'} className="flex-1 text-left">
              {subTitle}
            </Text>
          )}
        </div>
      </div>
    </Link>
  );
};
