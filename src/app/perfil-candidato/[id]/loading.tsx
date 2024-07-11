import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loading = () => {
  return (
    <>
      <div className="bg-white p-8 flex flex-col gap-4">
        <Skeleton height={200} containerClassName="flex-1" />

        <div className="flex gap-4 flex-col md:flex-row">
          <Skeleton height={200} containerClassName="flex-1" />

          <Skeleton height={200} containerClassName="flex-1" />
        </div>
      </div>
    </>
  );
};

export default Loading;
