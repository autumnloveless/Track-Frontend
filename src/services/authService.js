import { user, isAuthenticated, accessToken } from "../store";

let _accessToken, _user;
accessToken.subscribe((a) => { _accessToken = a })
user.subscribe((u) => { _user = u })

const login = async (user) => {
    let response = await fetch('http://localhost:3300/api/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user) // body data type must match "Content-Type" header
    });
    response = await response.json()
    if(response.success && response.accessToken){
        accessToken.set(response.accessToken)
    }
    return response;
}

const logout = async (user) => {

}

const refreshToken = async () => {
    let response = await fetch('http://localhost:3300/api/token', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
    });
    response = await response.json()
    if(response.success && response.accessToken){
        accessToken.set(response.accessToken)
    }
    return response;
}

const register = async(user) => {
    // Default options are marked with *
    const response = await fetch('http://localhost:3300/api/register', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
}

const getUser = async() => {

    let response = await fetch('http://localhost:3300/api/users/d32a7ce7-a025-4eb4-a48e-a13531036a62', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Authorization': 'Bearer ' + _accessToken },
    });

    response = await response.json()
    if(response.success && response.user){
        user.set(response.user)
    }
    return response; // parses JSON response into native JavaScript objects
}

export { login, register, logout, refreshToken, getUser };