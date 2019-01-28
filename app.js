// DOM VARIABLES
const gameBoxContainer = document.querySelector('.game-box-container');
const gameBoxes        = document.querySelectorAll('.game-box');
const declareWinner    = document.querySelector('.declare-winner');
const newGame          = document.querySelector('#new-game-btn');
const gamePiece        = ['ex','oh'];
let usedPiece;

const winningPatterns = ["123","147","159","258","357","369","456","789"];

let patternsX = [];
let patternsO = [];

// FUNCTIONS
function addMark(e) {
  if (!e.target.classList.contains('game-box')) {
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
  var result = [];
  var f = function(prefix, chars) {
    for (var i = 0; i < chars.length; i++) {
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
  for (i = 0; i < aryOne.length; i++) {
    for (j = 0; j < aryTwo.length; j++) {
      if (aryOne[i] == aryTwo[j]) {
        // matches.push(aryOne[i]);
        let winnerText = document.createElement('h2');
        winnerText.textContent = `${text} is the winner!`;
        declareWinner.insertBefore(winnerText, null);
        newGame.style.display = 'inline';
      }
    }
  }
  // return matches;
}

// EVENT LISTENERS
gameBoxContainer.addEventListener('click', addMark);
newGame.addEventListener('click', (e) => {
  e.target.style.display = 'none';
  declareWinner.textContent = '';
  gameBoxes.forEach((box) => {
    box.classList.remove('oh', 'ex', 'selected');
  });
  e.preventDefault();
});