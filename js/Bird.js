class Bird {
  constructor(props) {
    this.image = props.image;
    this.height = 26;
    this.width = 38;
    this.x = props.x;
    this.y = props.y;
    this.speed = 0;
    this.gravity = 0.30;
    this.flap = 4.6;
    this.rotation = 0;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(this.image, - this.width / 2, - this.height / 2);
    ctx.restore();
  }

  update() {
    this.speed += this.gravity;
    this.y += this.speed;

    if (this.speed >= this.flap) {
      this.rotation = 70 * DEGREE;
    } else {
      this.rotation = -25 * DEGREE;
    }
  }

  flapWings() {
    this.speed = -this.flap;
  }
}