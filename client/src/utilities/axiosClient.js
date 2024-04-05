import axios from 'axios';

export const axiosClient = axios.create({

    baseURL: 'http://localhost:9191/api',
    withCredentials: true,

});
