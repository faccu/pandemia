class Enemy {
  constructor(ctx, x, y, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 30;
    this.enemyLasers = [];
  }

  drawEnemy() {
    const enemyImg = new Image();
    enemyImg.src = "./images/covid.png"
    this.ctx.drawImage(enemyImg, this.x, this.y, this.size, this.size);
    // this.ctx.fillStyle = "white";
    // this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update(){
    this.y += 0.5;
  }

  // enemyShoot(){
  //   const laser = new EnemyLaser(this.x, this.ctx);
  //   this.lasers.unshift(laser); 
  //   console.log("I'm shooting");
  //   setInterval(function() {
  //     laser.y = laser.y + 30;
  //     console.log('laser setinterval', laser.y)
  //   }, 50);

  // }

  move() {
    this.y += this.speed * -2;
  }
  
  didCollide(obstacle) {
    if (
      this.x + this.size >= obstacle.x &&
      this.y + this.size > obstacle.y &&
      this.y < obstacle.y + obstacle.size &&
      this.x <= obstacle.x + obstacle.size &&
      this.y + this.size > obstacle.y &&
      this.y < obstacle.y + obstacle.size
    ) {
      return true;
    } else {
      return false;
    }
  }
}
