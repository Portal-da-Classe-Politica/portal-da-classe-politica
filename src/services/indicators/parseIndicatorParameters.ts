import { Constants } from '@constants';

export const parseIndicatorParameters = (params: URLSearchParams) => {
  const electoralUnit = params.get('electoralUnit');
  const uf = params.get('uf');
  const unidadesEleitorais = uf === String(Constants.brazil) ? [] : [uf, electoralUnit];

  return {
    initialYear: Number(params.get('initialYear')),
    finalYear: Number(params.get('finalYear')),
    cargoId: Number(params.get('cargoId')),
    unidadesEleitorais: unidadesEleitorais.filter(n => Boolean(n)).map(n => Number(n)),
  };
};
