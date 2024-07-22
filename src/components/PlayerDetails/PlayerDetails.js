import React from "react";
import PropTypes from "prop-types";
import PersonIcon from "../../images/person-icon.svg";
import GamepadIcon from "../../images/gamepad-icon.svg";
import { getFromSessionStorage, convertSecondsToMMSS } from "../../Util";
import "./PlayerDetails.scss";

export default function PlayerDetails({ name, level, score, gameOver }) {
  const displayScore = (score) => {
    if (!gameOver) {
      if (score > 0) {
        return <span>SCORE : {convertSecondsToMMSS(score)}</span>;
      } else {
        return <span>SCORE : {convertSecondsToMMSS(0)}</span>;
      }
    } else {
      return;
    }
  };

  return (
    <div className="header-container">
      <div className="player-name-level">
        <div className="player-name">
          <img src={PersonIcon} alt="" />
          <span>PLAYER_NAME : {name}</span>
        </div>
        <div className="level">
          <img src={GamepadIcon} alt="" />
          <span>LEVEL : {level}</span>
        </div>
      </div>
      <div className="title-score">
        <span className="title">fast fingers</span>
        {displayScore(score)}
      </div>
    </div>
  );
}

PlayerDetails.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  score: PropTypes.number,
  gameOver: PropTypes.bool,
};

PlayerDetails.defaultProps = {
  name: getFromSessionStorage("name"),
  level: getFromSessionStorage("level"),
  score: 0,
  gameOver: false,
};
