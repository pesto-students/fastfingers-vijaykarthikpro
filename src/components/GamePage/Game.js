import React , { Component} from 'react';
import './Game.scss';
import PersonIcon from '../../images/person-icon.svg';
import GamepadIcon from '../../images/gamepad-icon.svg';
import CrossIcon from '../../images/cross-icon.svg'

export default class Game extends Component {
    constructor(props) {
        super(props);
    }
    handleGoBack = ()  =>{
        this.props.handlePageNavigation('SignUp');
    }
    
    render() {
        return (<div className="main">
            <div className="header-container">
                <div className="player-name-title">
                    <div className="player-name">
                        <img src={PersonIcon}  alt=""/>
                        <span>PLAYER_NAME_</span>
                    </div>
                    <span className="title">fast fingers</span>
                </div>
                <div className="level-score">
                    <div className="level">
                        <img src={GamepadIcon} alt=""/>
                        <span>LEVEL : </span>
                    </div>
                    <span>SCORE</span>
                </div>
            </div>

            <div className="game-container">
                <div className="score-board">
                    <h3>SCORE BOARD</h3>
                </div>
                <div className="play-game">
                    <span>Game play</span>
                </div>        
            </div>
            <button className="stop-game-btn" onClick={this.handleGoBack}>
                <img src={CrossIcon} alt=""/>
                <span>STOP GAME</span>
            </button>  
        </div>)
    }
}