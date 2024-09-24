import { getParamAsArray } from '@utils';
import { ConsultService } from './ConsultService';

export const consult = async (type: string, params: URLSearchParams) => {
  const parameters = {
    initialYear: Number(params.get('initialYear')),
    finalYear: Number(params.get('finalYear')),
    dimension: Number(params.get('dimension')),
    unidadesEleitoraisIds: getParamAsArray(params, 'unidadesEleitoraisIds'),
    isElected: Number(params.get('isElected')),
    partidos: getParamAsArray(params, 'partidos'),
    categoriasOcupacoes: getParamAsArray(params, 'categoriasOcupacoes'),
    cargosIds: getParamAsArray(params, 'cargosIds'),
  };

  switch (type) {
    case 'ElectionResult':
      return ConsultService.consultElections(parameters);
    case 'Financing':
      return ConsultService.consultFinance(parameters);
    default:
      return ConsultService.consultCandidateProfile(parameters);
  }
};
