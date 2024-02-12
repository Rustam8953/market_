import axios from 'axios';
import { BACK_PATH } from '../utils/consts';

const $host = axios.create({
    baseURL: BACK_PATH
});

const $authHost = axios.create({
    baseURL: BACK_PATH
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}