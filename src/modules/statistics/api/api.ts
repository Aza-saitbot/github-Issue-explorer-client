import axiosInstance from '@src/api/axios-instance';
import {IStatisticDto, IStatisticsRequestDto} from '@src/modules/statistics/models';

export const fetchStatisticsAPI = (dto: IStatisticsRequestDto) => {
  return axiosInstance.get<Array<IStatisticDto>>('/logs', {
    params: {
      page: dto.page,
      limit: dto?.limit || 30
    }
  });
}