'use client';

import React, { useState } from 'react';
import { Text } from '../base';
import { Heading } from '@base';
// import { Checkbox } from '../base/forms/Checkbox';
import { Chart } from './Chart';

export interface ChartSectionProps {
  title: string;
  description: string;
  chartTitle: string;
  seriesTitle?: string;
  seriesDescription?: string;
  series: Record<
    string,
    {
      name: string;
      initial?: boolean;
      data: number[];
      color: string;
    }
  >;
}

export const SecondLayerChart = ({ chartTitle, series }: ChartSectionProps) => {
  const [selectedSeries /*setSelectedSeries*/] = useState({
    electoral: true,
    parliamentary: true,
  } as Record<string, boolean>);

  const seriesToShow = Object.keys(selectedSeries)
    .filter((key: string) => selectedSeries[key])
    .map(key => series[key]);

  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row mt-10 md:mt-16">
        <div
          className={`flex flex-1 flex-col h-max-[657px] min-w-[70%] p-4 bg-white drop-shadow-lg rounded-lg mb-10 md:mb-0`}
        >
          <Heading headingLevel={2} size="H1" className="mb-4">
            {chartTitle}
          </Heading>

          <Chart
            series={seriesToShow}
            options={{
              xaxis: {
                categories: ['2014', '2015', '2016', '2017', '2018', '2019', '2020'],
              },
            }}
          />

          <div className="flex justify-center items-center mt-4">
            <Text size="C1">Y Axis Meaning</Text>
            <Text size="C1" className="mx-2">
              |
            </Text>
            <Text size="C1">X Axis Meaning</Text>
          </div>
        </div>
      </div>
    </div>
  );
};
