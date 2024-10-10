import { getParamAsArray } from '@utils/getParamAsArray';

export const parseIndicatorParameters = (params: URLSearchParams) => {
  return {
    initialYear: Number(params.get('initialYear')),
    finalYear: Number(params.get('finalYear')),
    cargoId: Number(params.get('cargoId')),
    unidadesEleitorais: getParamAsArray(params, 'unidadesEleitorais'),
  };
};
