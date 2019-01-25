// DOM VARIABLES
const gameBoxContainer = document.querySelector('.game-box-container');
const gameBoxes = document.querySelectorAll('.game-box');
const declareWinner = document.querySelector('.declare-winner');
const gamePiece = ['ex','oh'];
let usedPiece;

const winningPatterns = ["123","147","159","258","357","369","456","789"];

let patternsX = [];
let patternsO = [];

// FUNCTIONS
// TODO:
// // every time addMark runs, we need to 
// // add element either to player 1 or player 2 array
// // check both arrays for a match with winningPatterns
// // endgame and declare winning if found, do nothing if not
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
      findMatch(xCombos, winningPatterns);
    } else {
      patternsO.push(parseInt(e.target.classList[1]));
      patternsO.sort();
      let oCombos = getCombinations(patternsO);
      findMatch(oCombos, winningPatterns);
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

// Check for winniner by finding out if 
// one array contains a value found in another array
function findMatch(aryOne, aryTwo) {
  let matches = [];
  for (i = 0; i < aryOne.length; i++) {
    for (j = 0; j < aryTwo.length; j++) {
      if (aryOne[i] == aryTwo[j]) {
        // matches.push(aryOne[i]);
        let winnerText = document.createElement('h2');
        winnerText.textContent = 'We have a winner!';
        declareWinner.insertBefore(winnerText, null);
      }
    }
  }
  // return matches;
}

// EVENT LISTENERS
gameBoxContainer.addEventListener('click', addMark);