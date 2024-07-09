import { redem } from '../redem';

export const searchCandidates = async (name = '', uf = '') => {
  try {
    const response = await redem.candidate.getCandidates(name, uf);
    return response?.data?.data?.results || [];
  } catch (error) {
    console.error('Failed to search Candidate', error);
    return [];
  }
};
