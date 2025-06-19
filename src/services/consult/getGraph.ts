import { BASE_PATH } from '@services/redem/base';
import axios from 'axios';

export interface GraphData {
  title: string;
  type: string;
  extraData: ExtraDataGraph;
  indicator_detail: IndicatorDetail;
  series: Serie[];
  xAxis: number[];
}

export interface Serie {
  name: string;
  data: string[];
  color: string; // rgb(14, 11, 142)}
}
export interface IndicatorDetail {
  title: string;
  indicator_purpose: string;
  how_to_interpretate: string;
  unit: string;
  party_indicator: boolean;
  indicator_t1: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
}

export interface GraphDataResponse {
  details: Detail[];
  data: GraphData;
}

export interface Detail {
  title: string;
  text: string;
}

export interface ExtraDataGraph {
  generalLegend?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
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
