import { logError } from '@utils';
import { redem } from '../redem';

export const getCandidateById = async (id: string) => {
  try {
    const response = await redem.candidate.getCandidate(id);
    console.info('getCandidateById', response.data);

    return response?.data?.data || null;
  } catch (error) {
    logError('Failed to getCandidateById', error as Error);
    return null;
  }
};
