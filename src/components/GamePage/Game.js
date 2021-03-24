import React,{ useState, useEffect }  from 'react';
import './Game.scss';
import PropTypes from 'prop-types';
import PlayerDetails from '../PlayerDetails/PlayerDetails'
import CrossIcon from '../../images/cross-icon.svg'
import constants, { difficultyLevels } from '../../constants'
import { saveToSessionStorage, getFromSessionStorage, easyWords, mediumWords, hardWords, getInitialValues } from '../../Util';
import ScoreBoard from '../ScoreBoard/ScoreBoard'


export default function Game({ name, difficultyLevel, handlePageNavigation }) {

    const [level, setLevel] = useState(difficultyLevel);
    const [inputWord, setInputWord] = useState('');
    const [gameTime, setGameTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [wordCount, setWordCount] = useState(1);
    const [matchedWordIndex, setMatchedWordIndex] = useState(0);
    const [totalGames, setTotalGames] = useState(getFromSessionStorage('totalGames') || []);

    const {initialDifficultyFactor, initialRandomWord, initialTimerValue} = getInitialValues(level);

    const [difficultyFactor, setDifficultyFactor] = useState(initialDifficultyFactor);
    const [timeLeft, setTimeLeft] = useState(initialTimerValue);
    const [randomWord, setRandomWord] = useState(initialRandomWord); 

    useEffect(()=>{
        let timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timer);
    },[timeLeft]);



    useEffect(()=>{
        if(!gameOver) {
            let gameTimeTimer = gameTime >= 0 &&  setInterval( () => setGameTime(gameTime + 1), 1000);
            return() => clearInterval(gameTimeTimer);
        } else {
            setGameTime(0);
        }
    },[gameTime, gameOver]);
    
    
    const handleTextChange = (e) => {
        let {target:{value}} = e;
        const element = document.querySelector(".random-word");

        if (randomWord.substring(0, value.length).match(value)) {

            const matchedLetters = randomWord.substring( 0, value.length );
            const remainingLetters = randomWord.substring(value.length);
            element.innerHTML = `<span class="green">${matchedLetters}
                                 </span>${remainingLetters}`;
            setMatchedWordIndex(value.length);

        } else {

            const matchedLetters = randomWord.substring(0, matchedWordIndex);
            const unMatchedLetters = randomWord.substring(matchedWordIndex, value.length);
            const remainingLetters = randomWord.substring(value.length);

            element.innerHTML = `<span class="green">${matchedLetters}
                                 </span><span class="blue">${unMatchedLetters}
                                </span>${remainingLetters}`;
        }
        setInputWord(value);
    }

    const toInputUppercase = (e) => {
        e.target.value = ("" + e.target.value).toUpperCase();
    }

    function changeWord() {
        switch(level) {
            case constants.difficultyLevels.EASY :
            {
                let word = easyWords[Math.floor(Math.random() * easyWords.length)]
                setRandomWord(word.toUpperCase());
                setInputWord('');
                break;
            }
            case constants.difficultyLevels.MEDIUM : {

                let word = mediumWords[Math.floor(Math.random() * mediumWords.length)]
                setRandomWord(word.toUpperCase());
                setInputWord('');
                break;
            }
            case constants.difficultyLevels.HARD : {

                let word = hardWords[Math.floor(Math.random() * hardWords.length)]
                setRandomWord(word.toUpperCase());
                setInputWord('');
                break;
            }
            default: break;
        }
    }

    
    if(inputWord === randomWord) {
        setDifficultyFactor(difficultyFactor + 0.01);

        if(wordCount === 50) {
            level === difficultyLevels.EASY ? setLevel(difficultyLevels.MEDIUM) : setLevel(difficultyLevels.HARD);
            setWordCount(1);
            changeWord();
        } else {
            setWordCount(wordCount + 1);
            changeWord();
        } 
        
        setTimeLeft(Math.ceil( randomWord.length / difficultyFactor ));
    }

 
    useEffect(() =>{
        if(timeLeft === 0) {
            setGameOver(true);
            // let currentGame = { Game : (Object.values(totalGames).length + 1).toString(), value: gameTime}
            setTotalGames(totalGames.push(gameTime));
            saveToSessionStorage('totalGames',totalGames);

            return handlePageNavigation('GameEnd', name, level, gameTime)
        }
    },[timeLeft, handlePageNavigation, name, level, gameTime, totalGames])

    const handleStopGame = (e) =>{
        e.preventDefault();
        handlePageNavigation('GameEnd', name, level, gameTime);
    }
    


    return (<div className="main">
        
            <PlayerDetails name={name} level={level} score={gameTime} gameOver={gameOver}/>

            <div className="game-container">
                <ScoreBoard />
                <div className="play-game">
                    <span className="time-left">{timeLeft.toString()}</span>
                    <div className="random-word">
                        {randomWord}
                    </div>
                    <form>
                        <input 
                            type="text" 
                            id="input-text"
                            value = {inputWord} 
                            onKeyPress = {(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                            onChange = {handleTextChange}
                            onInput={toInputUppercase}
                            autoFocus />
                    </form>
                </div>        
            </div>
            <div className="stop-game-btn">
                <button onClick={handleStopGame}>
                    <img src={CrossIcon} alt=""/>
                    <span>STOP GAME</span>
                </button>
               
            </div>  
        </div>)
}


Game.propTypes = {
    name: PropTypes.string,
    difficultyLevel: PropTypes.string,
    handlePageNavigation: PropTypes.func
}

Game.defaultProps = {
    name: getFromSessionStorage('name'),
    difficultyLevel: getFromSessionStorage('level'),
    handlePageNavigation: (()=>{})
}