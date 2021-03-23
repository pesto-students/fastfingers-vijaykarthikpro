export const saveToSessionStorage = (key, value) => {
    return sessionStorage.setItem(key, JSON.stringify(value));
}

export const getFromSessionStorage = (key) => { 
    return key && JSON.parse(sessionStorage.getItem(key));
}

export function convertSecondsToMMSS(seconds) {
    return new Date(seconds * 1000).toISOString().substr(14, 5);
 }

 export function convertTimeToString(totalSeconds) {
    var hours = parseInt( totalSeconds / 3600 );
    var minutes = parseInt( (totalSeconds - (hours * 3600)) / 60 );
    var seconds = Math.floor((totalSeconds - ((hours * 3600) + (minutes * 60))));
    return `${minutes}:${(seconds  < 10 ? "0" + seconds : seconds)}`;
 }
