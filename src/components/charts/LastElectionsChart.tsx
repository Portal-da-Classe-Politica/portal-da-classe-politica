import { CandidateService } from '@services/candidates/CandidateService';

import { GraphData } from '@services/consult/getGraph';
import BarChart from './BarChart';

export const LastElectionsChart = async ({ title, candidateId }: { title?: string; candidateId: string }) => {
  const elections = await CandidateService.getCandidateLastFiveElectionVotes(candidateId);

  const graphData: GraphData = {
    title: title ?? 'Últimas eleições',
    type: 'bar',
    seriesName: 'Votos',
    series: [
      ...elections.map(e => ({
        name: String(e.ano_eleicao ?? ''),
        value: String(e.total_votos ?? 0),
      })),
    ],
    xAxis: [],
  };

  return (
    <div className={`flex flex-col w-full p-4 md:p-12 bg-white drop-shadow-lg rounded-lg`}>
      <BarChart graphData={graphData} />
    </div>
  );
};
