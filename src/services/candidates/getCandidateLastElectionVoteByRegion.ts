import { logError } from '@utils';
import { redem } from '../redem';

export const getCandidateLastElectionVoteByRegion = async (id: string) => {
  try {
    const response = await redem.candidate.getCandidateLastElectionVoteByRegion(id);
    console.info('getCandidateLastElectionVoteByRegion', response?.data);

    return response?.data?.data || [];
  } catch (error) {
    logError('Failed to getCandidateLastElectionVoteByRegion', error as Error);
    return [];
  }
};
