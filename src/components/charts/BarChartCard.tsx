import { ApexOptions } from 'apexcharts';
import { Heading } from '@base/Heading';

import { Chart } from './Chart';

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
        borderRadius: 10,
        horizontal: true,
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000'],
        fontSize: '12px',
        fontWeight: 'bold',
      },
    },
    grid: {
      show: false,
      padding: {
        left: 20,
      },
    },
    colors: ['#ee4f21', '#d6471d', '#be3f1a', '#a63717', '#8e2f13', '#772710'],
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
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
      },
    },
  };
  const height = Math.max(300, (series[0].data?.length || 10) * 40);

  return (
    <div
      className={`flex flex-col w-full min-h-[300px] p-4 md:p-12 bg-white drop-shadow-lg rounded-lg ${className}`}
    >
      <div className="w-full">
        <Heading headingLevel={2} className="text-grayMix4 my-4">
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
    </div>
  );
};
