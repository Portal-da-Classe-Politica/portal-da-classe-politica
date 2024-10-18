export const validateIndicatorParameters = (params: any) => {
  if (isNaN(params?.initialYear)) {
    return { valid: false, error: 'Initial year is required' };
  }

  if (isNaN(params?.finalYear)) {
    return { valid: false, error: 'Final year is required' };
  }

  if (isNaN(params?.cargoId)) {
    return { valid: false, error: 'Cargo ID is required' };
  }

  if (!Array.isArray(params?.unidadesEleitorais)) {
    return { valid: false, error: 'Unidade Eleitoral is required' };
  }

  if (params.unidadesEleitorais.length && params.unidadesEleitorais.length !== 1) {
    return { valid: false, error: 'Only one unidade eleitoral can be queired.' };
  }

  if (params.unidadesEleitorais.length && isNaN(params.unidadesEleitorais[0])) {
    return { valid: false, error: 'Unidade eleitoral is invalid.' };
  }

  return { valid: true, error: null };
};
