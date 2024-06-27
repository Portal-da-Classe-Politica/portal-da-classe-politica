import { Heading } from '@base';
import { Chart } from './Chart';

export const ChartCard = ({ title, className }: { title: string; className?: string }) => {
  return (
    <div className={`flex flex-col w-[70%] p-4 bg-white shadow-lg rounded-lg ${className}`}>
      <Heading headingLevel={2} size="H1" className="mb-2">
        {title}
      </Heading>
      <Chart />
    </div>
  );
};
