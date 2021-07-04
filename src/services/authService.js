import { user, isAuthenticated } from "../store";

const login = async (user) => {
    const response = await fetch('http://localhost:3300/api/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user) // body data type must match "Content-Type" header
    });
    return response.json();
}

const logout = async (user) => {

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

export { login, register, logout };