import { logError } from '@utils';
import { redem } from '../redem';

export const searchCandidates = async (
  name = '',
  uf = '',
  page = '',
  electoralUnitId = '',
  abrangencyId = '',
) => {
  try {
    const response = await redem.candidate.getCandidates(
      name,
      uf,
      abrangencyId,
      electoralUnitId,
      Number(page),
    );
    console.info('searchCandidates', response?.data);

    return response?.data?.data || [];
  } catch (error) {
    logError('Failed to searchCandidates', error as Error);
    return [];
  }
};
