import { difficultyFactors, difficultyLevels } from './constants'
import Dictionary from './data/dictionary.json'

export const saveToSessionStorage = (key, value) => {
    return sessionStorage.setItem(key, JSON.stringify(value));
}

export const getFromSessionStorage = (key) => { 
    return key && JSON.parse(sessionStorage.getItem(key));
}

export const removeFromSessionStorage = (key) => {
    return sessionStorage.removeItem(key);
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

let initialDifficultyFactor = difficultyFactors.EASY;
let initialTimerValue = 0;
let initialRandomWord = '';

export const easyWords = Dictionary.filter(word=> word.length <= 4);
export const mediumWords = Dictionary.filter(word=> word.length >= 5 && word.length <= 8);
export const hardWords = Dictionary.filter(word=> word.length >= 8);
    
export function getInitialValues(level) {

    
    if( level === difficultyLevels.EASY ) {
        initialRandomWord = easyWords[Math.floor(Math.random() * easyWords.length)].toUpperCase();
        initialDifficultyFactor = difficultyFactors.EASY;
        initialTimerValue = Math.ceil( initialRandomWord.length / initialDifficultyFactor );

   } else if ( level === difficultyLevels.MEDIUM ) {

       initialRandomWord = mediumWords[Math.floor(Math.random() * mediumWords.length)].toUpperCase();
       initialDifficultyFactor = difficultyFactors.MEDIUM;
       initialTimerValue = Math.ceil( initialRandomWord.length / initialDifficultyFactor );

   } else if ( level === difficultyLevels.HARD ) {

       initialRandomWord = hardWords[Math.floor(Math.random() * hardWords.length)].toUpperCase();
       initialDifficultyFactor = difficultyFactors.HARD;
       initialTimerValue = Math.ceil( initialRandomWord.length / initialDifficultyFactor );

   }

   let returnObj = {initialRandomWord, initialDifficultyFactor, initialTimerValue}
   return returnObj;

}

