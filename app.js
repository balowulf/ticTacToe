// DOM VARIABLES
const gameBoxContainer = document.querySelector('.game-box-container');
const gameBoxes = document.querySelectorAll('.game-box');

// CLASSES
class Game { 

  constructor() { }

  static addMark(e) {
    let box = e.target;
    let boxName = e.target.classList[1];
    box.innerHTML = 'X';
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