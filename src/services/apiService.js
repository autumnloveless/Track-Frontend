import { user, accessToken } from "../store";
import { checkAuth } from "./authService"

let link_token = "";

const getAccounts = async () => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch(process.env.API_URL + 'api/accounts', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Authorization': 'Bearer ' + accessToken },
    });
    response = await response.json();
    return response.accounts || [];
}

const getTransactions = async () => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch(process.env.API_URL + 'api/transactions', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Authorization': 'Bearer ' + accessToken },
    });
    response = await response.json();
    return response.transactions || [];
}

const getTransaction = async (id) => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch(process.env.API_URL + 'api/transactions/' + id, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Authorization': 'Bearer ' + accessToken },
    });
    response = await response.json();
    return response.transaction || [];
}

const updateTransactions = async () => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch(process.env.API_URL + 'api/plaid/update_transactions', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
    });
    return response.json();
}

const updateTransaction = async (id, body) => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch(process.env.API_URL + 'api/transactions/' + id, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    response = await response.json();
    return response.transaction || response.error;
}

const bulkUpdateTransactions = async (body) => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch(process.env.API_URL + 'api/transactions/bulkUpdate', {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
        // { ids: "", update: {"read": false } }
    });
    response = await response.json();
    return response.success || response.error;
}

const linkBankAccount = async () => {
    // Get link Token
    let { accessToken, user} = await checkAuth();
    let response = await fetch(process.env.API_URL + 'api/plaid/link_token', {
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
    let response = await fetch(process.env.API_URL + 'api/plaid/access_token', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(public_token) // body data type must match "Content-Type" header
    });
    return response;
}

const updateUser = async (body) => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch(process.env.API_URL + 'api/user', {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    response = await response.json();
    return response
}


export default { getAccounts, getTransactions, linkBankAccount, updateTransactions,
    updateTransaction,getTransaction, bulkUpdateTransactions,updateUser }