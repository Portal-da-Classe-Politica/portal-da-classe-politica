/**
 * Backend returns the response in a different format from other consult endpoints.
 * This function parses the response into the standard format so it can be easier to work with in the frontend
 *
 * @param {function} redemApiCall
 * @return {*}
 */
export const parseKpisResult = async (redemApiCall: any) => {
  const response = await redemApiCall();

  return {
    data: {
      success: true,
      data: {
        type: 'kpi',
        title: response?.data?.title,
        extraData: response?.data?.data ?? [],
      },
      message: response?.data?.message,
    },
    request: response.request,
  };
};
