import React from "react";
import "../GraphNode.css";

const MinimumCostPathNode = ({
  col,
  row,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  cost,
  graphtype,
}) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}-${graphtype}`}
      className={`node ${extraClassName}`}
      style={{
        width: `${window.innerWidth / 15}px`,
        height: `${window.innerWidth / 15}px`,
        fontSize: `${window.innerWidth / 800}rem`,
        textAlign: "center",
        lineHeight: `${window.innerWidth / 15}px`,
      }}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    >
      <p>{cost}</p>
    </div>
  );
};
export default MinimumCostPathNode;
