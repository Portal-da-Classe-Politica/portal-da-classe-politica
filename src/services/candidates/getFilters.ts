import { logError } from '@utils';
import { redem } from '../redem';

export const getFilters = async () => {
  try {
    const response = await redem.candidate.getCandidateFilters();
    return {
      estados: filterToOptions(response.data.data?.estados || [], 'sigla_unidade_federacao', 'nome'),
      cargos: filterToOptions(response.data.data?.cargos || [], 'id', 'nome_cargo'),
    };
  } catch (error) {
    logError('Failed to getFilters', error as Error);
    return { estados: [], cargos: [] };
  }
};

const filterToOptions = (filter: { id?: number; nome?: string }[], valueKey: string, labelKey: string) => {
  return filter.map(e => ({
    value: String(e[valueKey as keyof typeof e]),
    label: String(e[labelKey as keyof typeof e]),
  }));
};
