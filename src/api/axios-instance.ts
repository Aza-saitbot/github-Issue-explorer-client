import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL
console.log('baseURL',baseURL)
const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance
