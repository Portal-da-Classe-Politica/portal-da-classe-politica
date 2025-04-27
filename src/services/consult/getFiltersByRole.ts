import { BASE_PATH } from '@services/redem/base';
import axios from 'axios';

export interface FiltersByRoleData {
  filters: FilterByRole[];
  cross_criterias: CrossCriterias;
}

export interface FilterByRole {
  label: string;
  values: (string | number)[];
  could_chose_city?: boolean;
  type: string;
  required: boolean;
  parameter: 'uf' | 'initial_year' | 'final_year';
  max?: number;
}

export interface CrossCriterias {
  max: number;
  required: boolean;
  possibilities: CrossCriteriaPossibilitie[];
}

export interface CrossCriteriaPossibilitie {
  label: string;
  values: { id: number | null; label: string }[];
  selections?: { value: number | null; label: string }[]; // Gerado localmente
  parameter: string;
  required: boolean;
  type: string;
  max: number;
}

export const getFiltersByRole = async (role: string): Promise<FiltersByRoleData> => {
  try {
    const url = `${BASE_PATH}/noauth/analises/filters-by-role/${role}`;

    const response = await axios.get(url);

    console.info('getFiltersByRole - response', response);

    if (response.status !== 200) {
      throw new Error('Failed to fetch initial filters');
    }

    return response.data as FiltersByRoleData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching initial filters:', error.message);
    } else {
      console.error('Unexpected error fetching initial filters:', error);
    }
    throw new Error('Failed to fetch initial filters. Please try again later.');
  }
};
