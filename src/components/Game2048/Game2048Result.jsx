import React from "react";
import classes from "./Game2048Result.module.css";
import Button from "../ui/Button";

const Game2048Result = ({ result, setResult }) => {
  return (
    <div className={classes.col}>
      <div className={classes.backdrop}></div>
      <div className={classes.detailResult}>
        <div className={classes.result}>{result}</div>
        <div className={classes.buttons}>
          <Button onClick={() => setResult(false)}>Go back</Button>
        </div>
      </div>
    </div>
  );
};

export default Game2048Result;
