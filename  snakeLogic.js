function moveSnake(snake, dx, dy) {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    return [head, ...snake.slice(0, -1)];
  }
  
  function growSnake(snake) {
    const tail = snake[snake.length - 1];
    return [...snake, { ...tail }];
  }
  
  function checkCollision(snake, canvasSize) {
    const head = snake[0];
    const hitWall = head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize;
    const hitSelf = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    return hitWall || hitSelf;
  }
  
  module.exports = {
    moveSnake,
    growSnake,
    checkCollision
  };
  