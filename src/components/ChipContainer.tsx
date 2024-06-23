import { cva } from 'cva';

const chipVariant = cva(
  'font-montserrat mr-3 text-nowrap text-c2 rounded-[20px] py-[3px] px-[8px] transition-opacity duration-300 hover:opacity-70 cursor-default',
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

interface Props {
  children: React.ReactNode;
  type?: 'default' | 'full' | 'ghost';
}

const ChipContainer = ({ type, children }: Props) => {
  return <span className={chipVariant({ type })}>{children}</span>;
};

export default ChipContainer;
