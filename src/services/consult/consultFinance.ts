import { logError } from '@utils/logError';
import { redem } from '../redem';
import { AxiosError } from 'axios';
import { parseByLocationResult } from './parseByLocationResult';
import { parseKpisResult } from './parseKpisResult';

export const consultFinance = async ({
  initialYear = 2020,
  finalYear = 2024,
  dimension = 0,
  unidadesEleitoraisIds = undefined,
  isElected = undefined,
  partidos = undefined,
  categoriasOcupacoes = undefined,
  cargosIds = undefined,
  round = undefined,
}: {
  initialYear?: number;
  finalYear?: number;
  dimension?: number;
  unidadesEleitoraisIds?: string[];
  isElected?: number;
  partidos?: string[];
  categoriasOcupacoes?: string[];
  cargosIds?: string[];
  round?: number;
}) => {
  console.info('consultFinance', {
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
      parseKpisResult(() =>
        redem.consult.getFinanceKpis(
          Number(initialYear),
          Number(finalYear),
          unidadesEleitoraisIds,
          isElected,
          round,
          partidos,
          categoriasOcupacoes,
          cargosIds,
          dimension,
        ),
      ),
      redem.consult.getFinanceByParty(
        Number(initialYear),
        Number(finalYear),
        unidadesEleitoraisIds,
        isElected,
        round,
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
        round,
        partidos,
        categoriasOcupacoes,
        cargosIds,
        dimension,
      ),
      parseByLocationResult(
        () =>
          redem.consult.getFinanceByLocation(
            Number(initialYear),
            Number(finalYear),
            unidadesEleitoraisIds,
            isElected,
            round,
            partidos,
            categoriasOcupacoes,
            cargosIds,
            dimension,
          ),
        'Distribuição Financiamento',
        {
          sigla_unidade_federacao: 'uf',
          total_doacoes: 'value',
        },
        'Total de Doações',
      ),
    ]);

    const result = [];
    for (const resp of responses) {
      if (resp.status === 'fulfilled') {
        result.push({ ...resp.value.data, request: resp.value?.request?.path });
      } else {
        logError('Failed to consultFinance', resp.reason as AxiosError);
        const data = resp.reason?.response?.data || { success: false };
        result.push({ ...data, request: resp.reason?.request?.path });
      }
    }

    return result;
  } catch (error) {
    logError('Failed to consultFinance', error as Error);
    return {};
  }
};
