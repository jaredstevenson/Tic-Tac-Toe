var _ = require ("lodash")

export const X = 'X';
export const O = 'O';


export function turnsPlayed(board) {
  var count = 0;
  board.forEach(function (row) {
    row.forEach(function (entry) {
      if (!!entry) count++;
    })
  })

  return count;
}

export function isTie (board){
  return (turnsPlayed(board)==9 && !hasXWon(board) && !hasOWon(board))
}
export function hasXWon(board){
  return hasPlayerWon(board,X);
}
export function hasOWon(board){
  return hasPlayerWon(board, O);
}

export function hasPlayerWon(board, playerChar) {
//checking columns
  for (var i=0;i <3; i++){
    if (board[0][i]== playerChar && board[1][i]==playerChar && board[2][i]==playerChar){
        return true;
      }
  }
  //checking rows
  for (var i=0;i <3; i++){
    if (board[i][0]== playerChar && board[i][1]==playerChar && board[i][2]==playerChar){
        return true;
      }
  }
  //checking diagnols
  if (board[0][0]==playerChar && board[1][1] == playerChar && board[2][2] == playerChar) return true;
  if (board[0][2]==playerChar && board[1][1] == playerChar && board[2][0] == playerChar) return true;

  return false;
}


export function isOver (board) {

  return isTie(board) || hasXWon(board) || hasOWon(board);
}

export function isXTurn(board) {

  return (turnsPlayed(board)%2 ==0);
}

export function setAtIndex(board, i, j, playerChar) {
  board[i][j] = playerChar;
  return board;
}
export function playAtIndex(board, i, j) {
  if (board[i][j] == null){
    if (isXTurn(board)){
      setAtIndex(board,i,j,X);
    }
    else setAtIndex(board, i,j,O);
  }



}

export function makeAMove(board, row, column, playerChar) {
  var newBoard = _.cloneDeep(board);
  newBoard[row][column] = playerChar;
  return newBoard;
}
var fixedBoard = [[X, O, X],
                  [O, null, null],
                  [null, null, null]];
export function newBoard() {

  // return fixedBoard;

  return [[null, null, null],
      [null, null, null],
      [null, null, null]];
}


/// code dealing with the computer moving



export function computersTurn (board, playerChar){
  var move = bestMove(board, playerChar);
  console.log("move", move);
  playAtIndex(board, move.row, move.column);

}

export function bestMove(board, playerChar) {
  var availMoves = availableMoves(board);
  return _.maxBy(availMoves, function(move){

    return strengthMove(board, move, playerChar);
  })
}

export function strengthMove(board, move, playerChar) {
  var boardWithMove = makeAMove(board, move.row, move.column, playerChar);
  return strength(boardWithMove, playerChar, getOppositePlayer(playerChar));

}

function getOppositePlayer (player) {
  return (player === X) ? O: X;
}

export function strength (board, scoringPlayer, movingPlayer){
  const oppMovingPlayer = getOppositePlayer(movingPlayer);
  var scores = [];

  if (isOver(board)){
      return score(board, scoringPlayer);
  }

  var availMoves = availableMoves(board);
  availMoves.forEach(function(move){
    var boardWithMove = _.cloneDeep(board);
    boardWithMove[move.row][move.column] = movingPlayer;
    scores.push(strength(boardWithMove, scoringPlayer, oppMovingPlayer));

  })

  if (scoringPlayer === movingPlayer){
    return _.max(scores);
  }
  else {
    return _.min(scores);
  }
}

// export function strength (board, playerChar, isCompPlayer) {
//   const otherPlayerChar = (playerChar === X) ? O: X;
//   var scores = [];
//   var availMoves = availableMoves(board);
//
//   if (isOver(board)){
//     return score(board, playerChar, otherPlayerChar);
//   }
//
//
//   availMoves.forEach(function(move){
//     var boardWithMove = _.cloneDeep(board);
//     boardWithMove[move.row][move.column] = playerChar;
//     scores.push(strength(boardWithMove, otherPlayerChar, !isCompPlayer));
//   })
//
//   if (isCompPlayer) {
//     var maxScore = _.max(scores);
//     var maxScoreIndex = scores.indexOf(maxScore);
//     return scores[maxScoreIndex];
//   }else {
//     var minScore = _.min(scores);
//     var minScoreIndex = scores.indexOf(minScore);
//     return scores[minScoreIndex];
//   }
//   throw new Error("shouldn't reach end of strength");
//
// }
// export function canIWin (board, playerChar) {
//     if (isOver(board)) return hasPlayerWon(board, playerChar);
//     board.forEach(function (row) {
//       row.forEach(function (entry) {
//         if (!entry) board[row][entry] = playerChar;
//       })
//     })
// }

function score(board, scoringPlayer) {
  const oppPlayer = getOppositePlayer(scoringPlayer);
  if (hasPlayerWon(board, scoringPlayer)) {
    return 1;
  }else if (hasPlayerWon(board, oppPlayer)) {
    return -1;
  }else return 0;
}

export function availableMoves (board) {
  var avail = [];
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (board[i][j] === null){
        avail.push({row: i, column: j});
      }
    }
  }
  return avail;
}

console.log("availableMoves", availableMoves(newBoard(), X));
