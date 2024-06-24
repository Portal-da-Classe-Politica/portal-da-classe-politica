import React from 'react';

import { Icon, IconType } from '@base';

export const BoxIcon = ({
  iconType,
  iconSize = 64,
  size = 9,
  className = '',
}: {
  iconType: IconType;
  iconSize?: number;
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
