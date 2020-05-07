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