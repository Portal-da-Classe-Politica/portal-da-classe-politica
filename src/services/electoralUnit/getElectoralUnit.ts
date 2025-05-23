import { logError } from '@utils';
import { redem } from '../redem';

export const getElectoralUnit = async (id: string, uf: string) => {
  try {
    const response = await redem.electoralUnit.getElectoralUnit(Number(id), uf);
    const transformedData = response?.data?.data?.map(value => {
      return {
        value: String(value.id),
        label: value.nome,
      };
    });

    return transformedData || [];
  } catch (error) {
    logError('Failed to getElectoralUnit', error as Error);
    return [];
  }
};
