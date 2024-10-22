import Game from './modules/game.js';

document.addEventListener('DOMContentLoaded', () => {
  new Game('gameCanvas');
  // Note: removed the automatic game.start() call since it will be triggered by the start button
});
