import { GRID_SIZE } from '../utils/utils.js';

class Food {
  constructor() {
    this.position = { x: 15, y: 15 };
  }

  generate(canvasSize, snakeBody) {
    const gridSize = canvasSize / GRID_SIZE;
    let newPosition;
    do {
      newPosition = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
    } while (this.checkCollisionWithSnake(newPosition, snakeBody));

    this.position = newPosition;
  }

  checkCollisionWithSnake(position, snakeBody) {
    return snakeBody.some((segment) => segment.x === position.x && segment.y === position.y);
  }
}

export default Food;
