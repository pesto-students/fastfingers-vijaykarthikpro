import React, { useState } from 'react'
import './SignUp.scss';
import PropTypes from 'prop-types';
import KeyboardSvg from '../../images/keyboard-icon.svg';
import PlayIconSvg from '../../images/play-icon.svg';
import { difficultyLevels } from '../../constants';
import {  getFromSessionStorage, saveToSessionStorage } from '../../Util';

export default function SignUp({ handlePageNavigation }) {


    const [name, setName] = useState(getFromSessionStorage('name') || '');
    const [selectLevel, setSelectLevel] = useState(getFromSessionStorage('level') || difficultyLevels.EASY);

    const handleSubmission = (e) => {
        e.preventDefault()
        if(name === '') {
            alert('Name field should not be empty.');
        } else {
            saveToSessionStorage('name', name);
            saveToSessionStorage('level', selectLevel);
            handlePageNavigation('Game',name, selectLevel);

            setName('');
            setSelectLevel(difficultyLevels.EASY); 
        }
    }


    const options = Object.values(difficultyLevels).map((value, id) => {
        return  <option key={id}>{value}</option>
    })

    return (<div className="container">
                <div className="box">
                  <img src={KeyboardSvg} alt="img"/>
                  <span className="title">fast fingers</span>
                  <div className="inner-container">
                      <div className="sub-title"> 
                          <span className="red-line"/>
                          <p >the ultimate typing game</p>
                          <span className="red-line"/>
                      </div>
                      <form>
                          <input
                          type="text"
                          name="name"
                          placeholder="TYPE YOUR NAME"
                          value={name}
                          onChange={(e) => { setName(e.target.value)}}
                          required
                          autoFocus/>
      
                          <select  
                            defaultValue={selectLevel} 
                            onChange={(e) => { setSelectLevel(e.target.value)}} 
                            required>
                              {options}
                          </select>
      
                          <button className="start-game-btn" onClick={handleSubmission}>
                              <img src={PlayIconSvg} alt="play icon"/>
                              <span>START GAME</span>
                          </button>
                      </form>
                  </div>
                  </div>
                  
        </div>)

}

SignUp.propTypes = {
    handlePageNavigation: PropTypes.func
}

SignUp.defaultProps = {
    handlePageNavigation: (()=>{})
}
