"use strict";

class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvasHeight = 500;
    this.canvasWidth = 800;
    this.lives = lives;
    this.size = 30;
    this.x = canvas.width / 2 - 15;
    this.y = 450;
    //this.y = canvas.height / 2;
    this.direction = 0;
    this.speed = 2;
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

  //


  draw() {
    const enemyImg = new Image();
    enemyImg.src = "./images/player-blue-1.png"
    this.ctx.drawImage(enemyImg, this.x, this.y, this.size, this.size);
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
