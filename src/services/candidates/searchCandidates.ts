import { redem } from '../redem';

export const searchCandidates = async (name = '', uf = '', page = '', electoralUnitId = '') => {
  try {
    console.log('meus dados', name, uf, page);
    const response = await redem.candidate.getCandidates(name, uf, undefined, electoralUnitId, Number(page));
    console.log('My responseee', response);
    return response?.data?.data || [];
  } catch (error) {
    console.error('Failed to search Candidate', error);
    return [];
  }
};
