'use client';

import { ApexOptions } from 'apexcharts';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface ChartProps {
  series: ApexOptions['series'];
  type?: 'line' | 'bar' | 'donut';
  options?: ApexOptions;
  height?: number;
  className?: string;
}

export const Chart = ({ series, type = 'line', options = {}, height = 600, className = '' }: ChartProps) => {
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

  const defaultOptions: ApexOptions = {
    chart: {
      toolbar: {
        tools: {
          zoom: false,
          download: false,
        },
      },
    },
  };

  const _options = Object.assign(defaultOptions, options);

  return (
    <div className={`w-full ${className}`} ref={divRef}>
      <ApexChart options={_options} series={series} type={type} height={height} width={width} />
    </div>
  );
};
