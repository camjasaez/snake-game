const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 20;
const tileCount = canvas.width / GRID_SIZE;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;

function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * GRID_SIZE,
      segment.y * GRID_SIZE,
      GRID_SIZE,
      GRID_SIZE
    );
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

document.addEventListener('keydown', changeDirection);

function generateFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    // La serpiente comió la comida
    generateFood();
  } else {
    snake.pop();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  drawSnake();
  drawFood();
}

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

setInterval(gameLoop, 100);
