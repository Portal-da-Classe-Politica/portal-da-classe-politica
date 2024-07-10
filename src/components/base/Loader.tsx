import { BarLoader, BeatLoader, ClockLoader, ScaleLoader } from 'react-spinners';

const variantMap = {
  Bar: BarLoader,
  Beat: BeatLoader,
  Clock: ClockLoader,
  Scale: ScaleLoader,
};

export const Loader = ({ variant = 'Beat' }: { variant?: keyof typeof variantMap }) => {
  const Comp = variantMap[variant];
  return <Comp color="black" />;
};
