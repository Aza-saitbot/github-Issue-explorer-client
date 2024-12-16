import {IIssuesRequestDTO} from '@src/modules/issues/models';
import axios from 'axios';

export const fetchIssuesAPI = (dto:IIssuesRequestDTO) => {
  // return axiosInstance.get(`/api/issues?user=${dto.userName}&repo=${dto.repoName}`);
  return axios.get(`https://api.github.com/repos/${dto.userName}/${dto.repoName}/issues`, {
    params: {
      page: dto.page,
      per_page: dto.perPage
    }
  });
};
