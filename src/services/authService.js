import { user, isAuthenticated, popupOpen } from "./store";

async function loginWithPopup(client, options) {

}

function logout(client) {
  return client.logout();
}

export default { loginWithPopup, logout };