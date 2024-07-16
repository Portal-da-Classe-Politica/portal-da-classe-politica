import React from 'react';

export const Container = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={`max-w-[1290px] px-5 m-auto ${className}`}>{children}</div>;
};
