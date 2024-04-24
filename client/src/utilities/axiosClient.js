import axios from 'axios';
import { KEY_ACCESS_TOKEN, getToken, removeToken, setToken } from './localStorageManager';

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

);

axiosClient.interceptors.response.use(

    async (res) => {

        const response = res.data;

        if (response.status === 'success') {

            return res;

        }

        if (response.statusCode === 401 && !res.config.url_retry) {

            const result = await axios.create({

                withCredentials: true,

            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

            console.log({ res: result.data });

            if (result.data.status === 'success') {

                const accessToken = result.data.result.accessToken;
                setToken(KEY_ACCESS_TOKEN, accessToken);
                res.config.headers['Authorization'] = `Bearer ${accessToken}`;

                return axios(res.config);

            } else {

                removeToken(KEY_ACCESS_TOKEN);
                window.location.replace('/login', '_self');

                return Promise.reject(result.data.message);

            }

        }

    }

);