export const saveToSessionStorage = (key, value) => {
    return sessionStorage.setItem(key, JSON.stringify(value));
}

export const getFromSessionStorage = (key) => { 
    return key && JSON.parse(sessionStorage.getItem(key));
}

saveToSessionStorage('isUserLoggedIn',false);