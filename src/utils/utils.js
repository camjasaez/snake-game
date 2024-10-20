export const GRID_SIZE = 20;
export const CANVAS_SIZE = 400;
export const GAME_SPEED = 100; // milliseconds

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
