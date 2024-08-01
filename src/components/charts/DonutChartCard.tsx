import { ApexOptions } from 'apexcharts';
import { Heading } from '@base/Heading';

import { Chart } from './Chart';
import { Text } from '@base/text';

export const DonutChartCard = ({
  title = '',
  labels,
  series,
  topics = [],
  className = '',
}: {
  title?: string;
  labels: string[];
  series: ApexOptions['series'];
  topics: string[];
  className?: string;
}) => {
  const options: ApexOptions = {
    plotOptions: {
      bar: {
        borderRadius: 10,
        barHeight: '50px',
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
    labels: labels,
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div
      className={`flex flex-col w-full max-h-[800px] p-12 bg-white drop-shadow-lg rounded-lg ${className}`}
    >
      <div className="flex w-full">
        <Chart className="flex flex-1 w-fit" series={series} type="donut" options={options} height={350} />
        <div className="flex flex-col flex-1">
          <Heading headingLevel={2} size="H2" className="text-grayMix4 my-4 font-bold">
            {title}
          </Heading>
          <ul className="list-disc pl-4 marker:text-orange">
            {topics.map((topic, idx) => (
              <li key={idx} className="list-item my-4">
                <Text className="text-grayMix4">{topic}</Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
