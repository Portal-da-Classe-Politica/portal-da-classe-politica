import React from 'react';

import { IconAwesome, IconTypeAwesome, IconAwesomeSize, Text } from '@base';

export const BoxIconText = ({
  text,
  iconType,
  iconSize = '3x',
}: {
  text: string;
  iconType: IconTypeAwesome;
  iconSize?: IconAwesomeSize;
}) => {
  return (
    <div className="flex flex-col w-[164px] h-[164px] flex-1 aspect-square bg-white py-5 px-7 rounded-[10px] items-center text-center text-orange">
      <IconAwesome type={iconType} size={iconSize} />
      <Text size={'B1'} className="font-bold text-orange mt-auto">
        {text}
      </Text>
    </div>
  );
};
