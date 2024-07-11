'use client';

import { ApexOptions } from 'apexcharts';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface ChartProps {
  series: ApexOptions['series'];
  height?: number;
}

export const ChartBar = ({ series, height = 600 }: ChartProps) => {
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

  let options = {
    chart: {
      type: 'bar',
      height: 47,
    },
    plotOptions: {
      bar: {
        borderRadius: 20,
        borderRadiusApplication: 'around',
        barHeight: '41px',
        horizontal: true,
        colors: {
          ranges: [
            {
              from: 0,
              to: 255,
              color: '#EB582F',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['2020', '2022', '2024'],
    },
  };

  //ainda n ta 100% arrumar as cores e um jeito de fazer tudo ser dinamico

  return (
    <div className="w-full" ref={divRef}>
      <ApexChart options={options} series={series} type="bar" height={height} width={width} />
    </div>
  );
};
