import { Heading } from '@base';
import SeriesMap from '@components/map/SeriesMap';

export const MapResultCard = ({
  className = '',
  title,
  label,
  series,
}: {
  className?: string;
  title: string;
  label: string;
  series: any[];
}) => {
  return (
    <div
      className={`flex flex-col w-full max-h-[800px] p-4 md:p-12 bg-white drop-shadow-lg rounded-lg ${className}`}
    >
      <div className="w-full">
        <Heading headingLevel={2} size="H1" className="mb-4 text-grayMix4">
          {title}
        </Heading>

        <div className="flex w-full min-h-[450px]">
          <SeriesMap series={series} label={label} />
        </div>
      </div>
    </div>
  );
};
