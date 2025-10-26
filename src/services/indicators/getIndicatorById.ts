import { BASE_PATH } from '@services/redem/base';
import axios from 'axios';

export interface IndicatorParams {
  initialYear: number;
  finalYear: number;
  cargoId: number;
  unidadesEleitorais?: number[];
  uf?: string;
  partyId?: string;
  round?: number;
}

const apiMap = new Map([
  ['1', '/noauth/indicadores/eleitorais/1'],
  ['2', '/noauth/indicadores/eleitorais/2'],
  ['3', '/noauth/indicadores/eleitorais/3'],
  ['12', '/noauth/indicadores/eleitorais/12'],
  ['5', '/noauth/indicadores/partidarios/5'],
  ['6', '/noauth/indicadores/partidarios/6'],
  // ['7', '/noauth/indicadores/partidarios/7'],
  ['8', '/noauth/indicadores/partidarios/8'],
  // ['9', '/noauth/indicadores/geograficos/9'],
  ['10', '/noauth/indicadores/geograficos/10'],
  ['11', '/noauth/indicadores/geograficos/11'],
  // ['13', '/noauth/indicadores/financeiros/13'],
  ['14', '/noauth/indicadores/financeiros/14'],
  ['15', '/noauth/indicadores/financeiros/15'],
  ['16', '/noauth/indicadores/financeiros/16'],
]);

export const getIndicatorById = async (id: string, params: IndicatorParams) => {
  try {
    const path = apiMap.get(id);

    if (!path) {
      return { success: false, data: null, message: 'Invalid Indicator' };
    }

    let url = `${BASE_PATH}${path}`;

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

    if (params.uf !== undefined) {
      url = `${url}&uf=${params.uf}`;
    }

    if (params.partyId !== undefined) {
      url = `${url}&partyId=${params.partyId}`;
    }

    if (params.round !== undefined) {
      url = `${url}&round=${params.round}`;
    }

    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error('Failed to fetch indicator data');
    }

    const data = response.data;

    const details = [
      {
        title: 'Para que serve este Indicador?',
        text: data.data?.indicator_detail?.indicator_purpose,
      },
      {
        title: 'Como Interpretar?',
        text: data.data?.indicator_detail?.how_to_interpretate,
      },
    ].filter(d => d.text && d.title);

    const parsed = { ...data, details };
    return { path, data: parsed };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching indicator data:', error.message);
    } else {
      console.error('Unexpected error fetching indicator data:', error);
    }
    throw new Error('Failed to fetch indicator data. Please try again later.');
  }
};
