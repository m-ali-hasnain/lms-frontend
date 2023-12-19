import { reset } from '@/features/auth/authSlice';
import { flatErrorArray } from '@/utils';
import axios from 'axios'
import { toast } from 'react-toastify';
import store, { resetPersistedState } from '@/store/store';

const API_URL = 'http://127.0.0.1:8000/api'

const instance = axios.create({
    baseURL: API_URL
})

// Configuring Axios Base Instance
instance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      const token = localStorage.getItem('authDetails');
      if (token) {
        config.headers['Authorization'] = `JWT ${JSON.parse(token).access}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
);

instance.interceptors.response.use(function(response){
    return response
}, function (error) {
    const errorDetails = error?.response?.data
    const status = error?.response?.status
    if (status === 401)
    {
        
        localStorage.clear();
        store.dispatch(reset());
        toast.error('Session has been expired.')
        window.location = '/login'
        return
    }else{
      const details = flatErrorArray(errorDetails?.errors)
      details.map((e)=>toast.error(e))
    }
    return Promise.reject(error)
});

export {API_URL}
export default instance