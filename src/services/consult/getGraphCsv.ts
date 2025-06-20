import { BASE_PATH } from '@services/redem/base';
import axios from 'axios';

export const getGraphCsv = async (filters: string): Promise<string> => {
  try {
    const url = `${BASE_PATH}/noauth/analises/generate-graph?${filters}&exportcsv=true`;

    const response = await axios.get(url, {
      responseType: 'text',
      headers: {
        Accept: 'text/csv',
      },
    });

    console.info('getGraphCsv - response', response);

    if (response.status !== 200) {
      throw new Error('Failed to fetch CSV data');
    }

    return response.data as string;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching CSV data:', error.message);
    } else {
      console.error('Unexpected error fetching CSV data:', error);
    }
    throw new Error('Failed to fetch CSV data. Please try again later.');
  }
};
