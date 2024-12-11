import axios from 'axios';

export const fetchIssuesAPI = (page: number) => {
  return axios.get(`/api/issues?page=${page}`);
};
