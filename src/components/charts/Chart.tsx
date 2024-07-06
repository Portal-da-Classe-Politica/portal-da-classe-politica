'use client';

import { ApexOptions } from 'apexcharts';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface ChartProps {
  series: ApexOptions['series'];
  height?: number;
}

export const Chart = ({ series, height = 600 }: ChartProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  const updateWidth = () => {
    if (divRef.current) {
      const chartWidth = divRef.current.getBoundingClientRect().width;
      setWidth(chartWidth);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

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

  return (
    <div className="w-full" ref={divRef}>
      <ApexChart options={options} series={series} type="line" height={height} width={width} />
    </div>
  );
};
