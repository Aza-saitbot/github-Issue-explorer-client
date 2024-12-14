import axiosInstance from '@src/api/axios-instance';
import {IIssueRequestDTO} from '@src/modules/issues/models';

export const fetchIssuesAPI = (dto:IIssueRequestDTO) => {
  return axiosInstance.get(`/api/issues?user=${dto.userName}&repo=${dto.repoName}`);
};
