import React from 'react';

export interface BoxProps {
  size?: number | string;
  className?: string;
  children?: React.ReactNode;
}

export const Box = ({ size = 9, className = '', children }: BoxProps) => {
  const customClass = `w-${size} h-${size} ${className}`;
  return <div className={`flex rounded-[10px] items-center justify-center ${customClass}`}>{children}</div>;
};
