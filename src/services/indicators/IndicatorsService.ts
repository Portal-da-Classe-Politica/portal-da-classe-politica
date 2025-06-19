import { getIndicatorById } from './getIndicatorById';
import { getindicatorsCsv } from './getIndicatorsCsv';
import { parseIndicatorFilters } from './parseIndicatorFilters';
import { parseIndicatorParameters } from './parseIndicatorParameters';

export const IndicatorsService = {
  getIndicatorById,
  parseIndicatorFilters,
  parseIndicatorParameters,
  getindicatorsCsv,
};
