import axios from 'axios'
import { toast } from 'react-toastify';

const API_URL = 'http://127.0.0.1:8000/api'

const instance = axios.create({
    baseURL: API_URL
})
instance.interceptors.response.use(function(response){
    return response
}, function (error) {
    if (error?.message == 'Network Error')
    {
        toast.error('Network error')
        return
    }
    if (error?.response?.status === 401)
    {
        toast.error('Session has been expired.')
        window.location = '/login'
        return
    }

    return Promise.reject(error)
});

export {API_URL}
export default instance