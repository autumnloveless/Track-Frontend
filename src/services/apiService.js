import { user, accessToken } from "../store";
import { checkAuth } from "./authService"

let link_token = "";

const getAccounts = async () => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch('http://localhost:3300/api/accounts', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Authorization': 'Bearer ' + accessToken },
    });
    response = await response.json();
    return response.accounts || [];
}

const getTransactions = async () => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch('http://localhost:3300/api/transactions', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Authorization': 'Bearer ' + accessToken },
    });
    response = await response.json();
    return response.transactions || [];
}

const updateTransactions = async () => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch('http://localhost:3300/api/plaid/update_transactions', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify({ item_id: 'DgVzzg8G3jCxRV74NAbZi1a1DZmBj1U36wvj3'}) // body data type must match "Content-Type" header
    });
    return response;
}

const updateTransaction = async (id, body) => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch('http://localhost:3300/api/transactions/' + id, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    return response;
}

const linkBankAccount = async () => {
    // Get link Token
    let { accessToken, user} = await checkAuth();
    let response = await fetch('http://localhost:3300/api/plaid/link_token', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Authorization': 'Bearer ' + accessToken },
    });
    response = await response.json();
    link_token = response.link_token;

    // Create Plaid Handler
    const handler = Plaid.create({
        token: link_token,
        onSuccess: (public_token, metadata) => { setPlaidAccessToken({ public_token: public_token }) },
        onLoad: () => {},
        onExit: (err, metadata) => { console.log (err) },
        onEvent: (eventName, metadata) => { console.log (eventName) },
        receivedRedirectUri: null,
    })

    // Open plaid link window
    handler.open();
}

const setPlaidAccessToken = async(public_token) => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch('http://localhost:3300/api/plaid/access_token', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(public_token) // body data type must match "Content-Type" header
    });
    return response;
}


export default { getAccounts, getTransactions, linkBankAccount, updateTransactions,updateTransaction }