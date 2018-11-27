import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

axios.defaults.baseURL = publicRuntimeConfig.apiHost
    ? publicRuntimeConfig.apiHost : axios.defaults.baseURL;

/**
 * 添加响应拦截器，处理返回请求异常
 */
axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.error('🧨 response error ------> ', error.response);
    Promise.reject(error.response);
});

export default axios;
