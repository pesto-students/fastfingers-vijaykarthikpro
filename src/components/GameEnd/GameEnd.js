import React from "react";
import "./GameEnd.scss";
import PropTypes from "prop-types";
import PlayerDetails from "../PlayerDetails/PlayerDetails";
import PlayAgainIcon from "../../images/play-again-icon.svg";
import {
  convertTimeToString,
  getFromSessionStorage,
  removeFromSessionStorage,
} from "../../Util";

export default function GameEnd({
  name,
  difficultyLevel,
  score,
  handlePageNavigation,
}) {
  const totalGames = getFromSessionStorage("totalGames");

  const navigatePageToSignUp = () => {
    removeFromSessionStorage("totalGames");
    handlePageNavigation("SignUp");
  };

  const navigatePageToGame = () => {
    let level = getFromSessionStorage("level");
    handlePageNavigation("Game", name, level);
  };

  return (
    <div className="game-end-container">
      <PlayerDetails
        name={name}
        level={difficultyLevel}
        score={score}
        gameOver={true}
      />
      <div className="center-align">
        <span className="score-text">SCORE : GAME {totalGames.length}</span>
        <span className="score">{convertTimeToString(score)}</span>
        <span className="new-high-score-text">New High Score</span>

        <button
          className="play-again-btn"
          name="play-again"
          onClick={navigatePageToGame}
        >
          <img src={PlayAgainIcon} alt="" />
          <p>PLAY AGAIN</p>
        </button>
      </div>
      <div className="quit-btn">
        <button name="quit" onClick={navigatePageToSignUp}>
          QUIT
        </button>
      </div>
    </div>
  );
}

GameEnd.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.string,
  score: PropTypes.number.isRequired,
  handlePageNavigation: PropTypes.func,
};

GameEnd.defaultProps = {
  name: getFromSessionStorage("name"),
  level: getFromSessionStorage("level"),
  score: 0,
  handlePageNavigation: () => {},
};
