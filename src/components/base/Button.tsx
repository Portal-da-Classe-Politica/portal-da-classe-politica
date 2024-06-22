import React from 'react';
import { cva } from 'cva';

const buttonVariants = cva('font-montserrat', {
  variants: {
    style: {
      preto: 'bg-black py-[12px] px-[28px] rounded-[10px]',
      laranja: 'bg-laranja py-[12px] px-[28px] rounded-[10px] text-white',
      laranjaSmall: 'bg-laranja py-[7px] px-[28px] rounded-[10px] text-white',
    },
  },
  defaultVariants: {
    style: 'preto',
  },
});

const Button = ({ style, children }: { style?: any; children: React.ReactNode }) => {
  return <button className={buttonVariants({ style })}>{children}</button>;
};

export default Button;
