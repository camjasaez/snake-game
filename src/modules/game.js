import Snake from './snake.js';
import Food from './food.js';
import Renderer from './renderer.js';
import ScoreManager from './scoreManager.js';
import { GRID_SIZE, CANVAS_SIZE, GAME_SPEED } from '../utils/utils.js';

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.renderer = new Renderer(this.canvas);
    this.snake = new Snake();
    this.food = new Food();
    this.scoreManager = new ScoreManager();
    this.isGameOver = false;
    this.lastUpdateTime = 0;
    this.gameSpeed = 150; // Changed to 150 (Easy mode) as default
    this.difficultyTexts = {
      150: { name: 'Easy', description: 'Take your time and enjoy the game' },
      100: { name: 'Medium', description: 'Use arrow keys to control the snake' },
      50: { name: 'Hard', description: 'Quick reflexes required!' },
    };

    // Set initial difficulty text
    const difficultyText = document.querySelector('.difficulty-text');
    const controlText = document.querySelector('.control-text');
    if (difficultyText && controlText) {
      difficultyText.textContent = `Mode: ${this.difficultyTexts[this.gameSpeed].name}`;
      controlText.textContent = this.difficultyTexts[this.gameSpeed].description;
      difficultyText.classList.add('difficulty-easy');
    }

    this.initializeWelcomeModal();
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  initializeWelcomeModal() {
    const welcomeModal = document.getElementById('welcomeModal');
    const startButton = document.getElementById('startButton');
    const difficultyButtons = document.querySelectorAll('.difficulty-button');
    const difficultyText = document.querySelector('.difficulty-text');
    const controlText = document.querySelector('.control-text');

    // Ensure Easy is selected by default
    difficultyButtons.forEach((button) => {
      if (parseInt(button.dataset.speed) === 150) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });

    // Handle difficulty selection
    difficultyButtons.forEach((button) => {
      button.addEventListener('click', () => {
        difficultyButtons.forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
        this.gameSpeed = parseInt(button.dataset.speed);

        const difficulty = this.difficultyTexts[this.gameSpeed];
        difficultyText.textContent = `Mode: ${difficulty.name}`;
        controlText.textContent = difficulty.description;

        difficultyText.classList.remove('difficulty-easy', 'difficulty-medium', 'difficulty-hard');
        difficultyText.classList.add(`difficulty-${difficulty.name.toLowerCase()}`);
      });
    });

    startButton.addEventListener('click', () => {
      welcomeModal.classList.remove('show');
      this.start();
    });
  }

  updateDifficultyDisplay() {
    const difficultyText = document.querySelector('.difficulty-text');
    const controlText = document.querySelector('.control-text');
    const difficulty = this.difficultyTexts[this.gameSpeed];

    difficultyText.textContent = `Mode: ${difficulty.name}`;
    controlText.textContent = difficulty.description;

    // Update color class
    difficultyText.classList.remove('difficulty-easy', 'difficulty-medium', 'difficulty-hard');
    difficultyText.classList.add(`difficulty-${difficulty.name.toLowerCase()}`);
  }
  start() {
    // Reset game state
    this.isGameOver = false;
    this.snake.reset();
    this.food.generate(CANVAS_SIZE, this.snake.body);
    this.scoreManager.resetScore();
    this.lastUpdateTime = performance.now();
    this.gameLoop();
  }

  gameLoop(currentTime) {
    const deltaTime = currentTime - this.lastUpdateTime;

    if (deltaTime >= this.gameSpeed) {
      // Use dynamic game speed
      this.update();
      this.render();
      this.lastUpdateTime = currentTime;
    }

    if (!this.isGameOver) {
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  update() {
    this.snake.move();

    if (this.snake.checkCollision(CANVAS_SIZE)) {
      this.gameOver();
      return;
    }

    if (this.snake.eatFood(this.food)) {
      this.scoreManager.increaseScore();
      this.food.generate(CANVAS_SIZE, this.snake.body);
    }
  }

  render() {
    this.renderer.clear();
    this.renderer.drawSnake(this.snake);
    this.renderer.drawFood(this.food);
    this.renderer.updateScore(this.scoreManager.getScore());
    this.renderer.updateHighScore(this.scoreManager.getHighScore());
  }

  handleKeyPress(event) {
    this.snake.changeDirection(event.keyCode);
  }

  gameOver() {
    this.isGameOver = true;
    this.scoreManager.updateHighScore();

    // Efecto de parpadeo
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      this.canvas.style.opacity = flashCount % 2 === 0 ? '0.5' : '1';
      flashCount++;
      if (flashCount > 6) {
        clearInterval(flashInterval);
        this.canvas.style.opacity = '1';

        // Show modal instead of alert
        const modal = document.getElementById('gameOverModal');
        const modalScore = document.getElementById('modalScore');
        modalScore.textContent = `Score: ${this.scoreManager.getScore()}\nHigh Score: ${this.scoreManager.getHighScore()}`;
        modal.classList.add('show');

        // Handle restart button
        const restartButton = document.getElementById('restartButton');
        const handleRestart = () => {
          modal.classList.remove('show');
          this.reset();
          restartButton.removeEventListener('click', handleRestart);
        };
        restartButton.addEventListener('click', handleRestart);
      }
    }, 200);
  }

  reset() {
    this.snake.reset();
    this.food.generate(CANVAS_SIZE, this.snake.body);
    this.scoreManager.resetScore();
    this.isGameOver = false;

    // Update difficulty display when resetting
    this.updateDifficultyDisplay();

    // Hide modal if visible
    const modal = document.getElementById('gameOverModal');
    modal.classList.remove('show');

    this.start();
  }
}

export default Game;
