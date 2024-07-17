import { redem } from '../redem';

export const getAbrangency = async () => {
  try {
    const response = await redem.abrangency.getAbrangency();
    console.log('getAbrangency', response?.data);

    const transformedData = response?.data?.data?.map(value => {
      return {
        value: String(value.id),
        label: value.nome,
        description: value.descricao,
      };
    });

    return transformedData || [];
  } catch (error) {
    console.error('Failed to get Abrangency', error);
    return [];
  }
};
