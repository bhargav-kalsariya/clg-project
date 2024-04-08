import axios from 'axios';
import { KEY_ACCESS_TOKEN, getToken } from './localStorageManager';

export const axiosClient = axios.create({

    baseURL: 'http://localhost:9191/api',
    withCredentials: true,

});

axiosClient.interceptors.request.use(

    (req) => {

        const accessToken = getToken(KEY_ACCESS_TOKEN);

        req.headers['Authorization'] = `Bearer ${accessToken}`;
        return req;

    }

)