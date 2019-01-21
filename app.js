// DOM VARIABLES
const gameBoxContainer = document.querySelector('.game-box-container');
const gameBoxes = document.querySelectorAll('.game-box');
const gamePiece = ['X', 'O'];

// CLASSES
class Game { 

  constructor() { }

  static addMark(e) {
    console.log(gamePiece);
    if (!e.target.classList.contains('game-box')) {
      return;
    }
    if (!e.target.classList.contains('selected')) {
      let box = e.target;
      box.classList.add('selected');
      box.innerHTML = gamePiece[0];
      let usedPiece = gamePiece.shift();
      gamePiece.push(usedPiece);
    } 
  }

  switchTurn() { }
  
  gameOver() { }

}

class Player { 

  constructor() { }

}

class GameBoard { 

  constructor() { 
    const gameArray = {
      rowOne  : ['box-one', 'box-two', 'box-three'],
      rowTwo  : ['box-four', 'box-five', 'box-six'],
      rowThree: ['box-seven', 'box-eight', 'box-nine']
    };
  }

}

// EVENT LISTENERS
gameBoxContainer.addEventListener('click', Game.addMark);