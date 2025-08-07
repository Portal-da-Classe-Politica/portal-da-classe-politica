import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Heading, Text } from '@base';
import { ChipContainer } from './ChipContainer';

type BaseProps = {
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

type ConditionalProps<T> = T extends { type: 'Secondary' } ? {} : { subTitle?: string };

type Props<T extends BaseProps> = T & ConditionalProps<T>;

const Primary = ({ title, subTitle }: { title: string; subTitle?: string; href: string }) => {
  return (
    <>
      <div className="flex flex-1 flex-col items-start">
        <Text className="font-bold md:text-s1 text-b1 mb-2 text-left">{title}</Text>
        {subTitle && (
          <Text size={'B2'} className="flex-1 text-left">
            {subTitle}
          </Text>
        )}
      </div>
    </>
  );
};

const Secondary = ({ title }: { title: string; href: string }) => {
  return <Text className="font-bold md:text-s1 text-b1">{title}</Text>;
};

const Tertiary = ({ title, subTitle }: { title: string; subTitle?: string; href: string }) => {
  return (
    <div className="flex flex-col flex-1">
      <Heading headingLevel={6} size={'H6'} className="font-bold">
        {title}
      </Heading>
      <div>
        <Text size={'B2'} className="flex-1 mt-1">
          {subTitle}
        </Text>
      </div>
    </div>
  );
};

const ContentSelect = {
  Primary: Primary,
  Secondary: Secondary,
  Tertiary: Tertiary,
};

export const CardPost = <T extends BaseProps>({
  title,
  subTitle,
  src,
  className,
  customHeight = 150,
  category,
  type,
  alt,
  href,
}: Props<T>) => {
  const SelectedComponent = ContentSelect[type];
  const imgSize = `min-h-[${customHeight}px] ${type === 'Tertiary' ? 'max-h-[150px]' : ''}`;

  return (
    <Link
      target="_self"
      href={href}
      className={`flex flex-1 flex-col h-full bg-white w-full items-center rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ${className} hover:shadow-lg`}
    >
      <div className={`flex flex-1 w-full ${imgSize} relative`}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image src={src} fill className="rounded-t-[10px] object-cover h-auto w-auto" alt={alt} />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-3">
        <div className="mb-2">
          {category.map((categoryText, i) => {
            return (
              <ChipContainer key={i} className="text-min !p-2">
                {categoryText}
              </ChipContainer>
            );
          })}
        </div>
        <SelectedComponent title={title} subTitle={subTitle} href={href} />
      </div>
    </Link>
  );
};
