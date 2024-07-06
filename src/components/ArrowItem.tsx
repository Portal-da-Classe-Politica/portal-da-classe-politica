import { Icon } from './base';

type ArrowItemProps = {
  className?: string;
  children: React.ReactNode;
};
const ArrowItem = ({ className, children }: ArrowItemProps) => {
  return (
    <div className={`flex ${className} cursor-pointer gap-4`}>
      <Icon type="ArrowRight" className="text-orange" />
      <div>{children}</div>
    </div>
  );
};

export default ArrowItem;
