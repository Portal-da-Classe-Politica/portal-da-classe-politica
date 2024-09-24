import { logError } from '@utils/logError';
import { redem } from '../redem';
import { AxiosError } from 'axios';

export const consultFinance = async ({
  initialYear = 2020,
  finalYear = 2024,
  dimension = 0,
  unidadesEleitoraisIds = undefined,
  isElected = undefined,
  partidos = undefined,
  categoriasOcupacoes = undefined,
  cargosIds = undefined,
}: {
  initialYear?: number;
  finalYear?: number;
  dimension?: number;
  unidadesEleitoraisIds?: string[];
  isElected?: number;
  partidos?: string[];
  categoriasOcupacoes?: string[];
  cargosIds?: string[];
}) => {
  console.log('consultFinance', {
    initialYear,
    finalYear,
    dimension,
    unidadesEleitoraisIds,
    isElected,
    partidos,
    categoriasOcupacoes,
    cargosIds,
  });

  try {
    const responses = await Promise.allSettled([
      redem.consult.getFinanceByLocation(
        Number(initialYear),
        Number(finalYear),
        ['PR'],
        isElected,
        partidos,
        categoriasOcupacoes,
        cargosIds,
        dimension,
      ),
      redem.consult.getFinanceByParty(
        Number(initialYear),
        Number(finalYear),
        unidadesEleitoraisIds,
        isElected,
        partidos,
        categoriasOcupacoes,
        cargosIds,
        dimension,
      ),
      redem.consult.getFinanceByYear(
        Number(initialYear),
        Number(finalYear),
        unidadesEleitoraisIds,
        isElected,
        partidos,
        categoriasOcupacoes,
        cargosIds,
        dimension,
      ),
      redem.consult.getFinanceKpis(
        Number(initialYear),
        Number(finalYear),
        unidadesEleitoraisIds,
        isElected,
        partidos,
        categoriasOcupacoes,
        cargosIds,
        dimension,
      ),
    ]);

    const result = [];
    for (const resp of responses) {
      if (resp.status === 'fulfilled') {
        result.push(resp.value.data);
      } else {
        logError('Failed to consultFinance', resp.reason as AxiosError);
        result.push(resp.reason?.response?.data || { success: false });
      }
    }

    return result;
  } catch (error) {
    logError('Failed to consultFinance', error as Error);
    return {};
  }
};
