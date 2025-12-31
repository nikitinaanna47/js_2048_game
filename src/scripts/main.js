'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

// Write your code here

import Game from '../modules/Game.class.js';

const SIZE = 4;

const cells = Array.from(document.querySelectorAll('.field-cell'));
const scoreElement = document.querySelector('.game-score');
const button = document.querySelector('.button');

const messageStart = document.querySelector('.message-start');
const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');

const game = new Game([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]);

let hasMadeFirstMove = false;

function renderBoard() {
  const state = game.getState();

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const index = r * SIZE + c;
      const tile = cells[index];
      const value = state[r][c];

      tile.className = 'field-cell';

      if (value !== 0) {
        tile.textContent = String(value);
        tile.classList.add(`field-cell--${value}`);
      } else {
        tile.textContent = '';
      }
    }
  }
}

function renderScore() {
  scoreElement.textContent = String(game.getScore());
}

function renderMessages() {
  const gameStatus = game.getStatus();

  messageStart.classList.toggle('hidden', gameStatus !== 'idle');
  messageLose.classList.toggle('hidden', gameStatus !== 'lose');
  messageWin.classList.toggle('hidden', gameStatus !== 'win');
}

function updateButtonAfterFirstMove() {
  if (!hasMadeFirstMove) {
    hasMadeFirstMove = true;
    button.textContent = 'Restart';
    button.classList.remove('start');
    button.classList.add('restart');
  }
}

function fullRender() {
  renderBoard();
  renderScore();
  renderMessages();
}

button.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
    fullRender();

    return;
  }

  game.restart();
  hasMadeFirstMove = false;
  button.textContent = 'Start';
  button.classList.remove('restart');
  button.classList.add('start');
  fullRender();
});

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  let moved = false;

  switch (e.key) {
    case 'ArrowLeft':
      moved = game.moveLeft();
      break;
    case 'ArrowRight':
      moved = game.moveRight();
      break;
    case 'ArrowUp':
      moved = game.moveUp();
      break;
    case 'ArrowDown':
      moved = game.moveDown();
      break;
    default:
      return;
  }

  if (moved) {
    updateButtonAfterFirstMove();
    fullRender();
  }
});
