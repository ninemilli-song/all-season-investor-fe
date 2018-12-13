import decode from 'jwt-decode';
import axios, { JWT_TOKEN_KEY } from './api';

export const setProfile = (profile) => {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
};

export const getProfile = () => {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
};

export const setToken = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem(JWT_TOKEN_KEY, idToken);
};

export const getToken = () => {
    // Retrieves the user token from localStorage
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(JWT_TOKEN_KEY);
    }
    return '';
};

export const login = async (username, password) => {
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
};

export const isTokenExpired = (token) => {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};

export const loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = getToken();
    return !!token && !isTokenExpired(token); // handwaiving here
};

export const logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem('profile');
};
