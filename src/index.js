var angular = require('angular');
var app = angular.module('App', []);
var model = require('./model.js');

require('./style.css');


app.controller('MainController', [ function(){

  this.computersTurn = model.computersTurn;
  this.humanPlayer = model.X;
  this.computerPlayer = model.O;
  this.board = model.newBoard();
  this.getBoardPosition = function(board, i, j) {
    return board[i][j];
  }

  this.onClickAtIndex = function(board, i, j) {
    if (isHumanTurn(board, this.humanPlayer)){
      if (!model.isOver(board)) model.playAtIndex(board, i, j)
    }
    if (!model.isOver(board)) this.computersTurn(this.board, this.computerPlayer);
  }
  this.isGameOver = model.isOver;
  this.didXWin = model.hasXWon;
  this.didOWin = model.hasOWon;
  this.isTie = model.isTie;
  this.reset = function (){
    this.board = model.newBoard();
  }
}])

function isHumanTurn (board, humanPlayer) {
  if (humanPlayer === model.X)  return model.isXTurn(board);
  else return (!model.isXturn(board));
}

function isComputerTurn (board, humanPlayer) {
  return (!isHumanTurn(board, humanPlayer));
}
