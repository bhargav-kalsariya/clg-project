import axios from 'axios';
import { KEY_ACCESS_TOKEN, getToken, removeToken, setToken } from './localStorageManager';
import { setLoading, showToast } from '../redux/Slices/userSlice';
import Store from '../redux/store';
import { TOAST_FAILURE, TOAST_SUCCESS } from '../App';


export const axiosClient = axios.create({

    baseURL: 'http://localhost:9191/api',
    withCredentials: true,

});

axiosClient.interceptors.request.use(

    (req) => {

        const accessToken = getToken(KEY_ACCESS_TOKEN);

        req.headers['Authorization'] = `Bearer ${accessToken}`;
        Store.dispatch(setLoading(true));

        return req;

    }

);

axiosClient.interceptors.response.use(

    async (res) => {

        Store.dispatch(setLoading(false));

        const response = res.data;

        if (response.status === 'success') {

            if (typeof response.result === 'string') {
                return Store.dispatch(showToast({
                    type: TOAST_SUCCESS,
                    message: res.data.result
                }));
            }

            return res;

        }

        Store.dispatch(showToast({
            type: TOAST_FAILURE,
            message: res.data.message
        }))

        if (response.statusCode === 401 && !res.config.url_retry) {

            res.config.url_retry = true;

            const result = await axios.create({

                withCredentials: true,

            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

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

    },
    async (error) => {

        Store.dispatch(setLoading(false));

        Store.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error.message
        }))

        return Promise.reject(error);
    }

);