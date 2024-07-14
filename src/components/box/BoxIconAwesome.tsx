import React from 'react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { Icon, IconType } from '@base';

export const BoxIconAwesome = ({
  iconType,
  vectorIconType,
  iconSize = '1x',
  size = 9,
  className = '',
  customIcon,
}: {
  iconType?: IconType;
  iconSize?: SizeProp;
  size?: number | string;
  className?: string;
  vectorIconType?: IconType[];
  customIcon?: React.ReactNode;
}) => {
  const customClass = `w-${size} h-${size} ${className}`;
  return (
    <div className={`flex rounded-[10px] items-center justify-center ${customClass}`}>
      {iconType && <Icon type={iconType} size={iconSize} />}
      {vectorIconType?.map((types: IconType, i) => <Icon key={i} type={types} size={iconSize} />)}
      {customIcon}
    </div>
  );
};
