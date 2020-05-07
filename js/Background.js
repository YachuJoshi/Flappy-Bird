class Background {
  constructor(props) {
    this.image = props.image;
    this.height = 512;
    this.width = 286;
    this.x = props.x;
    this.y = props.y;
    this.dx = 1.4;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y);
    ctx.drawImage(this.image, this.x + this.width, this.y);
  }

  update() {
    this.x = (this.x - this.dx) % (this.width / 2);
  }
}