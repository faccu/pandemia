class EnemyLaser {
  constructor(x, ctx) {
    this.x = x;
    this.ctx = ctx;
    this.y = 440;
    this.width = 5;
    this.height = 20;
  }   

  drawEnemyLaser(){
    const laserImg = new Image();
    laserImg.src = "./images/laser-blue-1.png";
    this.ctx.drawImage(laserImg, this.x + 12, this.y, this.width, this.height);
    // this.ctx.fillStyle = "blue";
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);
}
}
