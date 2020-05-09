const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const pipeGap = 355;
const DEGREE = Math.PI / 180;

let pipes = [];
let bird, background, foreground, gameInterval;
let frames = 0;
let score = 0;
let isGameActive = false;