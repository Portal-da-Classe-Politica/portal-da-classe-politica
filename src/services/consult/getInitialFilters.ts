import { BASE_PATH } from '@services/redem/base';
import axios from 'axios';

export interface InitialFiltersData {
  possibilities: Dimension[];
}

export interface Dimension {
  label: string;
  parameter: string;
  value: string;
  cargos: Cargo[];
}

export interface Cargo {
  id: number;
  nome_cargo: string;
  abrangenciumId: number;
  has_second_round?: boolean;
}

export const getInitialFilters = async (): Promise<InitialFiltersData> => {
  try {
    const url = `${BASE_PATH}/noauth/analises/initial-filters`;

    const response = await axios.get(url);

    console.info('getInitialFilters - response', response);

    if (response.status !== 200) {
      throw new Error('Failed to fetch initial filters');
    }

    return response.data as InitialFiltersData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching initial filters:', error.message);
    } else {
      console.error('Unexpected error fetching initial filters:', error);
    }
    throw new Error('Failed to fetch initial filters. Please try again later.');
  }
};
