import { user, accessToken } from "../store";
import jwt from "jwt-decode";
import { onDestroy } from 'svelte';

let _accessToken, _user;
let accessUnsubscribe = accessToken.subscribe((a) => { _accessToken = a })
let userUnsubscribe = user.subscribe((u) => { _user = u })

const checkAuth = async () => {
    if(!_accessToken) {
        return await refreshToken();
    }
    let decoded = jwt(_accessToken);
    let expired = Date.now() >= decoded.exp * 1000
    if (expired) { await refreshToken(); }
    return;
}

const login = async (user_login) => {
    let response = await fetch('http://localhost:3300/api/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user_login) // body data type must match "Content-Type" header
    });
    response = await response.json()
    if(!response.success) { return response.error }
    if(response.accessToken){ 
        _accessToken = response.accessToken;
        accessToken.set(response.accessToken) 
    }
    if(response.user) { 
        _user = response.user;
        user.set(response.user) 
    }
    return response;
}

const logout = async () => {
    await checkAuth();
    let response = await fetch('http://localhost:3300/api/logout', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Authorization': 'Bearer ' + _accessToken },
    });
    user.set({});
    _user = {};
    accessToken.set(null);
    _accessToken = null;

}

const refreshToken = async () => {
    let response = await fetch('http://localhost:3300/api/token', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
    });
    response = await response.json()
    if(response.success && response.accessToken){
        _accessToken = response.accessToken;
        accessToken.set(response.accessToken)
    }
    if(response.user) { 
        _user = response.user;
        user.set(response.user) 
    }
    return response;
}

const register = async(user_info) => {
    // Default options are marked with *
    let response = await fetch('http://localhost:3300/api/register', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user_info) // body data type must match "Content-Type" header
    });

    response = await response.json()
    if(!response.success) { return response.error }
    if(response.accessToken){ 
        _accessToken = response.accessToken;
        accessToken.set(response.accessToken) 
    }
    if(response.user) { 
        _user = response.user;
        user.set(response.user) 
    }
    return response;
}

const getUser = async() => {

    let response = await fetch('http://localhost:3300/api/users/d32a7ce7-a025-4eb4-a48e-a13531036a62', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Authorization': 'Bearer ' + _accessToken },
    });

    response = await response.json()
    if(response.success && response.user){
        _user = repsonse.user;
        user.set(response.user)
    }
    return response; // parses JSON response into native JavaScript objects
}

export { login, register, logout, refreshToken, getUser, checkAuth };