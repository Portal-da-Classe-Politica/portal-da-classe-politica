import axios from 'axios';

import { Constants } from '@constants';
import { Configuration } from './configuration';
import { AbrangencyApi, CandidateApi, ConsultApi, ElectoralUnitApi } from './api';

const axiosInstance = axios.create({
  baseURL: Constants.api.baseURL,
  timeout: 30_000,
});

const config = new Configuration({ basePath: Constants.api.baseURL });

export const redem = {
  abrangency: new AbrangencyApi(config, '', axiosInstance),
  candidate: new CandidateApi(config, '', axiosInstance),
  electoralUnit: new ElectoralUnitApi(config, '', axiosInstance),
  consult: new ConsultApi(config, '', axiosInstance),
};
