import React from "react";
import "./MinesweeperNode.css";

const MinesweeperNode = ({
  col,
  row,
  distance,
  isRevealed,
  isMine,
  onClick,
  TOTAL_COL,
}) => {
  const extraClassName =
    isMine && isRevealed
      ? "node-mine"
      : isRevealed
      ? "node-revealed"
      : "node-notrevealed";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node-Minesweeper ${extraClassName} `}
      style={{
        width: `${window.innerWidth / (1.1 * TOTAL_COL)}px`,
        height: `${window.innerWidth / (1.1 * TOTAL_COL)}}px`,
        lineHeight: `${window.innerWidth / (1.1 * TOTAL_COL)}px`,
      }}
      onClick={onClick}
    >
      {isRevealed ? (distance != 0 ? distance : "") : ""}
    </div>
  );
};

export default MinesweeperNode;
