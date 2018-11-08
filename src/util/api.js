import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

axios.defaults.baseURL = publicRuntimeConfig.apiHost
    ? publicRuntimeConfig.apiHost : axios.defaults.baseURL;

export default axios;
