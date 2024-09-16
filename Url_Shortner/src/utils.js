import { toast } from 'react-toastify';
import axios from 'axios';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    })
}


const axiosInstance = axios.create({
  baseURL: 'https://url-shortner-njw7.onrender.com',
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage or cookies
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the Authorization header
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
export default axiosInstance;
