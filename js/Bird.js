class Bird {
  constructor(props) {
    this.image = props.image;
    this.height = 26;
    this.width = 38;
    this.x = props.x;
    this.y = props.y;
    this.speed = 0;
    this.gravity = 0.30;
    this.jump = 4.6;
  }

  draw() {
    ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2);
  }

  update() {
    this.speed += this.gravity;
    this.y += this.speed;
  }

  flapWings() {
    this.speed = -this.jump;
  }
}