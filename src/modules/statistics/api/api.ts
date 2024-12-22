import axiosInstance from '@src/api/axios-instance';
import {IStatisticDto} from '@src/modules/statistics/models';

export const fetchStatisticsAPI = () => {
  return axiosInstance.get<Array<IStatisticDto>>('/api/statistics');
}