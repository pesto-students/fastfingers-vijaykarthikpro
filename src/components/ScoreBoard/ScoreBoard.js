import React from "react";
import { convertTimeToString, getFromSessionStorage } from "../../Util";
import "./ScoreBoard.scss";

export default function ScoreBoard() {
  const gamesList = getFromSessionStorage("totalGames") || [];

  const displayGamesList = () => {
    if (gamesList.length > 0) {
      const allGamesList = gamesList.map((gameTime, id) => {
        if (gameTime === Math.max(...gamesList)) {
          return (
            <div key={id}>
              <span className="personal-best">PERSONAL BEST</span>
              <li>
                Game {id + 1} : {convertTimeToString(gameTime)}
              </li>
            </div>
          );
        } else {
          return (
            <li key={id}>
              Game {id + 1} : {convertTimeToString(gameTime)}
            </li>
          );
        }
      });

      return <div className="games-list">{allGamesList}</div>;
    } else {
      return;
    }
  };

  return (
    <div className="score-board">
      <span className="title">SCORE BOARD</span>
      {displayGamesList()}
    </div>
  );
}
