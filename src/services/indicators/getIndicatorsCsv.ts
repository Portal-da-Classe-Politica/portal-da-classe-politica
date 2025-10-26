import { BASE_PATH } from '@services/redem/base';
import axios from 'axios';
import { IndicatorParams } from './getIndicatorById';

const apiMap = new Map([
  ['1', '/noauth/indicadores/eleitorais/1'],
  ['2', '/noauth/indicadores/eleitorais/2'],
  ['3', '/noauth/indicadores/eleitorais/3'],
  ['4', '/noauth/indicadores/eleitorais/4'],
  ['12', '/noauth/indicadores/eleitorais/12'],
  ['5', '/noauth/indicadores/partidarios/5'],
  ['6', '/noauth/indicadores/partidarios/6'],
  ['7', '/noauth/indicadores/partidarios/7'],
  ['8', '/noauth/indicadores/partidarios/8'],
  ['9', '/noauth/indicadores/geograficos/9'],
  ['10', '/noauth/indicadores/geograficos/10'],
  ['11', '/noauth/indicadores/geograficos/11'],
  ['13', '/noauth/indicadores/financeiros/13'],
  ['14', '/noauth/indicadores/financeiros/14'],
  ['15', '/noauth/indicadores/financeiros/15'],
  ['16', '/noauth/indicadores/financeiros/16'],
]);

export const getindicatorsCsv = async (id: string, params: IndicatorParams): Promise<string> => {
  try {
    let url = `${BASE_PATH}${apiMap.get(id)}`;

    if (params.initialYear !== undefined) {
      url = `${url}?initialYear=${params.initialYear}`;
    }

    if (params.finalYear !== undefined) {
      url = `${url}&finalYear=${params.finalYear}`;
    }

    if (params.cargoId !== undefined) {
      url = `${url}&cargoId=${params.cargoId}`;
    }

    if (params.unidadesEleitorais) {
      url = `${url}&unidadesEleitorais=${params.unidadesEleitorais.join(',')}`;
    }

    if (params.round !== undefined) {
      url = `${url}&round=${params.round}`;
    }

    url = `${url}&exportcsv=true`;

    const response = await axios.get(url, {
      responseType: 'text',
      headers: {
        Accept: 'text/csv',
      },
    });

    console.info('getindicatorsCsv - response', response);

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
