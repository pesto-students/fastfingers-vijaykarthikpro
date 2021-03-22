import React, { useState, useEffect } from 'react';


export default function Timer({ remainingTime }) {

    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 2;
    
    const COLOR_CODES = {
      info: {
        color: "green"
      },
      warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
      },
      alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
      }
    };
    

    let timePassed = 0;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;
    let circleDashArray=0;

    const [timeLeft, setTimeLeft] = useState(remainingTime);

    
    useEffect(()=>{
        const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timer);
    },[timeLeft ]);
    
    
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
    
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
    
      return `${minutes}:${seconds}`;
    }
    
    function setRemainingPathColor(timeLeft) {
      const { alert, warning, info } = COLOR_CODES;
      if (timeLeft <= alert.threshold) {
        document
          .getElementById("base-timer-path-remaining")
          .classList.remove(warning.color);
        document
          .getElementById("base-timer-path-remaining")
          .classList.add(alert.color);
      } else if (timeLeft <= warning.threshold) {
        document
          .getElementById("base-timer-path-remaining")
          .classList.remove(info.color);
        document
          .getElementById("base-timer-path-remaining")
          .classList.add(warning.color);
      }
    }
    
    function calculateTimeFraction() {
      const rawTimeFraction = timeLeft / remainingTime;
      return rawTimeFraction - (1 / remainingTime) * (1 - rawTimeFraction);
    }
    
    function setCircleDashArray() {
        circleDashArray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
    }


    return (
        <div className="base-timer">
        <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className="base-timer__circle">
            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
              id="base-timer-path-remaining"
              stroke-dasharray={circleDashArray}
              className="base-timer__path-remaining"
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">${formatTime(
          timeLeft
        )}</span>
      </div>
    )
}