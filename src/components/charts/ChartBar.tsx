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
    plotOptions: {
      bar: {
        borderRadius: 20,
        barHeight: '50%', // Adjust this percentage to reduce/increase spacing
        horizontal: true,
        distributed: true, // This ensures each bar gets a unique color
      },
    },
    colors: ['#F3A28B', '#ED7451', '#EB582F', '#CC3A10', '#A82D0A', '#6B1A02', '#000000'],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['2020', '2022', '2024', '2026', '2028'],
    },
  };

  //ainda n ta 100% arrumar as cores e um jeito de fazer tudo ser dinamico

  return (
    <div className="w-full" ref={divRef}>
      <ApexChart
        options={options}
        series={series}
        type="bar"
        borderRadiusApplication="around"
        height={height}
        width={width}
      />
    </div>
  );
};
