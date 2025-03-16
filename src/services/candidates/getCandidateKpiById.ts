import { logError } from '@utils';
import { redem } from '../redem';

export const getCandidateKpiById = async (id: string) => {
  try {
    const response = await redem.candidate.getCandidateKpis(id);
    console.info('getCandidateKpiById', response.data);

    return response?.data?.data || null;
  } catch (error) {
    logError('Failed to getCandidateKpiById', error as Error);
    return null;
  }
};
