import React from 'react';

import { Icon, IconType, Text } from '@base';

const BoxIcon = ({
  text,
  iconType,
  iconSize = 64,
}: {
  text: string;
  iconType: IconType;
  iconSize?: number;
}) => {
  return (
    <div className="flex flex-col flex-1 aspect-square bg-white py-5 px-7 rounded-[10px] items-center text-center">
      <Icon type={iconType} size={iconSize} />
      <Text size={'B1'} className="font-bold text-orange mt-auto">
        {text}
      </Text>
    </div>
  );
};

export default BoxIcon;
