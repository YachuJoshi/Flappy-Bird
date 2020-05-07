class Bird {
  constructor(props) {
    this.image = props.image;
    this.height = 26;
    this.width = 38;
    this.x = props.x;
    this.y = props.y;
    this.dx = 1.4;
    this.gravity = 2;
    this.flap = 60;
  }

  draw() {
    ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2);
  }

  update() {
    this.y += this.gravity;
  }

  flapWings() {
    this.y -= this.flap;
  }

  fallToGround() {
    this.y += 20;
    if (this.y >= 410) return;
  }
}