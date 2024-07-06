import React from 'react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { Icon, IconType } from '@base';

export const BoxIconAwesome = ({
  iconType,
  iconSize = '1x',
  size = 9,
  className = '',
}: {
  iconType: IconType;
  iconSize?: SizeProp;
  size?: number | string;
  className?: string;
}) => {
  const customClass = `w-${size} h-${size} ${className}`;
  return (
    <div className={`flex rounded-[10px] items-center justify-center ${customClass}`}>
      <Icon type={iconType} size={iconSize} />
    </div>
  );
};
