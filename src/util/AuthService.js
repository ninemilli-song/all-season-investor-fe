import decode from 'jwt-decode';
import axios from './api';

// jwt token localStorage中的key值
const JWT_TOKEN_KEY = 'asi_jwt_token';

let JWT_TOKEN = '';
let USER_PROFILE = '';

function setProfile(profile) {
    if (!profile) {
        return;
    }

    // Saves profile data to localStorage
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    USER_PROFILE = JSON.stringify(profile);
}

function getProfile() {
    // Retrieves the profile data from localStorage
    const profile = typeof localStorage !== 'undefined' ? localStorage.getItem('profile') : USER_PROFILE;

    let json;
    try {
        json = JSON.parse(profile);
    } catch (e) {
        json = {};
    }
    return json;
}

function setToken(idToken) {
    if (!idToken) {
        return;
    }

    // Saves user token to localStorage
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(JWT_TOKEN_KEY, idToken);
    }

    JWT_TOKEN = idToken;
}

function getToken() {
    // Retrieves the user token from localStorage
    // Server side have not localStorage. 
    // When run this code in server side there will throw localStorage not defined error
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(JWT_TOKEN_KEY);
    }
    return JWT_TOKEN;
}

async function login(username, password) {
    console.log('AuthService -> login: ', axios);
    const res = await axios.post('auth/login/', {
        name: username,
        password
    });

    const { token, data } = res;
    
    // Set token
    setToken(token);
    
    // Set profile
    setProfile(data);

    return res;
}

/**
 * 用户注册
 * @param params
 * @returns {Promise<any>}
 */
async function signup(params) {
    const res = await axios.post('auth/signup/', params);

    const { token, user } = res;

    // Set token
    setToken(token);

    // Set profile
    setProfile(user);

    return res;
}

function isTokenExpired(token) {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
            return true;
        }
        return false;
    } catch (err) {
        return true;
    }
}

/**
 * Checks if there is a saved token and it's still valid
 */
function loggedIn() {
    const token = getToken();

    return !!token && !isTokenExpired(token); // handwaiving here
}

function logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem('profile');
}

export {
    JWT_TOKEN_KEY,
    setProfile,
    getProfile,
    setToken,
    getToken,
    login,
    signup,
    isTokenExpired,
    loggedIn,
    logout
};
