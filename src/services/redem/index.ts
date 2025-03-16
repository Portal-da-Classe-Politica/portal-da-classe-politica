import axios from 'axios';

import { Constants } from '@constants';
import { Configuration } from './configuration';
import { AbrangencyApi, CandidateApi, ConsultApi, ElectoralUnitApi, IndicatorsApi } from './api';

const axiosInstance = axios.create({
  baseURL: Constants.api.baseURL,
  timeout: 30_000,
});

const config = new Configuration({ basePath: Constants.api.baseURL });

export const redem = {
  abrangency: new AbrangencyApi(config, Constants.api.baseURL, axiosInstance),
  candidate: new CandidateApi(config, Constants.api.baseURL, axiosInstance),
  electoralUnit: new ElectoralUnitApi(config, Constants.api.baseURL, axiosInstance),
  consult: new ConsultApi(config, Constants.api.baseURL, axiosInstance),
  indicators: new IndicatorsApi(config, Constants.api.baseURL, axiosInstance),
};
