import axios from 'axios';

export function setApiConfig(opts) {
    axios.defaults.baseURL = opts.baseURL ? opts.baseURL : axios.defaults.baseURL;
}

export default axios;
