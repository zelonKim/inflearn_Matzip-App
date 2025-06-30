import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030', // 기본 URL을 지정해줌.
});

export default axiosInstance;
