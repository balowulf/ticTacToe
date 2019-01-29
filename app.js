// DOM VARIABLES
const gameBoxContainer = document.querySelector('.game-box-container');
const gameBoxes        = Array.from(document.querySelectorAll('.game-box'));
const declareWinner    = document.querySelector('.declare-winner');
const newGame          = document.querySelector('#new-game-btn');
const gamePiece        = ['ex','oh'];
let usedPiece;

const winningPatterns = ['123','147','159','258','357','369','456','789'];
let freeSpaces        = gameBoxes.filter(e => !e.classList.contains('selected'));


let patternsX = [];
let patternsO = [];

// FUNCTIONS
function addMark(e) {
  if (!e.target.classList.contains('game-box') || newGame.style.display !== 'none') {
    return;
  }
  if (!e.target.classList.contains('selected')) {
    let box = e.target;
    box.classList.add('selected');
    box.classList.add(gamePiece[0]);
    usedPiece = gamePiece.shift();
    gamePiece.push(usedPiece);
    if (e.target.classList.contains('ex')) {
      patternsX.push(parseInt(e.target.classList[1]));
      patternsX.sort();
      let xCombos = getCombinations(patternsX);
      findMatch(xCombos, winningPatterns, 'X');
    } else {
      patternsO.push(parseInt(e.target.classList[1]));
      patternsO.sort();
      let oCombos = getCombinations(patternsO);
      findMatch(oCombos, winningPatterns, 'O');
    }
  } 
}

// get every possible 3-digit combination of every element in array
function getCombinations(chars) {
  let result = [];
  let f = function(prefix, chars) {
    for (let i = 0; i < chars.length; i++) {
      result.push(prefix + chars[i]);
      f(prefix + chars[i], chars.slice(i + 1));
    }
  }
  f('', chars);
  filteredResult = result.filter(e => e.length === 3);
  return filteredResult;
}

// Check for winner by finding out if 
// one array contains a value found in another array
function findMatch(aryOne, aryTwo, text) {
  let matches = [];
  let winnerText = document.createElement('h2');
  for (i = 0; i < aryOne.length; i++) {
    for (j = 0; j < aryTwo.length; j++) {
      if (aryOne[i] == aryTwo[j]) {
        winnerText.textContent = `${text} is the winner!`;
        declareWinner.insertBefore(winnerText, null);
        newGame.style.display = 'inline';
      }
      else if (aryOne[i] !== aryTwo[j] && gameBoxes.filter(e => !e.classList.contains('selected')).length === 0) {
        winnerText.textContent = `Tie game!`;
        declareWinner.insertBefore(winnerText, null);
        newGame.style.display = 'inline';
      }
    }
  }
}

// EVENT LISTENERS
gameBoxContainer.addEventListener('click', addMark);
newGame.addEventListener('click', (e) => {
  e.target.style.display = 'none';
  declareWinner.textContent = '';
  patternsO = [];
  patternsX = [];
  gameBoxes.forEach((box) => {
    box.classList.remove('oh', 'ex', 'selected');
  });
  e.preventDefault();
});