import { ApexOptions } from 'apexcharts';

import { Heading } from '@base/Heading';
import { CandidateService } from '@services/candidates/CandidateService';

import { Chart } from './Chart';

export const LastElectionsChart = async ({ title, candidateId }: { title?: string; candidateId: string }) => {
  const elections = await CandidateService.getCandidateLastFiveElectionVotes(candidateId);
  const categories = elections.map(e => e.ano_eleicao);
  const data = elections.map(e => e.total_votos ?? 0);

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
        offsetY: -7,
        offsetX: -20,
        align: 'center',
        style: {
          fontSize: 'medium',
        },
      },
    },
  };

  const metaData = [
    { value: '+35%', label: 'consectetur adipis' },
    { value: '+17%', label: 'ipsum sectetur adipis' },
    { value: '+12%', label: 'ipsum sectetur adipis' },
  ];

  return (
    <div className="w-full">
      <Heading headingLevel={2} className="text-grayMix4 my-4">
        {title}
      </Heading>
      <Chart series={[{ name: 'votos', data: data }]} type="bar" options={options} height={300} />
      <div className="flex gap-8 mt-8">
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
