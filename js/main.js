// canvas setup
let canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "black";
let ctx = canvas.getContext("2d");
let background = new Image();
background.src = "/img/game-background.jpg";
//img
const yarnImg = new Image();
yarnImg.src = "../img/yarn.png";
const pawImg = new Image();
pawImg.src = "../img/orange-paw.png";
let yarnX = 80;
let yarnY = 80;
let yarnWidth = 80;
let yarnHeight = 80;
let speedX = 5;
let speedY = 5;
let pawX = canvas.width - 190;
let pawY = canvas.height / 2 - 50;
let pawWidth = 200;
let pawHeight = 120;
let isGameOver = false;
let intervalId = 0;
let isArrowUp = false,
  isArrowDown = false;
let score = 0;

let logo = document.getElementById("logo");

// let logo = document.getElementsById("logo");
let btnStart = document.getElementById("start");
let btnRestart = document.getElementById("restart");
const splashPage = document.querySelector("div");
//const gameoverPage = document.querySelector(".game-over");
const lastScore = document.querySelector(".lastScore");
const updateScore = document.querySelector("#scoreThisTime");

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(yarnImg, yarnX, yarnY, yarnWidth, yarnHeight);
  ctx.drawImage(pawImg, pawX, pawY, pawWidth, pawHeight);

  ctx.fillStyle = "white";
  ctx.font = "26px Montserrat";
  ctx.fillText(`Score: ${score}`, canvas.width / 2 - 30, 50);

  // collisions with walls
  if (yarnY + yarnHeight >= canvas.height) speedY = -speedY;
  if (yarnX < 0) {
    speedX = speedX * -1;
    score++;
  }

  if (yarnY < 0) speedY = speedY * -1;

  // collisions with paw

  if (
    yarnX + yarnWidth > canvas.width - pawWidth + 20 &&
    yarnY + yarnHeight > pawY - 30 &&
    yarnY < pawY + pawHeight + 30 &&
    yarnX < canvas.width - pawWidth
  ) {
    speedX = -speedX;
  }

  if (score === 3) {
    this.speedX += 5;
    this.speedY += 5;
  }

  if (yarnX > canvas.width) {
    isGameOver = true;
  }

  yarnX += speedX;
  yarnY += speedY;

  if (isArrowUp && pawY > 0) pawY = pawY - 5;
  if (isArrowDown && pawY < canvas.height - pawHeight) pawY = pawY + 5;

  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    canvas.style.display = "none";
    btnRestart.style.display = "block";
    lastScore.style.display = "block";
    updateScore.innerHTML = `${score}`;
  } else {
    intervalId = requestAnimationFrame(game);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    isArrowUp = true;
    isArrowDown = false;
  } else if (e.code === "ArrowDown") {
    isArrowUp = false;
    isArrowDown = true;
  }
});

document.addEventListener("keyup", () => {
  isArrowUp = false;
  isArrowDown = false;
});

function splashScreen() {
  canvas.style.display = "block";
  btnStart.style.display = "none";
  splashPage.style.display = "none";

  game();
}

function restart() {
  isGameOver = false;
  canvas.style.display = "block";
  btnStart.style.display = "none";
  btnRestart.style.display = "none";
  lastScore.style.display = "none";
  yarnX = 80;
  yarnY = 80;
  pawX = canvas.width - 190;
  pawY = canvas.height / 2 - 50;
  score = 0;

  game();
}

window.addEventListener("load", () => {
  canvas.style.display = "none";
  btnRestart.style.display = "none";
  lastScore.style.display = "none";

  btnStart.addEventListener("click", () => {
    splashScreen();
  });

  btnRestart.addEventListener("click", () => {
    restart();
  });
});
