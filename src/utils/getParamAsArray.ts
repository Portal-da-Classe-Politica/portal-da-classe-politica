export const getParamAsArray = (params: URLSearchParams, key: string, delimiter = ',') => {
  return (params.get(key) ?? '')?.split(delimiter);
};
