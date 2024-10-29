import { redem } from '@services/redem';

export interface IndicatorParams {
  initialYear: number;
  finalYear: number;
  cargoId: number;
  unidadesEleitorais?: string[];
}

const indicatorsMap = {
  '1': redem.indicators.getElectoral01,
  '2': redem.indicators.getElectoral02,
  '3': redem.indicators.getElectoral03,
  '4': redem.indicators.getElectoral04,

  '5': redem.indicators.getPartyIndicator05,
  '6': redem.indicators.getPartyIndicator06,
  '7': redem.indicators.getPartyIndicator07,
  '8': redem.indicators.getPartyIndicator08,

  '9': redem.indicators.getGeographical09,
  '10': redem.indicators.getGeographical10,
  '11': redem.indicators.getGeographical11,
  '12': redem.indicators.getGeographical12,

  '13': redem.indicators.getFinanceIndicator13,
  '14': redem.indicators.getFinanceIndicator14,
  '15': redem.indicators.getFinanceIndicator15,
  '16': redem.indicators.getFinanceIndicator16,
} as Record<string, any>;

export const getIndicatorById = async (id: string, params: IndicatorParams) => {
  if (!indicatorsMap[id]) {
    return { success: false, data: null, message: 'Invalid Indicator' };
  }

  const { data } = await indicatorsMap[id](
    params.initialYear,
    params.finalYear,
    params.cargoId,
    params.unidadesEleitorais,
  );

  return data;
};
