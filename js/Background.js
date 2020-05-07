class Background {
  constructor(props) {
    this.image = props.image;
    this.height = 512;
    this.width = 286;
    this.x = props.x;
    this.y = props.y;
    this.dx = 1.4;
  }

  draw(status) {
    if (status === 'foreground') {
      ctx.drawImage(this.image, this.x, this.y);
      return;
    }
    for (var w = 0; w < canvas.width; w += this.width) {
      for (var h = 0; h < canvas.height; h += this.height) {
        ctx.drawImage(this.image, w, h);
      }
    }
  }

  update() {
    this.x = (this.x - this.dx) % 1;
  }
}