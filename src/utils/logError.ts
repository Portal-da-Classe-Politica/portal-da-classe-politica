import { AxiosError } from 'axios';

export const logError = (msg: string, error: AxiosError | Error) => {
  if (error instanceof AxiosError) {
    console.error(msg, {
      response: {
        status: error?.response?.status,
        data: error?.response?.data,
      },
      code: error?.code,
      message: error?.message,
      method: error?.config?.method,
      url: error?.config?.url,
      params: error?.config?.params,
      data: error?.config?.data,
      baseURL: error?.config?.baseURL,
    });
  } else {
    console.error(msg, error);
  }
};
