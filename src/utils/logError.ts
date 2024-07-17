import { AxiosError } from 'axios';

export const logError = (msg: string, error: AxiosError | Error) => {
  if (error instanceof AxiosError) {
    console.error(msg, {
      response: {
        status: error?.response?.status,
        data: error?.response?.data,
      },
      method: error?.config?.method,
      url: error?.config?.url,
      params: error?.config?.params,
      data: error?.config?.data,
    });
  } else {
    console.error(msg, error);
  }
};
