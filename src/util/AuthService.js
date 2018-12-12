import decode from 'jwt-decode';
import axios, { JWT_TOKEN_KEY } from './api';

export default class AuthService {
    // constructor(domain) {
    //     // this.domain = domain || 'http://localhost:5000';
    //     // this.fetch = this.fetch.bind(this);
    //     // this.login = this.login.bind(this);
    //     // this.getProfile = this.getProfile.bind(this);
    // }
  
    login = async (username, password) => {
        const res = await axios.post('auth/login/', {
            username,
            password
        });

        const { token, user } = res;
        
        // Set token
        this.setToken(token);
        
        // Set profile
        this.setProfile(user);

        return res;
    }
  
    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }

    isTokenExpired = (token) => {
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

  
    setProfile = (profile) => {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile));
    }
  
    getProfile = () => {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {};
    }
  
    setToken = (idToken) => {
        // Saves user token to localStorage
        localStorage.setItem(JWT_TOKEN_KEY, idToken);
    }
  
    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem(JWT_TOKEN_KEY);
    }
  
    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem(JWT_TOKEN_KEY);
        localStorage.removeItem('profile');
    }
  
    _checkStatus = (response) => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response;
        } 
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}
