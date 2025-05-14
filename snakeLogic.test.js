const { moveSnake, growSnake, checkCollision } = require('./snakeLogic');

describe('Snake Logic', () => {
  test('moveSnake moves correctly', () => {
    const snake = [{ x: 40, y: 20 }, { x: 20, y: 20 }];
    const moved = moveSnake(snake, 20, 0);
    expect(moved[0]).toEqual({ x: 60, y: 20 });
  });

  test('growSnake increases length by 1', () => {
    const snake = [{ x: 40, y: 20 }, { x: 20, y: 20 }];
    const grown = growSnake(snake);
    expect(grown.length).toBe(3);
  });

  test('checkCollision detects wall hit', () => {
    const snake = [{ x: -20, y: 0 }];
    expect(checkCollision(snake, 400)).toBe(true);
  });

  test('checkCollision detects self-hit', () => {
    const snake = [
      { x: 60, y: 60 },
      { x: 40, y: 60 },
      { x: 60, y: 60 }
    ];
    expect(checkCollision(snake, 400)).toBe(true);
  });

  test('checkCollision passes for safe snake', () => {
    const snake = [
      { x: 60, y: 60 },
      { x: 40, y: 60 },
      { x: 20, y: 60 }
    ];
    expect(checkCollision(snake, 400)).toBe(false);
  });
});
