class Enemy {
  constructor(ctx, x, y, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = "white";
    this.speed = speed;
    this.size = 30;
  }

  draw() {
    const enemyImg = new Image();
    enemyImg.src = "./images/covid.png"
    this.ctx.drawImage(enemyImg, this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.speed * -2;
  }
}
