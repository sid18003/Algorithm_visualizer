const checkBoardIsFill = (board) => {
  var count = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].value == "") ++count;
    }
  }
  return count;
};

const Filter_Blank_Row = (row, i) => {
  var New_row = [];
  var a = 0;
  for (var j = 0; j < row.length; j++) {
    if (row[j].value != "") {
      New_row.push({ row: i, col: a, value: +row[j].value });
      ++a;
    }
  }
  while (New_row.length < row.length) {
    New_row.push({ row: i, col: a, value: "" });
    ++a;
  }
  return New_row;
};

const Filter_Blank_Col = (row, i) => {
  var New_row = [];
  var a = 0;
  for (var j = 0; j < row.length; j++) {
    if (row[j].value != "") {
      New_row.push({ row: a, col: i, value: +row[j].value });
      ++a;
    }
  }
  while (New_row.length < row.length) {
    New_row.push({ row: a, col: i, value: "" });
    ++a;
  }
  return New_row;
};

const Filter_Row = (row, i) => {
  row = Filter_Blank_Row(row, i);
  var score = 0;
  for (var j = 0; j < row.length - 1; j++) {
    if (row[j].value == row[j + 1].value) {
      row[j].value = +row[j].value * 2;
      row[j + 1].value = "";
      score += +row[j].value;
    }
  }
  row = Filter_Blank_Row(row, i);
  return { score, row };
};

const Filter_Col = (row, i) => {
  row = Filter_Blank_Col(row, i);
  var score = 0;
  for (var j = 0; j < row.length - 1; j++) {
    if (row[j].value == row[j + 1].value) {
      row[j].value = +row[j].value * 2;
      row[j + 1].value = "";
      score += +row[j].value;
    }
  }
  row = Filter_Blank_Col(row, i);
  return { score, row };
};

const set_Board_In_Correct_Way_left = (board) => {
  var Final_Score = 0;
  for (var i = 0; i < board.length; i++) {
    var { score, row } = Filter_Row(board[i], i);
    board[i] = row;
    Final_Score += +score;
  }
  return { Final_Score, board };
};

const set_Board_In_Correct_Way_Right = (board) => {
  var Final_Score = 0;
  for (var i = 0; i < board.length; i++) {
    var { score, row } = Filter_Row(board[i].reverse(), i);
    board[i] = row.reverse();
    Final_Score += +score;
  }
  return { Final_Score, board };
};

const set_Board_In_Correct_Way_Up = (board) => {
  var Final_Score = 0;
  for (var i = 0; i < board[0].length; i++) {
    var temp_Up = [];
    for (var ii = 0; ii < board.length; ii++) {
      temp_Up.push(board[ii][i]);
    }
    var { score, row } = Filter_Col(temp_Up, i);
    for (var ii = 0; ii < board.length; ii++) {
      board[ii][i] = row[ii];
    }
    Final_Score += +score;
  }
  return { Final_Score, board };
};

const set_Board_In_Correct_Way_Down = (board) => {
  var Final_Score = 0;
  for (var i = 0; i < board[0].length; i++) {
    var temp_Up = [];
    for (var ii = 0; ii < board.length; ii++) {
      temp_Up.push(board[ii][i]);
    }
    var { score, row } = Filter_Col(temp_Up.reverse(), i);
    row = row.reverse();
    for (var ii = 0; ii < board.length; ii++) {
      board[ii][i] = row[ii];
    }
    Final_Score += +score;
  }
  return { Final_Score, board };
};

export const getGame2048 = (board, score, direction) => {
  switch (direction) {
    case "left":
      var { Final_Score, board } = set_Board_In_Correct_Way_left(board);
      break;
    case "up":
      var { Final_Score, board } = set_Board_In_Correct_Way_Up(board);
      break;
    case "right":
      var { Final_Score, board } = set_Board_In_Correct_Way_Right(board);
      break;
    case "down":
      var { Final_Score, board } = set_Board_In_Correct_Way_Down(board);
      break;
    default:
      break;
  }
  const count = checkBoardIsFill(board);
  Final_Score += score;
  return { board, count, Final_Score };
};
