class Enemy {
  constructor(ctx, x, y, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 30;
    // this.enemyLasers = [];
  }

  drawEnemy() {
    const enemyImg = new Image();
    enemyImg.src = "./images/covid.png"
    this.ctx.drawImage(enemyImg, this.x, this.y, this.size, this.size);
  }

  update(){
    this.y += 0.20;
  }
  
  didCollide(obstacle) {
    if (
      this.x + this.size >= obstacle.x &&
      this.y + this.size > obstacle.y &&
      this.y < obstacle.y + obstacle.height &&
      this.x <= obstacle.x + obstacle.width + 10 &&
      this.y + this.size > obstacle.y &&
      this.y < obstacle.y + obstacle.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}
