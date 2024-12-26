import {IIssueRequestDTO, IIssueSearchDto, IIssuesRequestDTO} from '@src/modules/issues/models';
import axiosInstance from '@src/api/axios-instance';

export const fetchIssuesAPI = (params: IIssuesRequestDTO) => {
  return axiosInstance.get(`/issues`, {
    params:{
      page: params.currentPage || 1,
      ...params
    }
  });
};

export const fetchIssueAPI = (dto: IIssueRequestDTO) => {
  return axiosInstance.get(`/issues/${dto.issueId}`, {
    params: dto
  });
}

export const fetchSearchIssuesAPI = (query: string, page: number) => {
  return axiosInstance.get<IIssueSearchDto>(`/issues/search`, {
    params: {
      page: page || 1,
      query,
    },
  });
};

