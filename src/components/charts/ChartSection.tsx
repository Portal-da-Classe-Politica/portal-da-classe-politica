'use client';

import React, { useState } from 'react';
import { Text } from '../base';
import { ChartCard } from './ChartCard';
import { Heading } from '@base';
import { Checkbox } from '../base/forms/Checkbox';

export interface ChartSectionProps {
  title: string;
  description: string;
  seriesTitle: string;
  seriesDescription: string;
  chartTitle: string;
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

export const ChartSection = ({
  title,
  description,
  series,
  seriesTitle,
  seriesDescription,
  chartTitle,
}: ChartSectionProps) => {
  const [selectedSeries, setSelectedSeries] = useState({
    electoral: true,
    parliamentary: true,
  } as Record<string, boolean>);

  const toggleSeries = (checked: boolean, value: string) => {
    setSelectedSeries(prev => ({ ...prev, [value]: checked }));
  };

  const seriesToShow = Object.keys(selectedSeries)
    .filter((key: string) => selectedSeries[key])
    .map(key => series[key]);

  return (
    <div>
      <div>
        <Heading headingLevel={2} size="H1" className="mb-4">
          {title}
        </Heading>
        <Text size="S1">{description}</Text>
      </div>

      <div className="flex mt-16">
        <div className="flex w-[30%] mr-8">
          <div className="flex flex-col space-y-2">
            <Text size="B1" className="font-bold">
              {seriesTitle}
            </Text>
            <Text size="B1">{seriesDescription}</Text>

            {Object.keys(series).map(key => (
              <Checkbox
                key={key}
                value={key}
                onClick={toggleSeries}
                initialValue={series[key].initial}
                label={series[key].name}
              />
            ))}
          </div>
        </div>

        <ChartCard title={chartTitle} series={seriesToShow} />
      </div>
    </div>
  );
};