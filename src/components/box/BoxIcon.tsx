import React from 'react';

import { IconAwesome, IconTypeAwesome, IconAwesomeSize } from '@base';

export const BoxIcon = ({
  iconType,
  iconSize = 'xs',
  size = 9,
  className = '',
}: {
  iconType: IconTypeAwesome;
  iconSize?: IconAwesomeSize;
  size?: number;
  className?: string;
}) => {
  const customClass = `w-${size} h-${size} ${className}`;
  return (
    <div className={`flex rounded-[10px] items-center justify-center ${customClass}`}>
      <IconAwesome type={iconType} size={iconSize} />
    </div>
  );
};
