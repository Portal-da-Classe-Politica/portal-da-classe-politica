import React from 'react';
import { Text } from '../base';
import { Heading } from '@base';
import { Chart } from './Chart';
import { ApexOptions } from 'apexcharts';

export interface ChartSectionProps {
  title: string;
  yAxisTitle?: string;
  xAxisTitle?: string;
  className?: string;
  categories: string[];
  series: ApexOptions['series'];
}

export const LineChartCard = ({
  title,
  yAxisTitle = '',
  xAxisTitle = '',
  series,
  categories,
  className = '',
}: ChartSectionProps) => {
  return (
    <div
      className={`flex flex-col w-full max-h-[800px] p-3 md:p-12 bg-white drop-shadow-lg rounded-lg ${className}`}
    >
      <div className="w-full">
        <Heading headingLevel={2} size="H1" className="mb-4 text-grayMix4">
          {title}
        </Heading>

        <Chart
          series={series}
          options={{
            xaxis: {
              categories: categories,
            },
          }}
        />

        <div className="flex justify-center items-center mt-4">
          <Text size="C1">{yAxisTitle}</Text>
          <Text size="C1" className="mx-2">
            |
          </Text>
          <Text size="C1">{xAxisTitle}</Text>
        </div>
      </div>
    </div>
  );
};
