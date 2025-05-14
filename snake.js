// Flutter Snake Game with Mobile Controls and Desktop Enhancements

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Desktop-optimized canvas
let canvasSize = window.innerWidth > 768 ? 500 : Math.min(window.innerWidth, 400);
canvas.width = canvas.height = canvasSize;

const gridSize = Math.floor(canvasSize / 15);

let snake = [{ x: 5 * gridSize, y: 10 * gridSize }];
let food = { x: 0, y: 0 };
let dx = gridSize;
let dy = 0;
let score = 0;
let gameInterval;

const flutterLogo = new Image();
flutterLogo.src = "assets/flutter.jpg";

const foodLogos = [
  "assets/paddpower.png",
  "assets/betfair.png",
  "assets/skybet.png",
  "assets/tombola.png",
  "assets/sportinglife.png"
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
  currentFoodImage.onload = () => drawGame();
}

function drawImage(x, y, img, fallbackColor = "#ccc") {
  if (img.complete && img.naturalWidth !== 0) {
    ctx.drawImage(img, x, y, gridSize, gridSize);
  } else {
    ctx.fillStyle = fallbackColor;
    ctx.fillRect(x, y, gridSize, gridSize);
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawImage(food.x, food.y, currentFoodImage, "red");

  snake.forEach((segment, index) => {
    if (index === 0) {
      drawImage(segment.x, segment.y, flutterLogo, "#0061A8");
    } else {
      ctx.fillStyle = "#0061A8";
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
    alert("Game Over! Press OK to return to menu.");
    endGame();
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
  snake = [{ x: 5 * gridSize, y: 10 * gridSize }];
  dx = gridSize;
  dy = 0;
  score = 0;
  placeFood();
  drawGame();
  gameInterval = setInterval(moveSnake, 150);
}

function endGame() {
  document.getElementById("score").style.display = "none";
  document.getElementById("gameCanvas").style.display = "none";
  document.getElementById("controls").style.display = "none";
  document.getElementById("startBtn").style.display = "inline-block";
}

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("score").style.display = "block";
  document.getElementById("gameCanvas").style.display = "block";

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.getElementById("controls").style.display = "block";
  }

  if (flutterLogo.complete) {
    startGame();
  } else {
    flutterLogo.onload = () => {
      startGame();
    };
  }
});

document.querySelectorAll(".ctrl").forEach(button => {
  button.addEventListener("click", () => {
    const dir = button.getAttribute("data-dir");
    switch (dir) {
      case "up": if (dy === 0) { dx = 0; dy = -gridSize; } break;
      case "down": if (dy === 0) { dx = 0; dy = gridSize; } break;
      case "left": if (dx === 0) { dx = -gridSize; dy = 0; } break;
      case "right": if (dx === 0) { dx = gridSize; dy = 0; } break;
    }
  });
});
