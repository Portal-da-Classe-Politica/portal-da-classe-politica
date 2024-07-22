import { logError } from '@utils/logError';
import { redem } from '../redem';

export const getFilters = async () => {
  try {
    const response = await redem.consult.getCandidateFilters();
    const filterData = response?.data?.data;
    console.info('getFilters - filterData', filterData);

    if (!filterData) {
      throw new Error('Response is empty');
    }

    const filters = {
      dimenssions: toFilter(filterData?.possibilities, 'label', 'id'),
      anos: {
        type: 'date_years',
        values: filterData?.anos?.values,
      },
      sideFilters: {
        cargosIds: toFilter(filterData?.cargo, 'nome_cargo', 'id'),
        isElected: toFilter(filterData?.foiEleito, 'label', 'id'),
        genero: toFilter(filterData?.genero, 'nome_genero', 'id'),
        unidadesEleitoraisIds: toFilter(filterData?.estado, 'nome', 'id'),
        categoriasOcupacoes: toFilter(filterData?.categorias, 'nome', 'id'),
        partidos: toFilter(filterData?.partidos, 'nome_atual', 'id'),
      },
    };

    return filters;
  } catch (error) {
    logError('Failed to getFilters', error as Error);
    return [];
  }
};

const toFilter = (
  filter: { type?: string; values?: any[] } | undefined,
  labelKey: string,
  valueKey: string,
) => {
  return {
    type: filter?.type ?? 'select',
    values: filter?.values?.map(e => ({ value: e[valueKey], label: e[labelKey] })) || [],
  };
};
