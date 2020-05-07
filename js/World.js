const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const pipeGap = 355;
let frames = 0;
let isGameActive = true;
let gameInterval;
let score = 0;

const DEGREE = Math.PI / 180;
const scoreContainer = document.querySelector('.score');
const scoreBoard = document.querySelector('.score-count');
const startButton = document.querySelector('.btn-start');
const coverImage = document.querySelector('.cover-image');
const flappyBirdText = document.querySelector('.flappy-bird-text');
const createdBy = document.querySelector('.created-by');
scoreContainer.classList.add('hide');
startButton.classList.add('hide');
const playButton = document.querySelector('.btn-play');

const birdImage = new Image();
birdImage.src = './images/bird.png';

const topPipeImage = new Image();
topPipeImage.src = './images/pipeTop.png';

const bottomPipeImage = new Image();
bottomPipeImage.src = './images/pipeBottom.png';

const foregroundImage = new Image();
foregroundImage.src = './images/fg.png';

const backgroundImage = new Image();
backgroundImage.src = './images/bg.png';

let pipes = [];
pipes.push({
  topPipe: new Pipe({
    image: topPipeImage,
    x: canvas.width + 54,
    y: -120 * Math.random() * 1
  }),
  bottomPipe: new Pipe({
    image: bottomPipeImage,
    x: canvas.width + 54,
    y: -120 * Math.random() * 1 + pipeGap
  })
});

const flap = new Audio();
flap.src = './sounds/flap.mp3';

const hit = new Audio();
hit.src = './sounds/hit.wav';

const scoreSound = new Audio();
scoreSound.src = './sounds/score.mp3';

const die = new Audio();
die.src = './sounds/die.wav';

let bird = new Bird({
  image: birdImage,
  x: 100,
  y: 200
});

let background = new Background({
  image: backgroundImage,
  x: 0,
  y: 0
});

let foreground = new Background({
  image: foregroundImage,
  x: 0,
  y: 410
});

function draw() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  for (let i = 0; i < pipes.length; i++) {
    let topPipe = pipes[i].topPipe;
    let bottomPipe = pipes[i].bottomPipe;
    bottomPipe.y = topPipe.y + pipeGap;
    topPipe.draw();
    bottomPipe.draw();
  }
  bird.draw();
  foreground.draw('foreground');
  scoreBoard.textContent = Math.round(score);
  if (frames % 180 === 0) {
    pipes.push({
      topPipe: new Pipe({
        image: topPipeImage,
        x: canvas.width + 54,
        y: -150 * Math.random() * 1
      }),
      bottomPipe: new Pipe({
        image: bottomPipeImage,
        x: canvas.width + 54,
        y: -150 * Math.random() * 1 + pipeGap
      })
    });
  }
}

function removePipes() {
  for (let i = 0; i < pipes.length; i++) {
    let topPipe = pipes[i].topPipe;
    if (topPipe.x + 52 < 0) {
      pipes.shift();
    }
  }
}

function showGameOverScreen() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  scoreContainer.classList.add('center');
  startButton.classList.remove('hide');
}

function update() {
  bird.update();
  for (let i = 0; i < pipes.length; i++) {
    let topPipe = pipes[i].topPipe;
    let bottomPipe = pipes[i].bottomPipe;
    topPipe.update();
    bottomPipe.update();

    //COLLISION DETECTION: TOP PIPE
    if (bird.x + bird.width / 2 > topPipe.x &&
      bird.x - bird.width / 2 < topPipe.x + topPipe.width &&
      bird.y - bird.height / 2 < topPipe.y + topPipe.height &&
      bird.y + bird.height / 2 > topPipe.y) {
      hit.play();
      setTimeout(() => {
        showGameOverScreen();
        die.play();
      }, 200);
      stopGame();
    }

    //COLLISION DETECTION: BOTTOM PIPE
    if ((bird.x + bird.width / 2 > bottomPipe.x &&
      bird.x - bird.width / 2 < bottomPipe.x + bottomPipe.width &&
      bird.y - bird.height / 2 < bottomPipe.y + bottomPipe.height &&
      bird.y + bird.height / 2 > bottomPipe.y) || bird.y + bird.height / 2 > foreground.y) {
      hit.play();
      setTimeout(() => {
        showGameOverScreen();
        die.play();
      }, 200);
      stopGame();
    }

    //BETWEEN PIPES
    if (bird.x - bird.width / 2 > topPipe.x &&
      bird.x + bird.width / 2 < topPipe.x + topPipe.width &&
      bird.y - bird.height / 2 > topPipe.y + topPipe.height &&
      bird.y + bird.height / 2 < bottomPipe.y) {
      scoreSound.play();
      score += 0.1;
    }
  }
  background.update();
  foreground.update();
  removePipes();
}

function stopGame() {
  isGameActive = false;
  playButton.classList.add('hide');
  canvas.removeEventListener('click', birdAction);
  cancelAnimationFrame(gameInterval);
}

function reset() {
  frames = 0;
  score = 0;
  pipes = [];
  pipes.push({
    topPipe: new Pipe({
      image: topPipeImage,
      x: canvas.width + 54,
      y: -120 * Math.random() * 1
    }),
    bottomPipe: new Pipe({
      image: bottomPipeImage,
      x: canvas.width + 54,
      y: -120 * Math.random() * 1 + pipeGap
    })
  });
  canvas.addEventListener('click', birdAction);
  bird = new Bird({
    image: birdImage,
    x: 100,
    y: 200
  });

  background = new Background({
    image: backgroundImage,
    x: 0,
    y: 0
  });

  foreground = new Background({
    image: foregroundImage,
    x: 0,
    y: 410
  });
  scoreContainer.classList.remove('center');
  startButton.classList.add('hide');
}

const birdAction = () => {
  bird.flapWings();
  flap.play();
}

function toggleClassList() {
  playButton.classList.add('hide');
  coverImage.classList.add('hide');
  flappyBirdText.classList.add('hide');
  scoreContainer.classList.remove('hide');
  createdBy.classList.add('hide');
}

function startGame() {
  draw();
  update();
  startButton.classList.add('hide');
  if (isGameActive) {
    gameInterval = requestAnimationFrame(startGame);
  }
}

playButton.addEventListener('click', () => {
  draw();
  isGameActive = true;
  startGame();
  toggleClassList();
});

startButton.addEventListener('click', () => {
  reset();
  isGameActive = true;
  startGame();
});

canvas.addEventListener('click', birdAction);
canvas.addEventListener('mousedown', function (e) { e.preventDefault(); }, false);
