const { moveSnake, growSnake, checkCollision } = require('./snake.js');

describe('Snake Game Logic Tests', () => {

  test('moveSnake should move the snake in the correct direction', () => {
    const snake = [{ x: 40, y: 20 }, { x: 20, y: 20 }];
    const dx = 20;
    const dy = 0;
    const newSnake = moveSnake(snake, dx, dy);
    expect(newSnake[0]).toEqual({ x: 60, y: 20 });
    expect(newSnake.length).toBe(snake.length);
  });

  test('growSnake should add one segment at the tail', () => {
    const snake = [{ x: 40, y: 20 }, { x: 20, y: 20 }];
    const newSnake = growSnake(snake);
    expect(newSnake.length).toBe(snake.length + 1);
    expect(newSnake[newSnake.length - 1]).toEqual({ x: 20, y: 20 });
  });

  test('checkCollision detects wall collision (left)', () => {
    const snake = [{ x: -20, y: 0 }];
    const result = checkCollision(snake, 400);
    expect(result).toBe(true);
  });

  test('checkCollision detects wall collision (right)', () => {
    const snake = [{ x: 400, y: 0 }];
    const result = checkCollision(snake, 400);
    expect(result).toBe(true);
  });

  test('checkCollision detects self collision', () => {
    const snake = [
      { x: 60, y: 60 },
      { x: 40, y: 60 },
      { x: 20, y: 60 },
      { x: 60, y: 60 } // head hits itself
    ];
    const result = checkCollision(snake, 400);
    expect(result).toBe(true);
  });

  test('checkCollision returns false when no collision', () => {
    const snake = [
      { x: 60, y: 60 },
      { x: 40, y: 60 },
      { x: 20, y: 60 }
    ];
    const result = checkCollision(snake, 400);
    expect(result).toBe(false);
  });

});
