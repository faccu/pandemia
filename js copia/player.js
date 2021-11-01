"use strict";

import vaccineImage from '../images/player-blue-1.png';

export class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvasHeight = 500;
    this.lives = lives;
    this.size = 50;
    this.x = 10;
    this.y = canvas.height / 2;
    this.direction = 0;
    this.speed = 1;
    //this.el = document.createElement('img');
    //this.el.src = vaccineImage;
    //document.body.appendChild(this.el)
  }

  update() {
    this.x = this.x + this.direction * this.speed;
    this.checkScreen();
  }

  setDirection(direction) {
    // +1 right  -1 left
    if (direction === "right") this.direction = 1;
    else if (direction === "left") this.direction = -1;
  }

  // Check if the player is out of the screen / canvas
  checkScreen() {
    if (this.x + this.size - this.size <= 0) {
      this.direction = 1;
    } else if (this.x + this.size >= 800) {
      this.direction = -1;
    }
  }

  draw() {    
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.el = document.createElement('img');
    this.el.src = vaccineImage;
    document.body.appendChild(this.el)
  }

  didCollide(enemy) {
    if (
      this.x + this.size >= enemy.x &&
      this.y + this.size > enemy.y &&
      this.y < enemy.y + enemy.size &&
      this.x <= enemy.x + enemy.size &&
      this.y + this.size > enemy.y &&
      this.y < enemy.y + enemy.size
    ) {
      return true;
    } else {
      return false;
    }
  }
}
