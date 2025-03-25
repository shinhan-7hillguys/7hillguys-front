import axios from 'axios'; 

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL.replace(/"/g, '').trim(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  
});

console.log("BASE_URL:", process.env.REACT_APP_API_URL);
console.log("axiosInstance.defaults.baseURL:", axiosInstance.defaults.baseURL);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); 
    if (token) {
      console.log("token : " ,token);
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
