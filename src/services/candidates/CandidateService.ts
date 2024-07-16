import { getCandidateById } from './getCandidateById';
import { getCandidateLastElectionVoteByRegion } from './getCandidateLastElectionVoteByRegion';
import { getCandidateLastFiveElectionVotes } from './getCandidateLastFiveElectionVotes';
import { getFilters } from './getFilters';
import { searchCandidates } from './searchCandidates';

export const CandidateService = {
  getFilters,
  searchCandidates,
  getCandidateById,
  getCandidateLastElectionVoteByRegion,
  getCandidateLastFiveElectionVotes,
};
