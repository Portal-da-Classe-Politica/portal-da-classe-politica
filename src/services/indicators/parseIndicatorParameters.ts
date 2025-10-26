import { Constants } from '@constants';

export const parseIndicatorParameters = (params: URLSearchParams) => {
  const electoralUnit = params.get('electoralUnit');
  const uf = params.get('uf') || '';
  const partyId = params.get('partyId') || '';
  const round = params.get('round');
  const unidadesEleitorais = uf === String(Constants.brazil) ? [] : [uf, electoralUnit];

  const result: any = {
    initialYear: Number(params.get('initialYear')),
    finalYear: Number(params.get('finalYear')),
    cargoId: Number(params.get('cargoId')),
    unidadesEleitorais: unidadesEleitorais
      .filter(n => Boolean(n))
      .map(n => Number(n))
      .filter(n => !isNaN(n)),
    uf,
    partyId,
  };

  // Adiciona o parâmetro round apenas se ele existir
  if (round) {
    result.round = Number(round);
  }

  return result;
};
