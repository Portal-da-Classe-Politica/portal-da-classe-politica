import { BarLoader, BeatLoader, ClockLoader, ScaleLoader, SyncLoader } from 'react-spinners';

const variantMap = {
  Bar: BarLoader,
  Beat: BeatLoader,
  Clock: ClockLoader,
  Scale: ScaleLoader,
  Sync: SyncLoader,
};

export const Loader = ({
  variant = 'Beat',
  color = 'black',
}: {
  variant?: keyof typeof variantMap;
  color?: string;
}) => {
  const Comp = variantMap[variant];
  return <Comp color={color} />;
};
