import React from "react";
import classes from "../Sort.module.css";
import Button from "../../ui/Button";
import getSelectionSort from "./getSlectionSort";
import { useState } from "react";
import { useRef } from "react";
import { BackButton } from "../../ui/BackButton";

const SelectionSort = () => {
  const ANIMATION_SPEED = 50;
  const NUMBER_OF_BAR = 35;
  const SECONDARY_COLOR = "#707070";
  const PRIMARY_COLOR = "white";
  const [array, setArray] = useState([40, 70, 50]);
  const max = 100;
  const min = 5;
  const arraybarRef = useRef(null);

  const selectionSort = () => {
    const animations = getSelectionSort(array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        arraybarRef.current.className
      );
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          arrayBars[barOneIdx].innerHTML = newHeight;
          barOneStyle.height = `${newHeight * (window.innerHeight / 125)}px`;
        }, i * ANIMATION_SPEED);
      }
    }
  };

  const GenerateNumber = () => {
    var generateArray = [];
    for (var i = 0; i < NUMBER_OF_BAR; i++) {
      generateArray.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
    setArray(generateArray);
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.heading}>Selection Sort</div>
      <div className={classes.array}>
        {array.map((value, index) => (
          <div
            className={classes.arraybar}
            ref={arraybarRef}
            key={index}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value * (window.innerHeight / 125)}px`,
              width: `${window.innerWidth / (2.2 * array.length)}px`,
              fontSize: `${window.innerWidth / (3.3 * array.length)}px`,
            }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className={classes.button}>
        <Button
          onClick={() => {
            GenerateNumber();
          }}
        >
          Generate number
        </Button>
        <Button
          onClick={() => {
            selectionSort();
          }}
        >
          SelectionSort
        </Button>
      </div>
    </div>
  );
};

export default SelectionSort;
