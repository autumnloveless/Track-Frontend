import { user, accessToken } from "../store";
import { checkAuth } from "./authService"

const getAccounts = async () => {
    let { accessToken, user} = await checkAuth();
    let response = await fetch('http://localhost:3300/api/accounts', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Authorization': 'Bearer ' + accessToken },
    });
    return response;
}

const getTransactions = async () => {

}


export default { getAccounts, getTransactions }