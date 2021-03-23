import React from 'react';
import './GameEnd.scss';
import PropTypes from 'prop-types';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import PlayAgainIcon from '../../images/play-again-icon.svg';
import { convertTimeToString } from '../../Util'

export default function GameEnd({ name, level, score, handlePageNavigation}) {

    const navigatePageToSignUp = (e) => {
        handlePageNavigation('SignUp');
    }

    const navigatePageToGame = (e) => {
        handlePageNavigation('Game');
    }

    return (<div className="game-end-container">
        <PlayerDetails name={name} level={level} score={score} gameOver={true}/>
        <div className='center-align'>
            <span className="score-text">SCORE : GAME 5</span>
            <span className="score">{convertTimeToString(score)}</span>
            <span className="new-high-score-text">New High Score</span>

            <button className="play-again-btn" name="play-again" onClick={navigatePageToGame}>
                <img src={PlayAgainIcon} alt=''/>
                <p>PLAY AGAIN</p> 
            </button>
        </div>
        <div className="quit-btn">
           <button name="quit" onClick={navigatePageToSignUp}>QUIT</button> 
        </div>
    </div>)
}

GameEnd.propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.string,
    score: PropTypes.number.isRequired,
    handlePageNavigation: PropTypes.func
}

