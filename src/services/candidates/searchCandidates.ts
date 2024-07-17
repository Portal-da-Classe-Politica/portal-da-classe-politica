import { redem } from '../redem';

export const searchCandidates = async (name = '', uf = '', page = '', electoralUnitId = '') => {
  try {
    const response = await redem.candidate.getCandidates(name, uf, undefined, electoralUnitId, Number(page));
    console.info('getCandidates', response?.data);

    return response?.data?.data || [];
  } catch (error) {
    console.error('Failed to getCandidates', error);
    return [];
  }
};
