// DOM VARIABLES
const gameBoxContainer = document.querySelector('.game-box-container');
const gameBoxes = document.querySelectorAll('.game-box');
const gamePiece = ['ex','oh'];
const newGame = document.querySelector('.new-game');
let usedPiece;
let game;

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
    } 
  }

// EVENT LISTENERS
gameBoxContainer.addEventListener('click', addMark);

gameBoxes.forEach((box) => {
  box.addEventListener('click', (e) => {
    console.log(e.target);
  });
});

// newGame.addEventListener('click', (e) => {
//   game = {
//     box_one: 'x', box_two: 'x', box_three: 'x',
//     box_four: 'x', box_five: 'x', box_six: 'x',
//     box_seven: 'x', box_eight: 'x', box_nine: 'x',
//   };
//   // console.log(game);
//   gameBoxes.forEach((box) => {
//     Object.keys(game).forEach((key) => {
//       if (key == box.classList[1]) {
//         box.innerHTML = game.box_eight;
//       }
//     });
//   });
//   e.preventDefault();
// });