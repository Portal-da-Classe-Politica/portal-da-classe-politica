import { logError } from '@utils/logError';
import { redem } from '../redem';

export const getAbrangency = async () => {
  try {
    const response = await redem.abrangency.getAbrangency();
    console.info('getAbrangency', response?.data);

    const transformedData = response?.data?.data?.map(value => {
      return {
        value: String(value.id),
        label: value.nome,
        description: value.descricao,
      };
    });

    return transformedData || [];
  } catch (error) {
    logError('Failed to getAbrangency', error as Error);
    return [];
  }
};
