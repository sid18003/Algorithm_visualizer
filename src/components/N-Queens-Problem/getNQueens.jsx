var solve = (
  col,
  board,
  animation,
  leftrow,
  upperDiagonal,
  lowerDiagonal,
  n
) => {
  if (col == n) {
    animation.push(board);
    return;
  }
  for (var row = 0; row < n; row++) {
    if (
      leftrow[row] == 0 &&
      lowerDiagonal[row + col] == 0 &&
      upperDiagonal[n - 1 + col - row] == 0
    ) {
      var boardCopy = board.map((row) => [...row]);
      boardCopy[row][col] = "Q";
      leftrow[row] = 1;
      lowerDiagonal[row + col] = 1;
      upperDiagonal[n - 1 + col - row] = 1;
      solve(
        col + 1,
        boardCopy,
        animation,
        leftrow,
        upperDiagonal,
        lowerDiagonal,
        n
      );
      board[row][col] = ".";
      leftrow[row] = 0;
      lowerDiagonal[row + col] = 0;
      upperDiagonal[n - 1 + col - row] = 0;
    }
  }
};

export var solveNQueens = (n) => {
  var animation = [];
  var board = Array(n)
    .fill()
    .map(() => Array(n).fill("."));
  var leftrow = Array(n).fill(0);
  var upperDiagonal = Array(2 * n - 1).fill(0);
  var lowerDiagonal = Array(2 * n - 1).fill(0);
  solve(0, board, animation, leftrow, upperDiagonal, lowerDiagonal, n);
  console.log(animation);
  return animation;
};
