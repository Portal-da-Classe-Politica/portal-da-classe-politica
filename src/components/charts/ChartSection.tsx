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

      <div className="flex flex-col-reverse md:flex-row mt-10 md:mt-16">
        <div className="flex md:w-[30%] md:mr-8">
          <div className="flex flex-col">
            <Text size="B1" className="font-bold">
              {seriesTitle}
            </Text>
            <Text size="B1">{seriesDescription}</Text>

            <div className="flex flex-1 flex-col justify-between mt-4">
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
        </div>

        <ChartCard title={chartTitle} series={seriesToShow} />
      </div>
    </div>
  );
};
