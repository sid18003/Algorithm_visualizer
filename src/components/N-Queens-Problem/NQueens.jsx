import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../ui/Button";
import classes from "./NQueens.module.css";
import { BackButton } from "../ui/BackButton";
import { solveNQueens } from "./getNQueens";

const NQueen = () => {
  const [animations, setAnimations] = useState([]);
  const [answer, setAnswer] = useState(2);
  const [error, serError] = useState(false);
  const [value, setValue] = useState(4);
  const ANIMATION_SPEED = 500;
  const MAXI_VALUE_SHOW = 9;

  useEffect(() => {
    if (value > MAXI_VALUE_SHOW) {
      serError(true);
    } else {
      serError(false);
    }
  }, [value]);

  const getSolveProblem = () => {
    if (value > MAXI_VALUE_SHOW) return;
    setAnimations([]);
    const animation = solveNQueens(+value);
    setAnswer(animation.length);
    for (var i = 0; i < animation.length; i++) {
      const new_I = i;
      setTimeout(() => {
        setAnimations((animations) => {
          animations.push(animation[new_I]);
          return [...animations];
        });
      }, ANIMATION_SPEED * i);
    }
  };

  useEffect(() => {
    getSolveProblem();
  }, []);

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.box}>
        <div className={classes.heading}>N - Queens Problem</div>
        <div className={classes.equation}>
          <input
            type="number"
            placeholder="Side of chess board Number must be between 1 to 9 ..."
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
          />
          <div
            className={classes.submitbutton}
            onClick={() => {
              getSolveProblem();
            }}
          >
            {!error ? (
              <Button disabled={false}>SUBMIT</Button>
            ) : (
              <Button disabled={true}>SUBMIT</Button>
            )}
          </div>
        </div>
      </div>
      <div className={classes.animations_box}>
        <div className={classes.headStep}>Number of different solution!</div>
        {answer == 0 ? (
          <div className={classes.headStep}>No solution Possible</div>
        ) : (
          <div className={classes.headStep}>
            {answer} different type of possible solution.
          </div>
        )}
        <div className={classes.animations}>
          {animations.map((animation, index) => (
            <div className={classes.animation} key={index}>
              {animation.map((row, i) => (
                <div className={classes.row} key={i}>
                  {row.map((col, j) => (
                    <div key={j} className={classes.col}>
                      {col == "Q" ? (
                        <>
                          {(i + j) % 2 == 0 ? (
                            <img src="/QueenBlack.jpg" />
                          ) : (
                            <img src="/QueenWhite.jpg" />
                          )}
                        </>
                      ) : (
                        <>
                          {(i + j) % 2 == 0 ? (
                            <div
                              className={classes.col}
                              style={{ backgroundColor: "white" }}
                            ></div>
                          ) : (
                            <div
                              className={classes.col}
                              style={{ backgroundColor: "black" }}
                            ></div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NQueen;
