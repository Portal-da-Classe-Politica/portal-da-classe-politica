export const formatCurrency = (number: number | string, locale = 'pt-BR', currency = 'BRL') => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(Number(number));
};
