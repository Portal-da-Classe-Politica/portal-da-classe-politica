import { cva } from 'cva';

const chipVariant = cva(
  'font-montserrat mr-3 text-nowrap text-c2 rounded-[20px] py-2 px-4 transition-opacity duration-300 hover:opacity-70 cursor-default',
  {
    variants: {
      type: {
        default: 'bg-orangeLight1 text-orange font-bold',
        full: 'bg-orange text-white font-bold',
        ghost: 'text-orange font-bold border border-orange',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  },
);

export interface ChipContainerProps {
  children: React.ReactNode;
  className?: string;
  type?: 'default' | 'full' | 'ghost';
}

export const ChipContainer = ({ type, children, className }: ChipContainerProps) => {
  return <span className={`${chipVariant({ type })} ${className}`}>{children}</span>;
};
