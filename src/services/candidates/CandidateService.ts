import { getCandidateById } from './getCandidateById';
import { getCandidateKpiById } from './getCandidateKpiById';
import { getCandidateLastElectionVoteByRegion } from './getCandidateLastElectionVoteByRegion';
import { getCandidateLastFiveElectionVotes } from './getCandidateLastFiveElectionVotes';
import { getFilters } from './getFilters';
import { searchCandidates } from './searchCandidates';

export const CandidateService = {
  getFilters,
  searchCandidates,
  getCandidateById,
  getCandidateKpiById,
  getCandidateLastElectionVoteByRegion,
  getCandidateLastFiveElectionVotes,
};
