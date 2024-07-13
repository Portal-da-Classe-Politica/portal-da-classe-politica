import { redem } from '../redem';

export const getCandidateLastFiveElectionVotes = async (id: string) => {
  try {
    const response = await redem.candidate.getCandidateLastFiveElectionVotes(id);
    return response?.data?.data || [];
  } catch (error) {
    console.error('Failed to get Candidate Last Five Election Votes', error);
    return [];
  }
};