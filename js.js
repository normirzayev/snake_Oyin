let canvas = document.querySelector("canvas"),
  context = canvas.getContext("2d"),
  scoreText = document.querySelector(".score > span"),
  btns = document.querySelectorAll(".btns button");

let grid = 16,
  max = 0;
let score = 0,
  count = 0;

let snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,
  maxCells: 1,
  cells: [],
};
const food = {
  x: 320,
  y: 320,
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }
  count = 0;
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.clientWidth - grid;
  } else if (snake.x >= canvas.clientWidth) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.clientHeight - grid;
  } else if (snake.y >= canvas.clientHeight) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();

    context.fillStyle = "#fff";
    context.fillRect(food.x, food.y, grid - 1, grid - 1);

    context.fillStyle = "#000";

    snake.cells.forEach(function (cell, index) {
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
      if (cell.x === food.x && cell.y === food.y) {
        snake.maxCells++;
        score += 1;
        scoreText.innerHTML = score;
        food.x = getRandomNumber(0, 25) * grid;
        food.y = getRandomNumber(0, 25) * grid;
      }

      for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          if (score > max) {
            max = score;
          }
          snake.x = 160;
          snake.y = 160;
          snake.cells = [];
          snake.dx = grid;
          snake.dy = 0;
          snake.maxCells = 1;
          score = 0;

          food.x = getRandomNumber(0, 25) * grid;
          food.y = getRandomNumber(0, 25) * grid;

          scoreText.innerHTML = max;
        }
      }
    });
  }
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.keyCode === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.keyCode === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.keyCode === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

btns[0].addEventListener("click", () => {
  if (snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
});

btns[1].addEventListener("click", () => {
  if (snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
});
btns[2].addEventListener("click", () => {
  if (snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
btns[3].addEventListener("click", () => {
  if (snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
});

requestAnimationFrame(loop);
