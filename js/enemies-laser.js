class EnemyLaser {
  constructor(x, y, ctx) {
    this.x = x;
    this.ctx = ctx;
    this.y = y;
    this.width = 5;
    this.height = 20;
    this.size = 20;
  }   

  drawEnemyLaser() {
    const laserImg = new Image();
    laserImg.src = "./images/laser-enemy.png";
    this.ctx.drawImage(laserImg, this.x + 12, this.y, this.width, this.height);
  }

  updateLaser() {
    this.y += 3;
  }
}