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
      thin: 'my-0.5',
    },
    transitions: {
      normal: '',
      thin: 'transition-all hover:ml-4',
    },
    selected: {
      true: 'ml-4',
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

export const LineItem = ({
  children,
  className,
  selected = false,
  type = 'normal',
}: {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  type?: 'normal' | 'thin';
}) => {
  const classes = buttonVariants({ type });

  return (
    <div className={`flex ${className} cursor-pointer ${customVariant({ transitions: type, selected })}`}>
      <div className={`${classes}`}></div>
      <div className={customVariant({ size: type })}>{children}</div>
    </div>
  );
};
