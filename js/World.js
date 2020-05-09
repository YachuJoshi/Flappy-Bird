function init() {
  isGameActive = true;
  canvas.addEventListener('click', birdAction);
  canvas.addEventListener('mousedown', e => e.preventDefault(), false);
  playButton.classList.add('hide');
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
  bird = new Bird({
    imageArray: birdFlapArray,
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

function draw() {
  frames++;
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
  scoreContainer.textContent = `SCORE: ${Math.round(score)}`;
  if (frames % 100 === 0) {
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
      score += 0.2;
    }
  }
  removePipesOutOfBound();
}

function startGame() {
  draw();
  update();
  if (isGameActive) {
    gameInterval = requestAnimationFrame(startGame);
  }
}

function stopGame() {
  isGameActive = false;
  canvas.removeEventListener('click', birdAction);
  cancelAnimationFrame(gameInterval);
}

playButton.addEventListener('click', () => {
  reset();
  toggleClassList();
  init();
  startGame();
});

startButton.addEventListener('click', () => {
  reset();
  init();
  startButton.classList.add('hide');
  startGame();
});