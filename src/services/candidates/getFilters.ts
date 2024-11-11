import { logError } from '@utils';
import { redem } from '../redem';

export const getFilters = async () => {
  try {
    const response = await redem.consult.getCandidateFilters('');
    return {
      estados: filterToOptions(response.data.data?.estado?.values || [], 'sigla_unidade_federacao', 'nome'),
      cargos: filterToOptions(response.data.data?.cargo?.values || [], 'id', 'nome_cargo'),
    };
  } catch (error) {
    logError('Failed to getFilters', error as Error);
    return { estados: [], cargos: [] };
  }
};

const filterToOptions = (filter: any, valueKey: string, labelKey: string) => {
  return filter.map((e: any) => ({
    value: String(e[valueKey as keyof typeof e]),
    label: String(e[labelKey as keyof typeof e]),
  }));
};
