import Game from './modules/game.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game('gameCanvas');
  game.start();
});
