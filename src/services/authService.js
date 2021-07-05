import { user, accessToken } from "../store";
import jwt from "jwt-decode";

let _accessToken, _user;
accessToken.subscribe((a) => { _accessToken = a })
user.subscribe((u) => { _user = u })

const checkAuth = async () => {
    if(!_accessToken) {
        return await refreshToken();
    }
    let decoded = jwt(_accessToken);
    let expired = Date.now() >= decoded.exp * 1000
    if (expired) { await refreshToken(); }
    return { accessToken: _accessToken, user: _user };
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

    let response = await fetch('http://localhost:3300/api/user', {
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