class Background {
  constructor(props) {
    this.image = props.image;
    this.height = 512;
    this.width = 286;
    this.x = props.x;
    this.y = props.y;
  }

  draw(status) {
    if (status === 'foreground') {
      ctx.drawImage(this.image, this.x, this.y);
      return;
    }
    for (let w = 0; w < canvas.width; w += this.width) {
      for (let h = 0; h < canvas.height; h += this.height) {
        ctx.drawImage(this.image, w, h);
      }
    }
  }
}