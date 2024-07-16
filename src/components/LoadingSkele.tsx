import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingSkele = () => {
  return (
    <div className="bg-white p-8 flex flex-col gap-4">
      <Skeleton height={200} containerClassName="flex-1" />
    </div>
  );
};

export default LoadingSkele;
