'use client';

import { Heading, Text } from '@base';
import { Chart, ChartProps } from './Chart';

export interface ChartCardProps extends ChartProps {
  title?: string;
  className?: string;
}

export const ChartCard = ({ title, className, series, height }: ChartCardProps) => {
  return (
    <div
      className={`flex flex-col md:w-[70%] p-4 bg-white drop-shadow-lg rounded-lg ${className} mb-10 md:mb-0`}
    >
      <Heading headingLevel={2} size="H1" className="mb-2">
        {title}
      </Heading>

      <Chart series={series} height={height} />

      <div className="flex justify-center items-center mt-4">
        <Text size="C1">Y Axis Meaning</Text>
        <Text size="C1" className="mx-2">
          |
        </Text>
        <Text size="C1">X Axis Meaning</Text>
      </div>
    </div>
  );
};
