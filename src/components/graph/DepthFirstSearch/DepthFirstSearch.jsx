import React, { useState, useRef, useEffect } from "react";
import {
  getNodesInShortestPathOrder,
  depthfirstsearch,
} from "./getDepthFirstSearch";
import classes from "../Graph.module.css";
import Button from "../../ui/Button";
import { BackButton } from "../../ui/BackButton";
import GraphNode from "../GraphNode";

const DepthFirstSearch = () => {
  const START_NODE_COL = 1;
  const START_NODE_ROW = 1;
  const FINISH_NODE_ROW = 13;
  const FINISH_NODE_COL = 28;
  const ANIMATION_SPEED = 1;
  const graphtype = "dfs";
  var TOTAL_ROW = 15;
  var TOTAL_COL = 45;
  if (window.innerWidth < 800) {
    TOTAL_ROW = 10;
    TOTAL_COL = 30;
  }
  if (window.innerWidth < 400) {
    TOTAL_ROW = 7;
    TOTAL_COL = 20;
  }

  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const arraybarRef = useRef(null);
  const [button, setButton] = useState(false);

  // Step 1
  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: true,
      previousNode: null,
    };
  };

  const refileGrid = () => {
    setButton(false);
    arraybarRef.current.innerHTML = "";
    document.getElementById(
      `node-${START_NODE_ROW}-${START_NODE_COL}-${graphtype}`
    ).className = "node node-start";
    document.getElementById(
      `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}-${graphtype}`
    ).className = "node node-finish";
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
      else arraybarRef.current.innerHTML = "Minimun Distance : " + length;
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
    const visitedNodesInOrder = depthfirstsearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDfs(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.heading}>Depth First Search</div>
      <div className={classes.grid}>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className={classes.row}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <GraphNode
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    graphtype={graphtype}
                    TOTAL_COL={TOTAL_COL}
                  ></GraphNode>
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
          DFS
        </Button>
      </div>
    </div>
  );
};

export default DepthFirstSearch;
