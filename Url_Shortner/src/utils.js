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
  baseURL: 'http://localhost:1000/',
  withCredentials: true,
});

export default axiosInstance;