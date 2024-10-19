const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
document.addEventListener('keydown', changeDirection);

const GRID_SIZE = 20;
const tileCount = canvas.width / GRID_SIZE;

let snake = [{ x: 10, y: 10 }];
const food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;

let score = 0;
const scoreElement = document.getElementById('score');

/**
 * Draws the snake on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Array<Object>} snake - The snake, where each object has
 *   x and y properties representing the segment's position on the
 *   game board.
 */
function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  });
}

/**
 * Draws the food on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Object} food - The food, with x and y properties representing
 *   the food's position on the game board.
 */
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

/**
 * Generates a new random position for the food on the game board.
 * The new position is stored in the food variable.
 */
function generateFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

/**
 * Moves the snake on the game board.
 * The snake moves in the direction set by dx and dy.
 * If the snake eats the food, a new food position is generated
 * and the snake grows. Otherwise, a new segment is added to the
 * snake's head and the tail segment is removed.
 */
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    // The snake ate the food
    score += 10;
    updateScore();
    generateFood();
  } else {
    snake.pop();
  }
}

/**
 * Changes the snake's direction based on the key pressed.
 * This function is called on the 'keydown' event and changes
 * the snake's direction according to the arrow key pressed.
 * @param {KeyboardEvent} event - The key press event.
 */
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  if (keyPressed === LEFT_KEY && dx === 0) {
    dx = -1;
    dy = 0;
  }
  if (keyPressed === UP_KEY && dy === 0) {
    dx = 0;
    dy = -1;
  }
  if (keyPressed === RIGHT_KEY && dx === 0) {
    dx = 1;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && dy === 0) {
    dx = 0;
    dy = 1;
  }
}

/**
 * Checks if the snake has collided with the borders or its own body.
 * @returns {boolean} true if the snake has collided, false otherwise.
 */
function checkCollision() {
  const head = snake[0];

  // Collision with borders
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return true;
  }

  // Collision with body
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

/**
 * Updates the score display element with the current score.
 */
function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}
/**
 * Main game loop.
 * Clears the canvas, moves the snake, checks for collisions,
 * and draws the snake and food on the canvas.
 */
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();

  if (checkCollision()) {
    alert('Game Over!');
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    updateScore();
  }

  drawSnake();
  drawFood();
}

setInterval(gameLoop, 100);
