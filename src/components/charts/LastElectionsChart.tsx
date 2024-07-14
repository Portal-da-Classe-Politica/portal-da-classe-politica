import { CandidateService } from '@services/candidates/CandidateService';

import { BarChartCard } from './BarChartCard';

export const LastElectionsChart = async ({ title, candidateId }: { title?: string; candidateId: string }) => {
  const elections = await CandidateService.getCandidateLastFiveElectionVotes(candidateId);
  const categories = elections.map(e => String(e.ano_eleicao ?? ''));
  const data = elections.map(e => e.total_votos ?? 0);

  const metaData = [
    { value: '+35%', label: 'consectetur adipis' },
    { value: '+17%', label: 'ipsum sectetur adipis' },
    { value: '+12%', label: 'ipsum sectetur adipis' },
  ];

  return (
    <BarChartCard
      title={title}
      categories={categories}
      series={[{ name: 'votos', data }]}
      metaData={metaData}
    />
  );
};
