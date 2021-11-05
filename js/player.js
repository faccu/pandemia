"use strict";

class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvasHeight = 500;
    this.canvasWidth = 800;
    this.lives = lives;
    // this.size = 30;
    this.width = 17;
    this.height = 60;
    this.x = canvas.width / 2 - 15;
    this.y = 420;
    this.direction = 0;
    this.speed = 2;
    this.lasers = [];
  }

  // Move player and check if is out of the screen / canvas

  goLeft(){
    if (this.x + this.size - this.size <= 0) {
      this.x = 0;
    } else {
      this.x = this.x - 15;
    }
  }

  goRight(){
    console.log('this.x', this.x)
    if (this.x + this.size >= 800) {
      this.x = 800 - this.size;
    } else {
      this.x = this.x + 15;
    }
  }

  // Shooting lasers

  shoot(){
    const laser = new Laser(this.x, this.ctx);
    this.lasers.unshift(laser);
  }

  // Print player

  draw() {
    const playerImg = new Image();
    playerImg.src = "./images/player.png"
    // this.ctx.drawImage(playerImg, this.x, this.y, this.size, this.size);
    this.ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }

  didCollide(obstacle) {
    
    if (
      this.x + this.width >= obstacle.x &&
      this.y + this.height > obstacle.y &&
      this.y < obstacle.y + obstacle.size &&
      this.x <= obstacle.x + obstacle.size &&
      this.y + this.height > obstacle.y &&
      this.y < obstacle.y + obstacle.size
    ) {
      console.log('collide')
      return true;
    } else {
      return false;
    }
  }
}
