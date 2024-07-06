import React from 'react';

import { Icon, IconType, IconSize } from '@base';

export const BoxIcon = ({
  iconType,
  iconSize = 'xs',
  size = 9,
  className = '',
}: {
  iconType: IconType;
  iconSize?: IconSize;
  size?: number;
  className?: string;
}) => {
  const customClass = `w-${size} h-${size} ${className}`;
  return (
    <div className={`flex rounded-[10px] items-center justify-center ${customClass}`}>
      <Icon type={iconType} size={iconSize} />
    </div>
  );
};
