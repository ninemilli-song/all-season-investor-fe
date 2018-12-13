import decode from 'jwt-decode';
import axios from './api';

// jwt token localStorage中的key值
const JWT_TOKEN_KEY = 'asi_jwt_token';

function setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
}

function getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
}

function setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem(JWT_TOKEN_KEY, idToken);
}

function getToken() {
    // Retrieves the user token from localStorage
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(JWT_TOKEN_KEY);
    }
    return '';
}

async function login(username, password) {
    console.log('AuthService -> login: ', axios);
    const res = await axios.post('auth/login/', {
        username,
        password
    });

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
        return false;
    }
}

function loggedIn() {
    // Checks if there is a saved token and it's still valid
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
    isTokenExpired,
    loggedIn,
    logout
};
