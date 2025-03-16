import { CandidateService } from '@services/candidates/CandidateService';

import { BarChartCard } from './BarChartCard';

export const LastElectionsChart = async ({ title, candidateId }: { title?: string; candidateId: string }) => {
  const elections = await CandidateService.getCandidateLastFiveElectionVotes(candidateId);

  const categories = elections.map(e => String(e.ano_eleicao ?? ''));
  const data = elections.map(e => e.total_votos ?? 0);

  return (
    <div className={`flex flex-col w-full p-4 md:p-12 bg-white drop-shadow-lg rounded-lg`}>
      <BarChartCard title={title} categories={categories} series={[{ name: 'votos', data }]} metaData={[]} />
    </div>
  );
};
