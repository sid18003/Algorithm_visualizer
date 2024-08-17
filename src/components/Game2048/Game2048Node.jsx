import React from "react";
import "./Game2048Node.css";

const setColor = {
  "": "white",
  2: "#00FF00",
  4: "#0000FF",
  8: "#FFFF00",
  16: "#00FFFF",
  32: "#FF00FF",
  64: "#C0C0C0",
  128: "#800000",
  256: "#808000",
  512: "#008000",
  1024: "#800080",
  2048: "#008080",
};

const Game2048Node = ({ col, row, value }) => {
  const backgroundcolor = setColor[value];
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node-Game2048`}
      style={{
        width: `${window.innerWidth / 20}px`,
        height: `${window.innerWidth / 20}px`,
        lineHeight: `${window.innerWidth / 20}px`,
        backgroundColor: backgroundcolor,
      }}
    >
      {value}
    </div>
  );
};

export default Game2048Node;
