// UI Vars
const gameBoxContainer = document.querySelector('.game-box-container');
const gameBoxes        = Array.from(document.querySelectorAll('.game-box'));
const newGameBtn       = document.querySelector('#new-game-btn');
const newGameDiv       = document.querySelector('.new-game');

// Global Vars
const winningPatterns = ['123','147','159','258','357','369','456','789'];

class Player {
	
	constructor(name, goesFirst, mark) {
		this.name      = name;
		this.goesFirst = goesFirst;
		this.mark      = mark;	
	}
	
}

// Module pattern for GameController object (we only need one)

class GameController {

	constructor() {

	}

	playerPrompt() {
		// insert prompt for player 1 name and mark into DOM
		let name = document.createElement('input');
		// use inputs from above to instantiate Player object
		newGameDiv.appendChild(name);
		console.log('Player Prompt');
	}

	static startGame() {
		newGameBtn.style.display = 'None';
		console.log('Static startGame() called . . . ');
		const newGame = new GameController();
		newGame.playerPrompt();
	}


}

// Event Listeners
newGameBtn.addEventListener('click', GameController.startGame);