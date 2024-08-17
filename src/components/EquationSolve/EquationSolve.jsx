import React from "react";
import { solveEquation } from "./getsolveEquation";
import { useState } from "react";
import Button from "../ui/Button";
import classes from "./EquationSolve.module.css";
import { BackButton } from "../ui/BackButton";

const EquationSolve = () => {
  const ANIMATION_SPEED = 500;
  const [equation, setEquation] = useState("2+2/2");
  const [answer, setAnswer] = useState("3");
  const [animations, setAnimations] = useState(["2+2/2", "2+1", "3"]);

  const getEquationSolve = () => {
    const { result, animation } = solveEquation(equation);
    setAnimations([]);
    for (var i = 0; i < animation.length; i++) {
      const new_I = i;
      setTimeout(() => {
        setAnimations((animations) => {
          animations.push(animation[new_I]);
          return [...animations];
        });
      }, ANIMATION_SPEED * i);
    }
    setAnswer(result);
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.box}>
        <div className={classes.heading}>Equation Solver</div>
        <div className={classes.equation}>
          <input
            type="text"
            placeholder="Equation ... "
            onChange={(e) => {
              setEquation(e.target.value);
            }}
            value={equation}
          />
          <div
            className={classes.submitbutton}
            onClick={() => {
              getEquationSolve();
            }}
          >
            <Button>SUBMIT</Button>
          </div>
          <div className={classes.answer}>Answer : {answer}</div>
        </div>
      </div>
      <div className={classes.animations_box}>
        <div className={classes.headStep}>
          Steps to solve the above equation!
        </div>
        <div className={classes.animations}>
          {animations.map((animation, index) => {
            return (
              <div className={classes.animation} key={index}>
                Step {index + 1}: {animation}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EquationSolve;
