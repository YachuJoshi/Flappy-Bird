class Bird {
  constructor(props) {
    this.imageArray = props.imageArray;
    this.height = 26;
    this.width = 38;
    this.x = props.x;
    this.y = props.y;
    this.speed = 0;
    this.gravity = 0.30;
    this.flap = 5;
    this.rotation = 0;
    this.frame = 0;
    this.birdImage;
  }

  draw() {
    this.birdImage = this.imageArray[this.frame];
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(this.birdImage, - this.width / 2, - this.height / 2);
    ctx.restore();
  }

  update() {
    this.frame += 1;
    this.frame = this.frame % this.imageArray.length;
    this.speed += this.gravity;
    this.y += this.speed;

    if (this.speed >= this.flap) {
      this.rotation = 90 * DEGREE;
      this.frame = 2;
    } else {
      this.rotation = -25 * DEGREE;
    }
  }

  flapWings() {
    this.speed = -this.flap;
  }
}