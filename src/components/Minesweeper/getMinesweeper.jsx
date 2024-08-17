export const getMinesweeper = (board, row, col) => {
  var i = row,
    j = col;
  if (board[i][j].isMine) {
    board[i][j].isRevealed = true;
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j].isMine) board[i][j].isRevealed = true;
      }
    }
    var result = false;
    return { board, result };
  }
  var n = board.length,
    m = board[0].length;
  var q = [];
  q.push([i, j]);
  var dir = [-1, 0, 1, 0, -1, -1, 1, 1, -1];
  var vis = Array(n)
    .fill()
    .map(() => Array(m).fill(false));

  while (q.length > 0) {
    var it = q.pop();
    var current_i = it[0];
    var current_j = it[1];
    vis[current_i][current_j] = true;
    var adjacent_bomb = 0;
    for (var next_move = 0; next_move < dir.length - 1; next_move++) {
      var next_i = current_i + dir[next_move];
      var next_j = current_j + dir[next_move + 1];
      if (
        Math.min(next_i, next_j) >= 0 &&
        next_i < n &&
        next_j < m &&
        vis[next_i][next_j] == false
      ) {
        if (board[next_i][next_j].isMine) ++adjacent_bomb;
      }
    }
    if (adjacent_bomb == 0) {
      board[current_i][current_j].isRevealed = true;
      for (var next_move = 0; next_move < dir.length - 1; next_move++) {
        var next_i = current_i + dir[next_move];
        var next_j = current_j + dir[next_move + 1];
        if (
          Math.min(next_i, next_j) >= 0 &&
          next_i < n &&
          next_j < m &&
          board[next_i][next_j].isRevealed == false
        ) {
          q.push([next_i, next_j]);
          board[next_i][next_j].isRevealed = true;
        }
      }
    } else {
      board[current_i][current_j].isRevealed = true;
      board[current_i][current_j].distance = adjacent_bomb;
    }
  }
  console.log(board);
  var result = true;
  return { board, result };
};
