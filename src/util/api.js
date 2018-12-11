import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
// jwt token localStorage中的key值
export const JWT_TOKEN_KEY = 'asi_jwt_token';

axios.defaults.baseURL = publicRuntimeConfig.apiHost
    ? publicRuntimeConfig.apiHost : axios.defaults.baseURL;
/**
 * 允许跨域请求携带cookie信息
 * 原理： 设置 xhr.withCredentials = true
 */ 
axios.defaults.withCredentials = true;

/**
 * 读取jwt_token
 */
function getJwtToken() {
    let token = '';
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem(JWT_TOKEN_KEY);
        console.log('localStorage.getItem ------> ', token);
    }

    return token;
}

/**
 * 创建 axios 实例，server render import此文件总是返回新实例
 * 避免每次import时都会向全局对象中添加重复拦截器
 * Q: 会生成内存泄漏么？
 */
const instance = axios.create();

/**
 * Add Request interceptor
 */
instance.interceptors.request.use((config) => {
    // Add jwt token
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers.Authorization = `Bearer ${getJwtToken()}`;

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

/**
 * 添加响应拦截器，处理返回请求异常
 */
instance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    const response = error.response || {};
    let msg = '未知错误';
    if (response.status === 401 || response.status === 403) {
        msg = response.data.detail;
        console.log('🧨 异常 -----> ', msg);
        return null;
    } 
    
    // server render 的情况下Promise.reject，如果没有进行catch处理会导致服务端运行中断
    // 未捕获异常会导致程序退出 详见 nodejs unhandledRejection事件
    return Promise.reject(new Error(error.response));
});

export default instance;
