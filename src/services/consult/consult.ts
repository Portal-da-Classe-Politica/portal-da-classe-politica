import { getParamAsArray } from '@utils';
import { consultCandidateProfile } from './consultCandidateProfile';

export const consult = async (consult: string, params: URLSearchParams) => {
  let result;
  switch (consult) {
    default:
      result = await consultCandidateProfile({
        initialYear: Number(params.get('initialYear')),
        finalYear: Number(params.get('finalYear')),
        dimension: Number(params.get('dimension')),
        unidadesEleitoraisIds: getParamAsArray(params, 'unidadesEleitoraisIds'),
        isElected: Number(params.get('isElected')),
        partidos: getParamAsArray(params, 'partidos'),
        categoriasOcupacoes: getParamAsArray(params, 'categoriasOcupacoes'),
        cargosIds: getParamAsArray(params, 'cargosIds'),
      });
  }
  return result;
};
