export const parseKpisResult = async (redemApiCall: any) => {
  const response = await redemApiCall();

  return {
    data: {
      success: true,
      type: 'kpi',
      data: {
        title: response?.data?.title,
        extraData: response?.data?.data ?? [],
      },
      message: response?.data?.message,
    },
  };
};
