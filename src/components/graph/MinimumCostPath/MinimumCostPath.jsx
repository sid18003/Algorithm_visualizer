import React, { useState, useRef, useEffect } from "react";
import {
  getNodesInShortestPathOrder,
  minimumCostPath,
} from "./getMinimumCostPath";
import classes from "../Graph.module.css";
import Button from "../../ui/Button";
import { BackButton } from "../../ui/BackButton";
import MinimumCostPathNode from "./MinimumCostPathNode";

const MinimumCostPath = () => {
  const START_NODE_ROW = 1;
  const START_NODE_COL = 1;
  const FINISH_NODE_ROW = 4;
  const FINISH_NODE_COL = 5;
  const TOTAL_ROW = 5;
  const TOTAL_COL = 6;
  const ANIMATION_SPEED = 1;
  const max = 8;
  const min = 1;
  const graphtype = "mcp";

  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const arraybarRef = useRef(null);
  const [button, setButton] = useState(false);

  // Step 1
  const createNode = (col, row) => {
    return {
      row,
      col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      cost: Math.floor(Math.random() * (max - min + 1) + min),
    };
  };

  const refileGrid = () => {
    setButton(false);
    arraybarRef.current.innerHTML = "";
    for (let row = 0; row < TOTAL_ROW; row++) {
      for (let col = 0; col < TOTAL_COL; col++) {
        document.getElementById(`node-${row}-${col}-${graphtype}`).innerHTML =
          grid[row][col].cost;
        if (row == START_NODE_ROW && col == START_NODE_COL) {
          document.getElementById(`node-${row}-${col}-${graphtype}`).className =
            "node node-start";
        } else if (row == FINISH_NODE_ROW && col == FINISH_NODE_COL) {
          document.getElementById(`node-${row}-${col}-${graphtype}`).className =
            "node node-finish";
        } else {
          document.getElementById(`node-${row}-${col}-${graphtype}`).className =
            "node";
        }
      }
    }
  };

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < TOTAL_ROW; row++) {
      const currentRow = [];
      for (let col = 0; col < TOTAL_COL; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    setGrid(grid);
  };

  useEffect(() => {
    getInitialGrid();
  }, []);

  // Step 2
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  // Step 3
  const animateDfs = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, ANIMATION_SPEED * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(
          `node-${node.row}-${node.col}-${graphtype}`
        ).className = "node node-visited";
      }, ANIMATION_SPEED * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(
          `node-${node.row}-${node.col}-${graphtype}`
        ).className = "node node-shortest-path";
      }, ANIMATION_SPEED * 2 * i);
    }
    var length = nodesInShortestPathOrder.length - 1;
    setTimeout(() => {
      if (length <= 0) arraybarRef.current.innerHTML = "Path not Possible! ";
      else
        arraybarRef.current.innerHTML =
          "Minimun Distance : " + nodesInShortestPathOrder[length].distance;
    }, ANIMATION_SPEED * 2 * length);
  };

  const visualizeDfs = () => {
    setButton(true);
    if (
      START_NODE_ROW == FINISH_NODE_ROW &&
      START_NODE_COL == FINISH_NODE_COL
    ) {
      arraybarRef.current.innerHTML = "Start and Finish are in same point!";
      return;
    }
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    startNode.isWall = false;
    finishNode.isWall = false;
    const visitedNodesInOrder = minimumCostPath(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDfs(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.heading}>Minimum Cost Path</div>
      <div className={classes.grid}>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className={classes.row}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall, cost } = node;
                return (
                  <MinimumCostPathNode
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    cost={cost}
                    graphtype={graphtype}
                  ></MinimumCostPathNode>
                );
              })}
            </div>
          );
        })}
      </div>
      <div ref={arraybarRef} className={classes.answer}></div>
      <div className={classes.button}>
        <Button
          disabled={!button}
          onClick={() => {
            refileGrid();
            getInitialGrid();
          }}
        >
          Generate grid
        </Button>
        <Button
          disabled={button}
          onClick={() => {
            visualizeDfs();
          }}
        >
          Minimum Cost Path
        </Button>
      </div>
    </div>
  );
};

export default MinimumCostPath;
