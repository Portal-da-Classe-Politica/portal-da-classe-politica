import { BASE_PATH } from '@services/redem/base';
import axios from 'axios';

export interface EmailBodyData {
  nome: string;
  email: string;
  mensagem: string;
  assunto: string;
}

export const sendEmail = async (data: EmailBodyData): Promise<void> => {
  try {
    const url = `${BASE_PATH}/noauth/send-email`;

    console.info('sendEmail - url', url);
    console.info('sendEmail - data', data);

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.info('sendEmail - response', response);

    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching send-email data:', error.message);
    } else {
      console.error('Unexpected error fetching send-email data:', error);
    }
    throw new Error('Failed to fetch graph data. Please try again later.');
  }
};
