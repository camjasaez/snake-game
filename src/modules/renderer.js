import { GRID_SIZE } from '../utils/utils.js';

class Renderer {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvasSize = canvas.width;
    this.scoreElement = document.getElementById('score');
    this.highScoreElement = document.getElementById('highScore');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
  }

  drawSnake(snake) {
    this.ctx.fillStyle = 'green';
    snake.body.forEach((segment) => {
      this.ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
  }

  drawFood(food) {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      food.position.x * GRID_SIZE,
      food.position.y * GRID_SIZE,
      GRID_SIZE,
      GRID_SIZE,
    );
  }

  updateScore(score) {
    this.scoreElement.textContent = `Score: ${score}`;
  }

  updateHighScore(highScore) {
    this.highScoreElement.textContent = `High Score: ${highScore}`;
  }
}

export default Renderer;
