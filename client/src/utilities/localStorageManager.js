export const KEY_ACCESS_TOKEN = 'access_token';

export function getToken(key) {

    return localStorage.getItem(key);

}

export function setToken(key, value) {

    return localStorage.setItem(key, value);

}

export function removeToken(key) {

    return localStorage.removeItem(key);

}