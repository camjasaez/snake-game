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

    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  start() {
    this.lastUpdateTime = performance.now();
    this.gameLoop();
  }

  gameLoop(currentTime) {
    const deltaTime = currentTime - this.lastUpdateTime;

    if (deltaTime >= GAME_SPEED) {
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
        alert(
          `Game Over! Your score: ${this.scoreManager.getScore()}\nHigh Score: ${this.scoreManager.getHighScore()}`,
        );
        this.reset();
      }
    }, 200);
  }

  reset() {
    this.snake.reset();
    this.food.generate(CANVAS_SIZE, this.snake.body);
    this.scoreManager.resetScore();
    this.isGameOver = false;
    this.start();
  }
}

export default Game;
