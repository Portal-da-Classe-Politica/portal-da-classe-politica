import { cva } from 'cva';

const buttonVariants = cva('bg-orange mr-5', {
  variants: {
    type: {
      normal: 'w-[4px]',
      thin: 'w-[2px]',
    },
  },
  defaultVariants: {
    type: 'normal',
  },
});

const customVariant = cva('', {
  variants: {
    size: {
      normal: 'my-2',
      thin: 'my-[2px]',
    },
    transitions: {
      normal: '',
      thin: 'transition-transform hover:translate-x-2',
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

export const LineItem = ({
  children,
  className,
  type = 'normal',
}: {
  children: React.ReactNode;
  className?: string;
  type?: 'normal' | 'thin';
}) => {
  const classes = buttonVariants({ type });

  return (
    <div className={`flex ${className} cursor-pointer ${customVariant({ transitions: type })}`}>
      <div className={`${classes}`}></div>
      <div className={customVariant({ size: type })}>{children}</div>
    </div>
  );
};
