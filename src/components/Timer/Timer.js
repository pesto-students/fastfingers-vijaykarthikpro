import React, { useEffect, useState/* , useEffect, useCallback  */} from 'react';
import { updateCircleDasharray, COLOR_CODES } from '../../Util';
import PropTypes from 'prop-types';
import './Timer.css';

const { alert, warning, info } = COLOR_CODES;

export default function Timer({ remainingTime, timeLimit, handleGameEnd }) {

    const [circleDashArray , setCircleDashArray] = useState(updateCircleDasharray(timeLimit, remainingTime));
    const [remainingPathColor, setRemainingPathColor] = useState(info.color);
    const [milliseconds, setMilliseconds] = useState(remainingTime * 1000);


    useEffect(() =>{
      setMilliseconds(remainingTime * 100)
      setCircleDashArray(updateCircleDasharray(timeLimit, remainingTime));
      updateRemainingPathColor(remainingTime);
    },[remainingTime, timeLimit]);

    const updateRemainingPathColor = (remainingTime) => {

      if (remainingTime <= alert.threshold) setRemainingPathColor(alert.color);
      
      else if (remainingTime <= warning.threshold) setRemainingPathColor(warning.color);

    }

    useEffect(() =>{
      const milliSeconds = milliseconds > 0 && setInterval(() => setMilliseconds(milliseconds - 1),10);
      return () => clearInterval(milliSeconds);
    },[milliseconds])


    
    function formatTime(duration) {

       var seconds = Math.floor((duration / 1000) % 60);
       var millies = parseInt(milliseconds / 10 );
        return  `${seconds} : ${ millies < 10 ? '0' + millies : millies}`;
    }

    useEffect(() =>{
      if(remainingTime === 0) {
         handleGameEnd(remainingTime);
      }
    },[remainingTime, handleGameEnd]) 
    
    
    return (
        <div className="base-timer">
        <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className="base-timer__circle">
            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
              id="base-timer-path-remaining"
              strokeDasharray={circleDashArray}
              className={`base-timer__path-remaining ${remainingPathColor}`}
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">{formatTime(remainingTime * 1000)}</span>
      </div>
    )
}


Timer.propTypes = {
  remainingTime : PropTypes.number.isRequired,
  handleGameEnd: PropTypes.func.isRequired
}

Timer.defaultProps = {
  remainingTime: 0,
  handleGameEnd : (() =>{})
}
