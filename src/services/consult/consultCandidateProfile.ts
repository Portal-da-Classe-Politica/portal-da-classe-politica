import { logError } from '@utils/logError';
import { redem } from '../redem';
import { AxiosError } from 'axios';

export const consultCandidateProfile = async ({
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
  console.log('consultCandidateProfile', {
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
      redem.consult.getCandidateProfileByGender(
        Number(initialYear),
        Number(finalYear),
        dimension,
        unidadesEleitoraisIds,
        isElected,
        partidos,
        categoriasOcupacoes,
        cargosIds,
      ),
      redem.consult.getCandidateProfileByOccupation(
        Number(initialYear),
        Number(finalYear),
        dimension,
        unidadesEleitoraisIds,
        isElected,
        partidos,
        categoriasOcupacoes,
        cargosIds,
      ),
      redem.consult.getCandidateProfileByYear(
        Number(initialYear),
        Number(finalYear),
        dimension,
        unidadesEleitoraisIds,
        isElected,
        partidos,
        categoriasOcupacoes,
        cargosIds,
      ),
      redem.consult.getCandidateProfileKpis(
        Number(initialYear),
        Number(finalYear),
        unidadesEleitoraisIds,
        isElected,
        partidos,
        categoriasOcupacoes,
        cargosIds,
      ),
    ]);

    const result = [];
    for (const resp of responses) {
      if (resp.status === 'fulfilled') {
        result.push(resp.value.data);
      } else {
        logError('Failed to candidateProfile', resp.reason as AxiosError);
        result.push(resp.reason?.response?.data || { success: false });
      }
    }

    return result;
  } catch (error) {
    logError('Failed to candidateProfile', error as Error);
    return {};
  }
};
