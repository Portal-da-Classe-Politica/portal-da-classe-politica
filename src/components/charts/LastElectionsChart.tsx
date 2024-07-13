import { Heading } from '@base/Heading';
import { CandidateService } from '@services/candidates/CandidateService';

import { Chart } from './Chart';

export const LastElectionsChart = async ({ title, candidateId }: { title?: string; candidateId: string }) => {
  const elections = await CandidateService.getCandidateLastFiveElectionVotes(candidateId);
  console.log(elections);

  return (
    <div className="w-full">
      <Heading headingLevel={2} className="text-grayMix4 my-4">
        {title}
      </Heading>
      <Chart series={[{ name: 'votos', data: [200, 300, 400, 300, 300] }]} type="bar" />;
    </div>
  );
};
