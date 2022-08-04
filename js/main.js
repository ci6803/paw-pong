// canvas setup
let canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "black";
let ctx = canvas.getContext("2d");
let background = new Image();
background.src = "/img/game-background2.jpg";
let background2 = new Image();
background2.src = "/img/background-mouse.jpg";
const background3 = new Image();
background3.src = "/img/background-water.jpg";
const background4 = new Image();
background4.src = "/img/background-heart.jpg";
//img
const yarnImg = new Image();
yarnImg.src = "../img/yarn.png";
const pawImg = new Image();
pawImg.src = "../img/orange-paw.png";

// music
const music = document.querySelector(".sound");
music.loop = true;
music.volume = 0.1;

let yarnX = 80;
let yarnY = 80;
let yarnWidth = 80;
let yarnHeight = 80;
let speedX = canvas.width * 0.008;
let speedY = canvas.height * 0.008;
let pawX = canvas.width - 190;
let pawY = canvas.height / 2 - 50;
let pawWidth = 200;
let pawHeight = 120;
let isGameOver = false;
let intervalId = 0;
let isArrowUp = false,
  isArrowDown = false;
let score = 0;
let food = 0;
let mouse = 0;
let water = 0;
let heart = 0;

let logo = document.getElementById("logo");
let btnStart = document.getElementById("start");
let btnRestart = document.getElementById("restart");
const splashPage = document.querySelector("div");
const sound = document.querySelector(".sound");
const lastScore = document.querySelector(".lastScore");
const updateScore = document.querySelector("#scoreThisTime");
const scoreBoard = document.querySelector("#score-board");
const playerName = document.querySelector("#name");
const gameoverImg = document.querySelector(".gameoverImg");
const soundPlayer = document.querySelector(".soundPlayer");
const winThings = document.getElementById("winThings");

//audio
let meow = new Audio();
meow.src = "/music/Meow.m4a";
meow.volume = 1;
let pop = new Audio();
pop.src = "/music/PopSound.m4a";
pop.volume = 1;
const longMeow = new Audio();
longMeow.src = "/music/Meeeeeow.m4a";
longMeow.volume = 1;

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  if (score < 10) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  } else if (score >= 10 && score < 20) {
    ctx.drawImage(background2, 0, 0, canvas.width, canvas.height);
  } else if (score >= 20 && score < 30) {
    ctx.drawImage(background3, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.drawImage(background4, 0, 0, canvas.width, canvas.height);
  }

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
    pop.play();
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
    meow.play();
  }

  // speed up the ball
  if (score % 3 === 0 && score !== 0) {
    speedX *= 1.001;
    speedY *= 1.001;
  }

  // winning things
  if (score <= 10) {
    food = score;
  } else if (score > 10 && score <= 20) {
    food = 10;
    mouse = score - 10;
  } else if (score > 20 && score <= 30) {
    food = 10;
    mouse = 10;
    water = score - 20;
  } else {
    food = 10;
    mouse = 10;
    water = 10;
    heart = score - 30;
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
    longMeow.play();
    canvas.style.display = "none";
    btnRestart.style.display = "block";
    lastScore.style.display = "block";
    gameoverImg.style.display = "block";
    soundPlayer.style.display = "block";

    //place score
    updateScore.innerHTML = `🐾 ${playerName.value}'s score: ${score}`;
    localStorage.setItem(playerName.value, score);
    localStorage.getItem(playerName.value);
    let storeScore = { ...localStorage };
    const maxValue = Object.entries(storeScore).sort((x, y) => y[1] - x[1])[0];
    let highestName = maxValue[0];
    let highestValue = maxValue[1];
    scoreBoard.innerHTML = `🎉 Highest score → ${highestName}: ${highestValue} 🎉`;
    winThings.innerHTML = `🐾 You got ${food} 🐟 / ${mouse} 🐭 / ${water} 🥛 / ${heart} ♥`;
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

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    splashScreen();
  }
});

function splashScreen() {
  canvas.style.display = "block";
  btnStart.style.display = "none";
  splashPage.style.display = "none";
  sound.style.display = "none";
  gameoverImg.style.display = "none";
  soundPlayer.style.display = "none";

  game();
}

function restart() {
  isGameOver = false;
  canvas.style.display = "block";
  btnStart.style.display = "none";
  btnRestart.style.display = "none";
  lastScore.style.display = "none";
  sound.style.display = "none";
  gameoverImg.style.display = "none";
  soundPlayer.style.display = "none";
  splashPage.style.display = "none";

  yarnX = 80;
  yarnY = 80;
  pawX = canvas.width - 190;
  pawY = canvas.height / 2 - 50;
  score = 0;
  speedX = canvas.width * 0.008;
  speedY = canvas.height * 0.008;

  game();
}

window.addEventListener("load", () => {
  canvas.style.display = "none";
  btnRestart.style.display = "none";
  lastScore.style.display = "none";
  // sound.style.display = "none";
  gameoverImg.style.display = "none";
  btnStart.addEventListener("click", () => {
    splashScreen();
  });

  btnRestart.addEventListener("click", () => {
    restart();
  });

  // document.addEventListener("keydown", (e) => {
  //   if (e.keyCode === 32) {
  //     restart();
  //   }
  // });
});
