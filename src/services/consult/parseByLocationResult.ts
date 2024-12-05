/**
 * Backend returns the response in a different format from other consult endpoints.
 * This function parses the response into the standard format so it can be easier to work with in the frontend
 *
 * @param {function} redemApiCall
 * @param {string} title
 * @param {string} remap
 * @param {string} label
 * @return {*}
 */
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
