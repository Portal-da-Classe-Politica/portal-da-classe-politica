export const parseIndicatorFilters = (indicators: any) => {
  const result: {
    indicators: any[];
    jobs: any;
  } = {
    indicators: [],
    jobs: {},
  };

  for (const ind of indicators || []) {
    result.indicators.push({ value: ind.id, label: ind.nome });
    result.jobs[ind.id] = ind.cargos.map((c: any) => ({
      value: c.id,
      label: c.name,
      filterByUf: c.filter_by === 'UF' || c.agregacao_regional.includes('UF'),
      filterByCity: c.filter_by === 'MUNICIPIO',
      has_second_round: c.has_second_round,
    }));
  }

  return result;
};
