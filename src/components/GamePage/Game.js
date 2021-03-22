import React,{ useState, useEffect }  from 'react';
import './Game.scss';
import PersonIcon from '../../images/person-icon.svg';
import GamepadIcon from '../../images/gamepad-icon.svg';
import CrossIcon from '../../images/cross-icon.svg'
import { getFromSessionStorage } from '../../Util'
import Dictionary from '../../data/dictionary.json'
import constants, { difficultyLevels, difficultyFactors } from '../../constants'

export default function Game() {

    const name = getFromSessionStorage('name');
    const [level, setLevel] = useState(getFromSessionStorage('level'));
    const [typedWord, setTypedWord] = useState('')
    const [wordCount, setWordCount] = useState(1);
    // const [difficultyFactor, setDifficultyFactor] = useState(difficultyFactors.EASY)
    

    const easyWords = Dictionary.filter(word=> word.length <= 4);
    const mediumWords = Dictionary.filter(word=> word.length >= 5 && word.length <= 8);
    const hardWords = Dictionary.filter(word=> word.length >= 8);
    let initialWord = ''
    let timerValue = 0
    let difficultyFactor = 1;

    if( level === difficultyLevels.EASY ) {

         initialWord = easyWords[Math.floor(Math.random() * easyWords.length)];
         difficultyFactor = difficultyFactors.EASY
         timerValue = Math.ceil( initialWord.length / 1 );

    } else if ( level === difficultyLevels.MEDIUM ) {

         initialWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
         difficultyFactor = difficultyFactors.MEDIUM
         timerValue = Math.ceil( initialWord.length / 1.5 );

    } else if ( level === difficultyLevels.HARD ) {

        initialWord = hardWords[Math.floor(Math.random() * hardWords.length)];
        difficultyFactor = difficultyFactors.HARD
        timerValue = Math.ceil( initialWord.length / 2 );

    }

    const [randomWord, setRandomWord] = useState(initialWord); 
    const [timeLeft, setTimeLeft] = useState(timerValue);

    useEffect(()=>{
        let timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        if(timer < 2) timer = 2;
        return () => clearInterval(timer);
    },[timeLeft]);
    
    const handleTextChange = (e) => {
        setTypedWord(e.target.value);
 
    }

    function changeWord(level) {
        switch(level) {
            case constants.difficultyLevels.EASY :
            {
                setRandomWord(easyWords[Math.floor(Math.random() * easyWords.length)]);
                setTypedWord('');
                break;
            }
            case constants.difficultyLevels.MEDIUM : {
                setRandomWord(mediumWords[Math.floor(Math.random() * mediumWords.length)]);
                setTypedWord('');
                break;
            }
            case constants.difficultyLevels.HARD : {
                setRandomWord(hardWords[Math.floor(Math.random() * hardWords.length)]);
                setTypedWord('');
                break;
            }
            default: break;
        }
    }

    if(typedWord === randomWord) {
        difficultyFactor += 0.01
        if(wordCount === 50) {
            level === difficultyLevels.EASY ? setLevel(difficultyLevels.MEDIUM) : setLevel(difficultyLevels.HARD);
            setWordCount(1); 
            changeWord(level);
        } else {
            setWordCount(wordCount + 1);
            changeWord(level);
        }
        timerValue = Math.ceil( randomWord.length / difficultyFactor );
        setTimeLeft(timerValue)  
    }




    return (<div className="main">
            <div className="header-container">
                <div className="player-name-title">
                    <div className="player-name">
                        <img src={PersonIcon}  alt=""/>
                        <span>{name}</span>
                    </div>
                    <span className="title">fast fingers</span>
                </div>
                <div className="level-score">
                    <div className="level">
                        <img src={GamepadIcon} alt=""/>
                        <span>LEVEL : {level}</span>
                    </div>
                    <span>SCORE</span>
                </div>
            </div>

            <div className="game-container">
                <div className="score-board">
                    <h3>SCORE BOARD</h3>
                </div>
                <div className="play-game">
                    <span>{timeLeft}</span>
                    <p>{randomWord}</p>
                    <form>
                        <input 
                            type="text" 
                            value = {typedWord} 
                            onKeyPress = {(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                            onChange = {handleTextChange}
                            autoFocus />
                    </form>
                </div>        
            </div>
            <button className="stop-game-btn">
                <img src={CrossIcon} alt=""/>
                <span>STOP GAME</span>
            </button>  
        </div>)
}