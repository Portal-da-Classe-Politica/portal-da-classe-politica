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
  series: ApexOptions['series'];
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
    grid: {
      show: false,
      padding: {
        left: 20,
      },
    },
    colors: ['#F3A28B', '#ED7451', '#EB582F', '#CC3A10', '#A82D0A', '#6B1A02', '#000000'],
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
        offsetY: -5,
        offsetX: -10,
        align: 'center',
        style: {
          fontSize: 'medium',
        },
      },
    },
  };

  return (
    <div
      className={`flex flex-col w-full max-h-[800px] p-3 md:p-12 bg-white drop-shadow-lg rounded-lg ${className}`}
    >
      <div className="w-full">
        <Heading headingLevel={2} className="text-grayMix4 my-4">
          {title}
        </Heading>
        <Chart series={series} type="bar" options={options} height={300} />
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
