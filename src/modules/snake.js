import { GRID_SIZE } from '../utils/utils.js';

class Snake {
  constructor() {
    this.body = [{ x: 10, y: 10 }];
    this.direction = { x: 0, y: 0 };
  }

  move() {
    const head = { x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y };
    this.body.unshift(head);
    if (!this.growing) {
      this.body.pop();
    }
    this.growing = false;
  }

  changeDirection(keyCode) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    switch (keyCode) {
      case LEFT_KEY:
        if (this.direction.x === 0) this.direction = { x: -1, y: 0 };
        break;
      case UP_KEY:
        if (this.direction.y === 0) this.direction = { x: 0, y: -1 };
        break;
      case RIGHT_KEY:
        if (this.direction.x === 0) this.direction = { x: 1, y: 0 };
        break;
      case DOWN_KEY:
        if (this.direction.y === 0) this.direction = { x: 0, y: 1 };
        break;
    }
  }

  checkCollision(canvasSize) {
    const head = this.body[0];
    if (
      head.x < 0 ||
      head.x >= canvasSize / GRID_SIZE ||
      head.y < 0 ||
      head.y >= canvasSize / GRID_SIZE
    ) {
      return true;
    }

    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }

    return false;
  }

  eatFood(food) {
    const head = this.body[0];
    if (head.x === food.position.x && head.y === food.position.y) {
      this.growing = true;
      return true;
    }
    return false;
  }

  reset() {
    this.body = [{ x: 10, y: 10 }];
    this.direction = { x: 0, y: 0 };
  }
}

export default Snake;
