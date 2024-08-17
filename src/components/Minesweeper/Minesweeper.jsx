import React, { useState, useRef, useEffect } from "react";
import classes from "./Minesweeper.module.css";
import Button from "../ui/Button";
import { BackButton } from "../ui/BackButton";
import MinesweeperNode from "./MinesweeperNode";
import { getMinesweeper } from "./getMinesweeper";

const Minesweeper = () => {
  var TOTAL_ROW = 15;
  var TOTAL_COL = 45;
  if (window.innerWidth < 800) {
    TOTAL_ROW = 15;
    TOTAL_COL = 30;
  }
  if (window.innerWidth < 400) {
    TOTAL_ROW = 15;
    TOTAL_COL = 20;
  }

  const [grid, setGrid] = useState([]);
  const [nextPlay, setNextPlay] = useState(true);

  const createNode = (row, col) => {
    return {
      row,
      col,
      distance: 0,
      isRevealed: false,
      isMine: Math.floor(Math.random() * 100) > 82,
    };
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
    setGrid(grid);
    setNextPlay(true);
  };

  useEffect(() => {
    getInitialGrid();
  }, []);

  const PlayMinesweeper = (row, col) => {
    if (nextPlay == false) return;
    const { board, result } = getMinesweeper(grid, row, col);
    setNextPlay(result);
    setGrid([...board]);
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.heading}>Minesweeper Game </div>
      <div className={classes.grid}>
        {grid.map((row, rowIdx) => {
          return (
            <div
              key={rowIdx}
              className={classes.row}
              style={{
                height: `${window.innerWidth / 50}px`,
              }}
            >
              {row.map((node, nodeIdx) => {
                const { row, col, distance, isMine, isRevealed } = node;
                return (
                  <MinesweeperNode
                    key={nodeIdx}
                    col={col}
                    row={row}
                    distance={distance}
                    isMine={isMine}
                    isRevealed={isRevealed}
                    onClick={() => {
                      PlayMinesweeper(row, col);
                    }}
                    TOTAL_COL={TOTAL_COL}
                  ></MinesweeperNode>
                );
              })}
            </div>
          );
        })}
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

export default Minesweeper;
