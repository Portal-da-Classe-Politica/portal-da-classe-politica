import { cva } from 'cva';

const buttonVariants = cva('font-montserrat rounded-[10px] font-bold', {
  variants: {
    type: { default: 'border-grayMix2', darkerGray: 'border-grayLight2', orange: 'border-orange' },
    bottom: { small: 'mb-3', default: 'mb-14' },
    top: { default: '', small: 'mt-10' },
  },
  defaultVariants: {
    type: 'default',
    bottom: 'default',
    top: 'default',
  },
});

type DividerProps = {
  type?: 'default' | 'darkerGray' | 'orange';
  bottom?: 'default' | 'small';
  top?: 'default' | 'small';
};

export const Divider = ({ type, bottom, top }: DividerProps) => {
  const classes = buttonVariants({ type, bottom, top });

  return <hr className={`h-[3px] w-full ${classes} `} />;
};
