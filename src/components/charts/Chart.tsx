'use client';

import { ApexOptions } from 'apexcharts';

import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface ChartProps {
  series: ApexOptions['series'];
  height?: number;
}

export const Chart = ({ series, height = 600 }: ChartProps) => {
  const options: ApexOptions = {
    chart: {
      toolbar: {
        tools: {
          zoom: false,
          download: false,
        },
      },
    },
    xaxis: {
      categories: ['2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    },
    yaxis: {},
  };

  return <ApexChart options={options} series={series} type="line" height={height} />;
};
