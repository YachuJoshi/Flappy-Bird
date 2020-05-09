function toggleClassList() {
  toggleHideClass(playButton);
  toggleHideClass(coverImage);
  toggleHideClass(flappyBirdText);
  toggleHideClass(scoreContainer);
  toggleHideClass(createdBy);
}

function toggleHideClass(element) {
  element.classList.toggle('hide');
}

function showGameOverScreen() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  scoreContainer.classList.add('center');
  toggleHideClass(startButton);
}

function birdAction() {
  bird.flapWings();
  flap.play();
}

function removePipesOutOfBound() {
  for (let i = 0; i < pipes.length; i++) {
    let topPipe = pipes[i].topPipe;
    if (topPipe.x + 52 < 0) {
      pipes.shift();
    }
  }
}

toggleHideClass(scoreContainer);
toggleHideClass(startButton);
