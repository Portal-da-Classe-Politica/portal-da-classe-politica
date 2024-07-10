import { redem } from '../redem';

export const getCandidateLastElectionVoteByRegion = async (id: string) => {
  try {
    const response = await redem.candidate.getCandidateLastElectionVoteByRegion(id);
    return response?.data?.data || [];
  } catch (error) {
    console.error('Failed to get Candidate Last Election By Region', error);
    return [];
  }
};
