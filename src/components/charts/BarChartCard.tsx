'use client';

import { ApexOptions } from 'apexcharts';
import { Heading } from '@base/Heading';

import { Chart } from './Chart';

const colors = [
  '#1A2F5E',
  '#1A2F5E',
  '#1A2F5E',
  '#376385',
  '#376385',
  '#417496',
  '#417496',
  '#12167F',
  '#12167F',
  '#376385',
  '#376385',
  '#0B0496',
  '#0C0793',
  '#0C0793',
  '#A20608',
  '#DF3440',
  '#DF3440',
  '#9B0101',
  '#BE4954',
  '#0A009D',
  '#0A009D',
  '#0A009D',
  '#0A009D',
  '#0A009D',
  '#203A5C',
  '#305678',
  '#1C3457',
  '#1C3457',
  '#1C3457',
  '#1C3457',
  '#12187C',
  '#12187C',
  '#1C3359',
  '#1B315B',
  '#D7612E',
  '#0F0E89',
  '#2A4C6E',
  '#2F5577',
  '#CA242C',
  '#9A0000',
  '#EF611D',
  '#182966',
  '#182966',
  '#A53179',
  '#CE583C',
  '#101185',
  '#101185',
  '#46789D',
  '#0E0B8E',
  '#0E0B8E',
  '#0E0B8E',
  '#0E0B8E',
  '#D62D38',
];

export const BarChartCard = ({
  title = '',
  categories,
  series,
  metaData = [],
  className = '',
}: {
  title?: string;
  categories: string[];
  series: { name: string; data: any[] }[];
  metaData: { value: string | number; label: string }[];
  className?: string;
}) => {
  const options: ApexOptions = {
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#FFF'],
        fontSize: '12px',
        fontWeight: 'bold',
      },
      background: {
        enabled: true,
        foreColor: '#000',
        borderRadius: 2,
        padding: 4,
        opacity: 0.7,
        borderWidth: 1,
        borderColor: '#FFF',
      },
      offsetX: 45,
      formatter: value => value.toLocaleString('pt-BR'),
    },
    grid: {
      show: false,
      padding: {
        left: 20,
      },
    },
    colors,
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        offsetX: -10,
        align: 'left',
        style: {
          fontSize: 'medium',
        },
        formatter: value => value.toLocaleString('pt-BR'),
      },
    },
  };
  const height = Math.max(300, (series[0].data?.length || 10) * 40);

  return (
    <div className={`w-full ${className}`}>
      <Heading headingLevel={2} className="text-grayMix4 mb-4">
        {title}
      </Heading>
      <Chart series={series} type="bar" options={options} height={height} />
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {metaData.map(({ value, label }, idx) => (
          <div key={idx} className="flex flex-col">
            <Heading headingLevel={3} size="H3" className="font-bold">
              {value}
            </Heading>
            <Heading headingLevel={6} size="H6" className="font-bold">
              {label}
            </Heading>
          </div>
        ))}
      </div>
    </div>
  );
};
