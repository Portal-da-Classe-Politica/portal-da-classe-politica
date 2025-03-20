import { logError } from '@utils';
import { redem } from '../redem';

export interface CandidateKpi {
  name: string;
  description: string;
  value: string | number;
  unity: string;
  trend?: 'up' | 'down';
}

export const getCandidateKpiById = async (id: string): Promise<CandidateKpi[]> => {
  try {
    const response = await redem.candidate.getCandidateKpis(id);
    console.info('getCandidateKpiById', response.data);

    return (response?.data?.data as CandidateKpi[]) || [];
  } catch (error) {
    logError('Failed to getCandidateKpiById', error as Error);
    return [];
  }
};
