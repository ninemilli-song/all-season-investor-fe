import axios from 'axios';
import getConfig from 'next/config';
import AuthService from './AuthService';

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
 * 创建 axios 实例，server render import此文件总是返回新实例
 * 避免每次import时都会向全局对象中添加重复拦截器
 * Q: 会生成内存泄漏么？
 */
const instance = axios.create();
const auth = new AuthService();

/**
 * Add Request interceptor
 */
instance.interceptors.request.use((config) => {
    // Add jwt token
    config.headers.Accept = 'application/json, text/plain, */*';
    config.headers['Content-Type'] = 'application/json';
    
    // 如果jwt token存在则添加到请求头部
    // Authorization 如果设置为空 无论服务器校验设置是什么级别都会进行校验
    if (auth.loggedIn()) {
        config.headers.Authorization = `Bearer ${auth.getToken()}`;
    }

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
    console.log('🧨 异常 -----> ', response);
    let msg = '未知错误';
    if (response.status === 401 || response.status === 403) {
        msg = response.data.detail;
        return Promise.reject(new Error(msg));
    } 
    
    // server render 的情况下Promise.reject，如果没有进行catch处理会导致服务端运行中断
    // 未捕获异常会导致程序退出 详见 nodejs unhandledRejection事件
    return Promise.reject(error.response);
});

export default instance;
