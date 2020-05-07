const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scoreContainer = document.querySelector('.score');
const scoreBoard = document.querySelector('.score-count');
const startButton = document.querySelector('.btn-start');
const coverImage = document.querySelector('.cover-image');
const flappyBirdText = document.querySelector('.flappy-bird-text');
const createdBy = document.querySelector('.created-by');
scoreContainer.classList.add('hide');
startButton.classList.add('hide');
const playButton = document.querySelector('.btn-play');