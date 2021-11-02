class Enemy {
  constructor(ctx, x, y, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 30;
  }

  drawEnemy() {
    const enemyImg = new Image();
    enemyImg.src = "./images/covid.png"
    this.ctx.drawImage(enemyImg, this.x, this.y, this.size, this.size);
    // this.ctx.fillStyle = "white";
    // this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.speed * -2;
  }
}
