import { redem } from '../redem';

export const getFilters = async () => {
  try {
    const response = await redem.candidate.getCandidateFilters();
    console.log(response.data.data?.cargos);
    return {
      estados: filterToOptions(response.data.data?.estados || [], 'nome'),
      cargos: filterToOptions(response.data.data?.cargos || [], 'nome_cargo'),
    };
  } catch (error) {
    console.error('Failed to get Candidate Filters', error);
    return { estados: [], cargos: [] };
  }
};

const filterToOptions = (filter: { id?: number; nome?: string }[], valueKey: string) => {
  return filter.map(e => ({ value: String(e.id), label: String(e[valueKey as keyof typeof e]) }));
};
