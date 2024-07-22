import { logError } from '@utils/logError';
import { redem } from '../redem';

export const consultCandidateProfile = async ({
  initialYear,
  finalYear,
  dimension = undefined,
  unidadesEleitoraisIds = undefined,
  isElected = undefined,
  partidos = undefined,
  categoriasOcupacoes = undefined,
  cargosIds = undefined,
}: {
  initialYear: number;
  finalYear: number;
  dimension?: number;
  unidadesEleitoraisIds?: string[];
  isElected?: number;
  partidos?: string[];
  categoriasOcupacoes?: string[];
  cargosIds?: string[];
}) => {
  try {
    const result = await Promise.allSettled([
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

    return result;
  } catch (error) {
    logError('Failed to candidateProfile', error as Error);
    return {};
  }
};
