import { consult } from './consult';
import { consultCandidateProfile } from './consultCandidateProfile';
import { consultFinance } from './consultFinance';
import { consultElections } from './consultElections';
import { getFilters } from './getFilters';
import { getInitialFilters } from './getInitialFilters';
import { getFiltersByRole } from './getFiltersByRole';
import { getGraph } from './getGraph';

export const ConsultService = {
  consult,
  consultCandidateProfile,
  consultFinance,
  consultElections,
  getFilters,
  getInitialFilters,
  getFiltersByRole,
  getGraph,
};
