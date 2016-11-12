// ****************************************************************
//
// TicTacToe
// game.js
// Author: Fernando Leira
//
// ****************************************************************

function has_mark(box_id){
  var $idS = $('#' + box_id.toString());
  var child = $idS.children();

  if (child.length > 0) {
    return true;
  }
  else {
    return false;
  }
}

function move(box_id, turn){
  var $idS = $('#' + box_id.toString());
  var letter;

  if (turn) {
    letter = 'X';
  } else {
    letter = 'O';
  }

  $idS.addClass(letter)
  $idS.append('<p>' + letter + '</p>');

}

function check_gameOver(){
  var id1;
  var id2;
  var id3;
  var class1;
  var class2;
  var class3;
  var win = false;
  var over = true;

  // Check columns
  for (var i = 0; i < 3; i++) {
    id1 = 0 + i;
    id2 = 3 + i;
    id3 = 6 + i;
    class1 = $('#' + id1.toString()).attr('class');
    class2 = $('#' + id2.toString()).attr('class');
    class3 = $('#' + id3.toString()).attr('class');

    if (class1 != 'box' && (class1 == class2 && class1 == class3)) {
      win = true;
    }
  }

  // Check rows
  for (var l = 0; l < 3; l++) {
    id1 = l * 3;
    id2 = l * 3 + 1;
    id3 = l * 3 + 2;
    class1 = $('#' + id1.toString()).attr('class');
    class2 = $('#' + id2.toString()).attr('class');
    class3 = $('#' + id3.toString()).attr('class');

    if (class1 != 'box' && (class1 == class2 && class1 == class3)) {
      win = true;
    }
  }

  // Check Diagonal
  id1 = 0;
  id2 = 4;
  id3 = 8;
  class1 = $('#' + id1.toString()).attr('class');
  class2 = $('#' + id2.toString()).attr('class');
  class3 = $('#' + id3.toString()).attr('class');
  if (class1 != 'box' && (class1 == class2 && class1 == class3)) {
    win = true;
  }

  id1 = 2;
  id2 = 4;
  id3 = 6;
  class1 = $('#' + id1.toString()).attr('class');
  class2 = $('#' + id2.toString()).attr('class');
  class3 = $('#' + id3.toString()).attr('class');
  if (class1 != 'box' && (class1 == class2 && class1 == class3)) {
    win = true;
  }

  // Check Draw
  if (!win) {
    for (var l = 0; l < 3; l++){
      for (var i = 0; i < 3; i++){
        id1 = l * 3 + i;

        if (!has_mark(id1)) {
          over = false;
        }
      }
    }

  }

  return [over, win];
}

function setText(points1, points2, winner){
  var winner_text;

  if (winner == "None") {
    winner_text = "Draw!";
  }
  else {
    winner_text = 'Player ' + winner + ' wins!';
  }

  $('.result_text').text(winner_text);
  $('.score1').text('Player 1: ' + points1.toString());
  $('.score2').text('Player 2: ' + points2.toString());
}

var window_height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var window_width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var grid_size;
if (window_height < window_width) grid_size = window_height * .8;
else grid_size = window_width * .8;

var GameBoard = new GridBoard(3, 3, grid_size, grid_size);

var turn1;
var points1 = 0;
var points2 = 0;

var game_control = [];
var gameOver = false;
var winner;
var winner_p;

var box_id;
var box_class;

var main = function(){

  turn1 = true;
  GameBoard.make_board();
  GameBoard.make_boxes();

  $('.board').hide();
  $('.board').fadeIn('slow');

  $('.box').click(function() {
    box_id = $(this).attr('id');

    if (!has_mark(box_id)) move(box_id, turn1);

    box_class = $(this).attr('class');

    game_control = check_gameOver();
    gameOver = game_control[0];
    winner = game_control[1];

    if (gameOver){

      if (winner) {
        if (turn1) {
          points1++;
          winner_p = '1';
        }
        else {
          points2++;
          winner_p = '2';
        }
      }
      else {
        winner_p = "None";
      }

      setText(points1, points2, winner_p);
      $('.board').fadeOut('slow');
      $('.over').fadeIn('slow');
    }

    turn1 = !turn1;

  });

}

$(document).ready(function() {
  main();

  $('.btn').click(function() {
    $('.board').remove();
    $('.over').fadeOut('slow');

    main();

  });
});
