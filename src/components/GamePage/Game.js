import React,{ useState, useEffect }  from 'react';
import './Game.scss';
import PropTypes from 'prop-types';
import PlayerDetails from '../PlayerDetails/PlayerDetails'
import CrossIcon from '../../images/cross-icon.svg'
import Dictionary from '../../data/dictionary.json'
import constants, { difficultyLevels, difficultyFactors } from '../../constants'

export default function Game({ name, difficultyLevel, handlePageNavigation }) {

    const [level, setLevel] = useState(difficultyLevel);
    const [typedWord, setTypedWord] = useState('')
    const [wordCount, setWordCount] = useState(1);
    const [gameTime, setGameTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const easyWords = Dictionary.filter(word=> word.length <= 4);
    const mediumWords = Dictionary.filter(word=> word.length >= 5 && word.length <= 8);
    const hardWords = Dictionary.filter(word=> word.length >= 8);
    let initialWord = ''
    let timerValue = 0
    let initialDifficultyFactor = difficultyFactors.EASY;

    if( level === difficultyLevels.EASY ) {
         initialWord = easyWords[Math.floor(Math.random() * easyWords.length)];
         initialDifficultyFactor = difficultyFactors.EASY;
         timerValue = Math.ceil( initialWord.length / initialDifficultyFactor );

    } else if ( level === difficultyLevels.MEDIUM ) {

         initialWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
         initialDifficultyFactor = difficultyFactors.MEDIUM;
         timerValue = Math.ceil( initialWord.length / initialDifficultyFactor );

    } else if ( level === difficultyLevels.HARD ) {

        initialWord = hardWords[Math.floor(Math.random() * hardWords.length)];
        initialDifficultyFactor = difficultyFactors.HARD;
        timerValue = Math.ceil( initialWord.length / initialDifficultyFactor );

    }

    const [randomWord, setRandomWord] = useState(initialWord.toUpperCase()); 
    const [timeLeft, setTimeLeft] = useState(timerValue);
    const [difficultyFactor, setDifficultyFactor] = useState(initialDifficultyFactor)

    

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
        let input = value;
        input.split('').map((letter, index) => {
            if(randomWord[index] ===  letter) {
                console.log('Matched');
            } else {
                console.log('un - - Matched')
            }
            return null;
        })
        setTypedWord(e.target.value);
    }

    const toInputUppercase = (e) => {
        e.target.value = ("" + e.target.value).toUpperCase();
      };

    function changeWord(level) {
        switch(level) {
            case constants.difficultyLevels.EASY :
            {
                let word = easyWords[Math.floor(Math.random() * easyWords.length)]
                setRandomWord(word.toUpperCase());
                setTypedWord('');
                break;
            }
            case constants.difficultyLevels.MEDIUM : {

                let word = mediumWords[Math.floor(Math.random() * mediumWords.length)]
                setRandomWord(word.toUpperCase());
                setTypedWord('');
                break;
            }
            case constants.difficultyLevels.HARD : {

                let word = hardWords[Math.floor(Math.random() * hardWords.length)]
                setRandomWord(word.toUpperCase());
                setTypedWord('');
                break;
            }
            default: break;
        }
    }

    
    if(typedWord === randomWord) {
        setDifficultyFactor(difficultyFactor + 0.01);
        if(wordCount === 50) {
            level === difficultyLevels.EASY ? setLevel(difficultyLevels.MEDIUM) : setLevel(difficultyLevels.HARD);
             setWordCount(1);
            changeWord(level);
        } else {
            setWordCount(wordCount + 1);
            changeWord(level);
        } 
        setTimeLeft(Math.ceil( randomWord.length / difficultyFactor ));
    }

 
    useEffect(() =>{
        if(timeLeft === 0) {
            setGameOver(true);
            return handlePageNavigation('GameEnd',name, level, gameTime)
        }
    },[timeLeft, handlePageNavigation, name, level, gameTime])
    

    

   

    return (<div className="main">
        
            <PlayerDetails name={name} level={level} score={gameTime} gameOver={gameOver}/>

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
                            onInput={toInputUppercase}
                            autoFocus />
                    </form>
                </div>        
            </div>
            <div className="stop-game-btn">
                <button>
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
    name: '',
    difficultyLevel: 'EASY'
}