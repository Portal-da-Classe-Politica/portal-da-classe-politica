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
    <div className={`w-full ${className}`}>
      <Heading headingLevel={2} size="H1" className="mb-4 text-grayMix4">
        {title}
      </Heading>

      <div className="flex w-full min-h-[450px]">
        <SeriesMap series={series} label={label} />
      </div>
    </div>
  );
};
