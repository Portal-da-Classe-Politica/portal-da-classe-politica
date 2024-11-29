import { redem } from '@services/redem';
import { logError } from '@utils/logError';

export const getFilters = async (dimension: string) => {
  try {
    const response = await redem.consult.getCandidateFilters(dimension);
    const filterData = response?.data?.data;
    console.info('getFilters - filterData', filterData);

    if (!filterData) {
      throw new Error('Response is empty');
    }

    const filters = {
      dimensions: toFilter('Categorias', 'dimensions', filterData?.possibilities, 'label', 'id'),
      years: {
        title: 'Anos',
        key: 'years',
        type: 'date_years',
        values: filterData?.anos?.values,
      },
      sideFilters: [
        toFilter('Cargos', 'cargosIds', filterData?.cargo, 'nome_cargo', 'id'),
        toFilter('Eleito', 'isElected', filterData?.foiEleito, 'label', 'id'),
        toFilter('Genero', 'genero', filterData?.genero, 'nome_genero', 'id'),
        toFilter('Estado', 'unidadesEleitoraisIds', filterData?.estado, 'nome', 'id'),
        toFilter('Ocupação', 'categoriasOcupacoes', filterData?.categorias, 'nome', 'id'),
        toFilter('Partido', 'partidos', filterData?.partidos, 'sigla', 'id'),
      ],
    };

    return filters;
  } catch (error) {
    logError('Failed to getFilters', error as Error);
    return {
      dimensions: {
        title: 'Categorias',
        key: 'dimensions',
        type: 'select',
        values: [],
      },
      years: {
        title: 'Anos',
        key: 'years',
        type: 'date_years',
        values: [2020, 2021, 2022],
      },
      sideFilters: [],
    };
  }
};

const toFilter = (
  title: string,
  key: string,
  filter: { type?: string; values?: any[] } | undefined,
  labelKey: string,
  valueKey: string,
) => {
  return {
    title,
    key,
    type: filter?.type ?? 'select',
    values: filter?.values?.map(e => ({ value: e[valueKey], label: e[labelKey] })) || [],
  };
};
