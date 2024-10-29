export const parseByLocationResult = async (redemApiCall: any, title: string, remap: any, label: string) => {
  const response = await redemApiCall();

  if (Array.isArray(response.data.data)) {
    response.data.data = {
      type: 'map',
      title,
      label,
      series: response.data.data.map((item: any) => {
        return Object.entries(remap).reduce((r: any, [redemKey, ourKey]: any) => {
          r[ourKey] = item[redemKey];
          return r;
        }, {});
      }),
    };
  }

  return response;
};
