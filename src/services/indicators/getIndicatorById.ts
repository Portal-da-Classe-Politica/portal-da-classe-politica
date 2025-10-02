import { redem } from '@services/redem';

export interface IndicatorParams {
  initialYear: number;
  finalYear: number;
  cargoId: number;
  unidadesEleitorais?: number[];
  uf?: string;
  partyId?: string;
}

export const getIndicatorById = async (id: string, params: IndicatorParams) => {
  const indicatorsMap = {
    '1': redem.indicators.getElectoral01,
    '2': redem.indicators.getElectoral02,
    '3': redem.indicators.getElectoral03,
    '12': redem.indicators.getPartyIndicator12,

    '5': redem.indicators.getPartyIndicator05,
    '6': redem.indicators.getPartyIndicator06,
    // '7': redem.indicators.getPartyIndicator07,
    '8': redem.indicators.getPartyIndicator08,

    // '9': redem.indicators.getGeographical09,
    '10': redem.indicators.getGeographical10,
    '11': redem.indicators.getGeographical11,

    // '13': redem.indicators.getFinanceIndicator13,
    '14': redem.indicators.getFinanceIndicator14,
    '15': redem.indicators.getFinanceIndicator15,
    '16': redem.indicators.getFinanceIndicator16,
  } as Record<string, any>;

  if (!indicatorsMap[id]) {
    return { success: false, data: null, message: 'Invalid Indicator' };
  }

  const { request, data } = await indicatorsMap[id].call(
    redem.indicators,
    params.initialYear,
    params.finalYear,
    params.cargoId,
    params.unidadesEleitorais,
    params.uf,
    params.partyId,
  );

  const details = [
    {
      title: 'Para que serve este Indicador?',
      text: data.data?.indicator_detail?.indicator_purpose,
    },
    {
      title: 'Como Interpretar?',
      text: data.data?.indicator_detail?.how_to_interpretate,
    },
  ].filter(d => d.text && d.title);

  const parsed = { ...data, details };
  return { path: request.path, data: parsed };
};
