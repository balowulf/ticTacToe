/******** UI Vars ********/

const newGameBtn       = document.querySelector('#new-game-btn');
const gameBoxContainer = document.querySelector('.game-box-container');
const gameInfo         = document.querySelector('.game-info');
const gameBoxes        = Array.from(document.querySelectorAll('.game-box'));
const gamePiece        = ['X','O'];

/******** Global Vars ********/

gameInfo.style.display = 'none';
let freeSpaces = gameBoxes.filter(e => !e.classList.contains('selected'));
let patternsX = [];
let patternsO = [];
const winningPatterns = ['123','147','159','258','357','369','456','789'];

/******** Objects ********/

const GameBoard = (() => {

	const start = () => {

		newGameBtn.style.display = 'none';
	  patternsO = [];
  	patternsX = [];
		gameBoxes.forEach((box) => {
  	  box.classList.remove('O', 'X', 'selected');
	  });

		// set message "Player 1's Turn"
		gameInfo.style.display = 'inline';
		gameInfo.innerText = `${gamePiece[0]}'s Turn`;

	}

	function addMark(e) {
	  // verify that target is in the gamebox, and that new-game button has been clicked
	  if (!e.target.classList.contains('game-box') || newGameBtn.style.display !== 'none') {
	    return;
	  }
	  // verify that box hasn't already been used
	  if (!e.target.classList.contains('selected')) {
	    
	    // add 'selected' class to clicked box and gamePiece class
	    let box = e.target;
	    box.classList.add('selected');
	    box.classList.add(gamePiece[0]);
	    
	    // switch piece used
	    usedPiece = gamePiece.shift();
	    gamePiece.push(usedPiece);
	    gameInfo.innerText = `${gamePiece[0]}'s Turn`
	    
	    // if player1 (X) used turn
	    if (e.target.classList.contains('X')) {
	      // push selected box into new array and sort array
	      patternsX.push(parseInt(e.target.classList[1]));
	      patternsX.sort();
	      
	      // check if player1 won game
	      let xCombos = GameController.getCombinations(patternsX);
	      GameController.findMatch(xCombos, winningPatterns, gamePiece[0]);
	    } else {
	      // player2 used turn
	      // push selected box into new array and sort array
	      patternsO.push(parseInt(e.target.classList[1]));
	      patternsO.sort();
	      
	      // check if player2 won game
	      let oCombos = GameController.getCombinations(patternsO);
	      GameController.findMatch(oCombos, winningPatterns, gamePiece[0]);
	    }
	  } 
	}

	return { start, addMark }

})();

const GameController = (() => {
	
	// Check for winner by finding out if 
	// one array contains a value found in another array
	function findMatch(aryOne, aryTwo, text) {
	  let matches = [];
	  for (i = 0; i < aryOne.length; i++) {
	    for (j = 0; j < aryTwo.length; j++) {
	      // we found a match
	      if (aryOne[i] == aryTwo[j]) {
	        gameOver(false);
	      }
	      // no match, and all GameBoard spaces are used up
	      else if (aryOne[i] !== aryTwo[j] && gameBoxes.filter(e => !e.classList.contains('selected')).length === 0) {
	        gameOver(true);
	      }
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

	function gameOver(tie) {
		if (tie === false) {
			gameInfo.innerText = `${gamePiece[1]} is the winner!`;
			replay();
		} else {
			gameInfo.innerText = 'Tie game!';
			replay();
		}
	}

	function replay() {

		// disable input of gameBoxes (removeEventListener?)

		setTimeout(() => {
			gameInfo.style.display = 'none';
			newGameBtn.style.display = 'inline';
		}, 2000)

	}

	return { findMatch, getCombinations, gameOver, replay }

})();


/******** Event Listeners ********/

newGameBtn.addEventListener('click', GameBoard.start);
gameBoxContainer.addEventListener('click', GameBoard.addMark);