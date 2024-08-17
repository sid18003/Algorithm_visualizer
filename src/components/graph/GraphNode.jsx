import React from "react";
import "./GraphNode.css";

const GraphNode = ({
  col,
  row,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  graphtype,
  TOTAL_COL,
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
        width: `${window.innerWidth / (1.2 * TOTAL_COL)}px`,
        height: `${window.innerWidth / (1.2 * TOTAL_COL)}px`,
      }}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};
export default GraphNode;
