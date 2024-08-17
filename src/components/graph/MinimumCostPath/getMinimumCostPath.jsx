const dir = [-1, 0, 1, 0, -1];

const check = (row, col, grid) => {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length)
    return false;
  if (grid[row][col].isVisited || grid[row][col].isWall) return false;
  return true;
};

const setDistanceAndPreviousNode = (grid, top, next_X, next_Y) => {
  if (
    grid[next_X][next_Y].distance >
    top.distance + Math.abs(top.cost - grid[next_X][next_Y].cost)
  ) {
    grid[next_X][next_Y].distance =
      top.distance + Math.abs(top.cost - grid[next_X][next_Y].cost);
    grid[next_X][next_Y].previousNode = top;
  }
};

const shortestPath = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  var visArray = Array(grid.length)
    .fill()
    .map(() => Array(grid[0].length).fill(false));

  var stack = [];
  stack.push(startNode);
  startNode.isVisited = true;
  startNode.distance = 0;
  while (stack.length > 0) {
    var top = stack.pop();
    stack.push(top);
    visitedNodesInOrder.push(top);
    if (!visArray[top.row][top.col]) {
      visArray[top.row][top.col] = true;
      for (var i = 0; i < 4; i++) {
        var next_X = top.row + dir[i];
        var next_Y = top.col + dir[i + 1];
        if (!check(next_X, next_Y, grid)) continue;
        setDistanceAndPreviousNode(grid, top, next_X, next_Y);
        if (grid[next_X][next_Y] != finishNode) {
          grid[next_X][next_Y].isVisited = true;
          stack.push(grid[next_X][next_Y]);
        }
      }
    }
    var topvis = stack.pop();
    if (visArray[topvis.row][topvis.col]) {
      visArray[topvis.row][topvis.col] = false;
      grid[topvis.row][topvis.col].isVisited = false;
    } else {
      stack.push(topvis);
    }
  }
  return visitedNodesInOrder;
};

export const minimumCostPath = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = shortestPath(grid, startNode, finishNode);
  console.log(visitedNodesInOrder);
  return visitedNodesInOrder;
};

export const getNodesInShortestPathOrder = (finishNode) => {
  const nodesInShortestPathOrder = [];
  console.log(finishNode);
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};
