import { logError } from '@utils/logError';
import { redem } from '../redem';
import { AxiosError } from 'axios';
import { parseByLocationResult } from './parseByLocationResult';
import { parseKpisResult } from './parseKpisResult';

export const consultElections = async ({
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
  console.info('consultElections', {
    initialYear,
    finalYear,
    dimension,
    unidadesEleitoraisIds,
    isElected,
    partidos,
    categoriasOcupacoes,
    cargosIds,
    round,
  });

  try {
    const responses = await Promise.allSettled([
      parseKpisResult(() =>
        redem.consult.getElectionsKpis(
          Number(initialYear),
          Number(finalYear),
          dimension,
          unidadesEleitoraisIds,
          isElected,
          round,
          partidos,
          categoriasOcupacoes,
          cargosIds,
        ),
      ),
      redem.consult.getElectionsTopCandidates(
        Number(initialYear),
        Number(finalYear),
        dimension,
        unidadesEleitoraisIds,
        isElected,
        round,
        partidos,
        categoriasOcupacoes,
        cargosIds,
      ),
      redem.consult.getElectionsCompetitionByYear(
        Number(initialYear),
        Number(finalYear),
        dimension,
        unidadesEleitoraisIds,
        isElected,
        round,
        partidos,
        categoriasOcupacoes,
        cargosIds,
      ),
      parseByLocationResult(
        () =>
          redem.consult.getElectionsByLocation(
            Number(initialYear),
            Number(finalYear),
            dimension,
            unidadesEleitoraisIds,
            isElected,
            round,
            partidos,
            categoriasOcupacoes,
            cargosIds,
          ),
        'Distribuição Eleitoral',
        {
          sigla_unidade_federacao: 'uf',
          mediana: 'value',
        },
        'Votos',
      ),
    ]);

    const result = [];
    for (const resp of responses) {
      if (resp.status === 'fulfilled') {
        result.push({ ...resp.value.data, request: resp.value?.request?.path });
      } else {
        logError('Failed to consultElections', resp.reason as AxiosError);
        const data = resp.reason?.response?.data || { success: false };
        result.push({ ...data, request: resp.reason?.request?.path });
      }
    }

    return result;
  } catch (error) {
    logError('Failed to consultElections', error as Error);
    return {};
  }
};
