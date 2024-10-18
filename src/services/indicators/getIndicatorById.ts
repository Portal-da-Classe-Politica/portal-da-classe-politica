import { redem } from '@services/redem';

export interface IndicatorParams {
  initialYear: number;
  finalYear: number;
  cargoId: number;
  unidadesEleitorais?: string[];
}

const indicatorsMap = {
  '5': redem.indicators.getPartyIndicator05,
  '6': redem.indicators.getPartyIndicator06,
  '8': redem.indicators.getPartyIndicator08,

  '13': redem.indicators.getFinanceIndicator13,
  '14': redem.indicators.getFinanceIndicator14,
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
