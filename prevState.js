// Flutter Snake Game - Priority 2: Branding Integration with Fixes

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const canvasSize = 400;
canvas.width = canvas.height = canvasSize;

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = gridSize;
let dy = 0;
let score = 0;
let gameInterval;

const flutterLogo = new Image();
flutterLogo.src = "assets/flutter.jpg";

const foodLogos = [
  "assets/paddypower.png",
  "assets/betfair.png",
  "assets/skybet.png",
  "assets/tombola.png",
  "assets/sporting.life.png"
];

let currentFoodImage = new Image();

function getRandomCoord() {
  return Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

function placeFood() {
  let x, y, overlap;
  do {
    x = getRandomCoord();
    y = getRandomCoord();
    overlap = snake.some(segment => segment.x === x && segment.y === y);
  } while (overlap);

  food.x = x;
  food.y = y;
  const imgSrc = foodLogos[Math.floor(Math.random() * foodLogos.length)];
  currentFoodImage.src = imgSrc;
}

function drawImage(x, y, img) {
  if (img.complete) {
    ctx.drawImage(img, x, y, gridSize, gridSize);
  } else {
    img.onload = () => {
      ctx.drawImage(img, x, y, gridSize, gridSize);
    };
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawImage(food.x, food.y, currentFoodImage);

  snake.forEach((segment, index) => {
    if (index === 0) {
      drawImage(segment.x, segment.y, flutterLogo);
    } else {
      ctx.fillStyle = "#0061A8"; // Flutter blue
      ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    }
  });

  document.getElementById("score").innerText = `Score: ${score}`;
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert("Game Over! Press OK to restart.");
    restartGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }

  drawGame();
}

function changeDirection(e) {
  switch (e.key) {
    case "ArrowUp": if (dy === 0) { dx = 0; dy = -gridSize; } break;
    case "ArrowDown": if (dy === 0) { dx = 0; dy = gridSize; } break;
    case "ArrowLeft": if (dx === 0) { dx = -gridSize; dy = 0; } break;
    case "ArrowRight": if (dx === 0) { dx = gridSize; dy = 0; } break;
  }
}

document.addEventListener("keydown", changeDirection);

function startGame() {
  placeFood();
  drawGame();
  gameInterval = setInterval(moveSnake, 150);
}

function restartGame() {
  snake = [{ x: 200, y: 200 }];
  dx = gridSize;
  dy = 0;
  score = 0;
  placeFood();
  drawGame();
  gameInterval = setInterval(moveSnake, 150);
}

flutterLogo.onload = () => {
  startGame();
};