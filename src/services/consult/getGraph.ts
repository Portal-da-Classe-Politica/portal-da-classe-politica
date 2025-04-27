import { BASE_PATH } from '@services/redem/base';
import axios from 'axios';

export interface GraphData {
  title: string;
  type: string;
  extraData: ExtraDataGraph[];
  series: { name: string; data: string[] }[];
  xAxis: number[];
}

export interface ExtraDataGraph {
  generalLegend: string;
  xAxisLabel: string;
  yAxisLabel: string;
}

export const getGraph = async (filters: string): Promise<GraphData> => {
  try {
    const url = `${BASE_PATH}/noauth/analises/generate-graph?${filters}`;

    const response = await axios.get(url);

    console.info('getGraph - response', response);

    if (response.status !== 200) {
      throw new Error('Failed to fetch graph data');
    }

    return response.data as GraphData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching graph data:', error.message);
    } else {
      console.error('Unexpected error fetching graph data:', error);
    }
    throw new Error('Failed to fetch graph data. Please try again later.');
  }
};
