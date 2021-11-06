class Laser {
  constructor(x, ctx) {
    this.x = x;
    this.ctx = ctx;
    this.y = 440;
    this.width = 5;
    this.height = 20;
  }

  drawLaser() {
    const laserImg = new Image();
    laserImg.src = "./images/laser-player.png";
    this.ctx.drawImage(laserImg, this.x + 7, this.y, this.width, this.height);
  }

  updateLaser() {
    this.y -= 30;
  }
}
