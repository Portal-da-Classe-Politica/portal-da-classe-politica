import React from 'react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { Icon, IconType } from '@base';
import { Box, BoxProps } from './Box';

export interface BoxIcon extends BoxProps {
  icon?: IconType;
  icons?: IconType[];

  iconSize?: SizeProp;
  size?: number | string;
  className?: string;
}

export const BoxIcon = ({ icon, icons, iconSize = '1x', size = 9, className = '' }: BoxIcon) => {
  const _icons = icon ? [icon] : icons || [];

  return (
    <Box size={size} className={className}>
      {_icons?.map((type, i) => <Icon key={i} type={type} size={iconSize} />)}
    </Box>
  );
};
