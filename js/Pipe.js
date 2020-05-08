class Pipe {
  constructor(props) {
    this.image = props.image;
    this.height = 242;
    this.width = 52;
    this.x = props.x;
    this.y = props.y;
    this.dx = 2.8;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y);
  }

  update() {
    this.x -= this.dx;
  }
}