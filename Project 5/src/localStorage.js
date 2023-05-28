const localStorageKey = '@@react-app-user';

export function login (id) {
    localStorage.setItem(localStorageKey, String(id));
}

export function isLogged () {
    return Boolean(localStorage.getItem(localStorageKey))
}

export function logout () {
    localStorage.setItem(localStorageKey, '');
}

export function getUserId () {
    return Number(localStorage.getItem(localStorageKey))
}


export default {login, isLogged, logout, getUserId};
