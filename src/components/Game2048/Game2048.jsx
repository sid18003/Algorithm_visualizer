import React, { useState, useEffect } from "react";
import classes from "./Game2048.module.css";
import Button from "../ui/Button";
import { BackButton } from "../ui/BackButton";
import Game2048Node from "./Game2048Node";
import { getGame2048 } from "./getGame2048";
import Game2048Result from "./Game2048Result";

const Game2048 = () => {
  const TOTAL_ROW = 6;
  const TOTAL_COL = 6;

  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [valueOfResult, setValueOfResult] = useState("");

  const createNode = (row, col) => {
    return {
      row,
      col,
      value: "",
    };
  };

  const generate_two_randam_number = () => {
    const Row_position = Math.floor(Math.random() * TOTAL_ROW);
    const Col_Position = Math.floor(Math.random() * TOTAL_COL);
    return { Row_position, Col_Position };
  };

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < TOTAL_ROW; row++) {
      const currentRow = [];
      for (let col = 0; col < TOTAL_COL; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    const { Row_position, Col_Position } = generate_two_randam_number();
    grid[Row_position][Col_Position].value = 2;
    setGrid([...grid]);
  };

  useEffect(() => {
    getInitialGrid();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        case 37:
          handleKeyEnter("left");
          break;
        case 38:
          handleKeyEnter("up");
          break;
        case 39:
          handleKeyEnter("right");
          break;
        case 40:
          handleKeyEnter("down");
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [grid]);

  var startX, startY;
  const handleTouchStart = (event) => {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
  };
  const handleTouchEnd = (event) => {
    var endX = event.changedTouches[0].pageX;
    var endY = event.changedTouches[0].pageY;
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) handleKeyEnter("right");
      else handleKeyEnter("left");
    } else {
      if (deltaY > 0) handleKeyEnter("down");
      else handleKeyEnter("up");
    }
  };
  const handleMouseDown = (event) => {
    startX = event.pageX;
    startY = event.pageY;
  };
  const handleMouseUp = (event) => {
    var endX = event.pageX;
    var endY = event.pageY;
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) handleKeyEnter("right");
      else handleKeyEnter("left");
    } else {
      if (deltaY > 0) handleKeyEnter("down");
      else handleKeyEnter("up");
    }
  };

  const handleKeyEnter = (direction) => {
    let targetGrid = grid.find((row) => row.find((col) => col.value === 2048));
    if (targetGrid != undefined) {
      setValueOfResult(`You Won the game!`);
      setResult(true);
      return;
    }

    const { board, count, Final_Score } = getGame2048(grid, score, direction);

    let targetNode = board.find((row) => row.find((col) => col.value === 2048));
    if (targetNode != undefined) {
      setValueOfResult(`You Won the game!`);
      setResult(true);
      return;
    }

    if (count == 0) {
      setValueOfResult(`You Lost the game by ${direction} Move`);
      setResult(true);
      return;
    }

    var { Row_position, Col_Position } = generate_two_randam_number();

    while (grid[Row_position][Col_Position].value != "") {
      var { Row_position, Col_Position } = generate_two_randam_number();
      Row_position = Row_position;
      Col_Position = Col_Position;
    }

    grid[Row_position][Col_Position].value =
      Math.floor(Math.random() * 100) > 80 ? 4 : 2;
    console.log(count, Final_Score, board);
    setScore(Final_Score);
    setGrid([...board]);
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.heading}>2048 Game </div>
      <div className={classes.grid}>
        {result && (
          <Game2048Result setResult={setResult} result={valueOfResult} />
        )}
        <div
          onTouchStart={(event) => {
            handleTouchStart(event);
          }}
          onTouchEnd={(event) => {
            handleTouchEnd(event);
          }}
          onMouseDown={(event) => {
            handleMouseDown(event);
          }}
          onMouseUp={(event) => {
            handleMouseUp(event);
          }}
        >
          {grid.map((row, rowIdx) => {
            return (
              <div
                key={rowIdx}
                className={classes.row}
                style={{
                  height: `${window.innerWidth / 20}px`,
                }}
              >
                {row.map((node, nodeIdx) => {
                  const { row, col, value } = node;
                  return (
                    <Game2048Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      value={value}
                    ></Game2048Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className={classes.score}>Total score : {score}</div>
      </div>
      <div className={classes.button}>
        <Button
          onClick={() => {
            getInitialGrid();
          }}
        >
          Generate grid
        </Button>
      </div>
    </div>
  );
};

export default Game2048;
