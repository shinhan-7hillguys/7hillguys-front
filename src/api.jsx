import axios from 'axios';
import config from './config';

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl
   
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      
    }
    return Promise.reject(error);
  }
);
 
export const getDashboardData = async (statKey, period) => {
  const response = await axiosInstance.get('/dashboard', {
    params: { statKey, period },
  });
  return response.data;
};
 
export const getUserDetail = async (userId) => {
  const response = await axiosInstance.get(`/user/${userId}`);
  return response.data;
};
 
export const getStatCategories = async () => {
  const response = await axiosInstance.get('/stat-categories');
  return response.data;
};


export const getDataMap = async () => {
  const response = await axiosInstance.get('/data-map');
  return response.data;
};

export default axiosInstance;
