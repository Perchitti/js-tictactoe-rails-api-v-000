

// Code your JavaScript / jQuery solution here
var turn = 0;
var current = 0;

var gameId = 0;


$(document).ready(function(){
  attachListeners();
});

function attachListeners(){
  $('td').on('click', function(){
    if (!$.text(this) && !checkWinner()){
      doTurn(this)
    }
  });
  $('#save').on('click', function(){
    saveGame()
  });
  $('#previous').on('click', function(){
    showPreviousGames()
  });
  $('#clear').on('click', function(){
    resetBoard()
  });
}

function player(){
  if(turn % 2 === 0){
    return 'X';
  }
  else {
    return 'O'
  }
}

function updateState(square){
  $(square).text(player())
  var token = player()
  $(square).text(token)
}

function setMessage(string){
  $("#message").text(string)
}

function currentBoard(){
  var squares = $("td")
  var board = []
  for(var i of squares){
    board.push(i.text)
  }
  return board
}


function validMove(square){
  if(square.innerHTML === ''){
    return true;
  } else {
    return false;
  }
}

function doTurn(square){
  if(validMove(square)){
    updateState(square);
    turn ++;
  }
  gameOver();
}

function checkWinner(){
  var winner = false;
  var board = {};
  const win = [
    [0,1,2], [0,3,6], [0,4,8], [6,4,2], [2,5,8], [6,7,8], [3,4,5], [1,4,7]
  ];
  $('td').text((index, square) => board[index] = square);

  win.find(function(combo) {
    if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
      setMessage(`Player ${board[combo[0]]} Won!`);
      return winner = true;
    }
  });
  return winner;
}


<<<<<<< HEAD
=======
function allGames(){
  $.get("/games").done(function(resp){
    var games = resp.data;
    for(var game of games){
      gameButtons(game)
    }
  })
}



function gameButtons(game){
  var button = `<button id=${game.id}>Game ${game.id}</button>`;
  $('#games').append(button)
}


>>>>>>> 966d60806a33df2a5162bcfd5d2725e61cd14415
function saveGame(){
 var state=[];
  $('td').text((index, square) => {
    state.push(square)
  });
    var gameData = { state: state }
  if (current === 0){
    $.post('/games', {state: state}, function(response) {
      current = response.data.id;
<<<<<<< HEAD
=======

  if (gameId === 0){
    $.post('/games', {state: state}, function(response) {
      gameId = response.data.id;
>>>>>>> 966d60806a33df2a5162bcfd5d2725e61cd14415
      $('#games').append(`<button id="gameid-${response.data.id}">${response.data.id}</button><br>`)
      $("#gameid-" + response.data.id).on('click', function(){
        reloadGame(response.data.id)
      });
    });
  } else {
    $.ajax({
      type: 'PATCH',
<<<<<<< HEAD
      url: `/games/${current}`,
      data: {state: state}
    });
  }
=======
      url: `/games/${currentGame}`,
      data: {state: state}
    });
  })
>>>>>>> 966d60806a33df2a5162bcfd5d2725e61cd14415
}

function isTie(){
  if(turn === 9 && !checkWinner()){
    setMessage("Tie game.");
    setMessage(`Tie game.`);
    return true
  }
}


function resetBoard(){
  $('td').empty()
  turn = 0

}

function showPreviousGames () {
  $('#games').empty()
  $.get('/games', (games) => {
    games.data.map((game) => {
      $('#games').append(`<button id="game-${game.id}" onclick="showGame(${game.id})">${game.id}</button>`)
    })
  })
}

function showGame (id) {
  current = id
  $.get(`/games/${id}`, (game) => {
    var state = game.data.attributes.state
    $('td').each((index, square) => {
      turn = state.join('').length
      square.innerHTML = state[index]
    })
  })

function clearPrevious(){
  $('#games').empty();
}

function resetGame(){
  $('td').empty()
  turn = 0
  gameId = 0
}

function gameOver(){
  if(checkWinner() || isTie()){
    saveGame();
    resetBoard();
    resetGame();
    return true;
  } else {
    return false;
  }
}
