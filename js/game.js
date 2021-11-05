"use strict";

class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.enemies = [];
    this.enemyLasers = [];
    this.player = null;
    this.gameIsOver = false;
    this.score = 0;
  }

  start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");

    // Create a new player and enemies for the current game
    this.player = new Player(this.canvas, 3);
    this.generateEnemies();

    // Add event listener for moving the player
    this.handleKeyDown = (event) => {
      if (event.code === "ArrowRight") {
        this.player.goRight();
      } else if (event.code === "ArrowLeft") {
        this.player.goLeft();
      } else if (event.code === "Space") {
        this.player.shoot();
        new Audio("./sound/playerfire.mp3").play();
      }
    };
    // Any function provided to eventListener
    document.body.addEventListener("keydown", this.handleKeyDown);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  startLoop() {
    const loop = () => {
      // CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.checkCollisions();

      this.checkPlayerLaserCollisions();
      this.checkEnemyLaserCollisions();

      // UPDATE THE CANVAS
      // Draw the player

      this.player.draw();

      // Draw the laser

      this.player.lasers.forEach((laser) => {
        laser.updateLaser();
        laser.drawLaser();
      });

      this.player.laser = this.player.lasers.filter((laser) => laser.y > 0);

      // Draw the enemies

      this.enemies.forEach((enemy) => {
        enemy.update();
        enemy.drawEnemy();
      });

      this.enemyLasers.forEach((laser) =>{
        laser.updateLaser();
        laser.drawEnemyLaser();
      });

      // draw enemy lasers
      if (Math.random() > 0.99) {
        this.enemyShoot();
      }

      // TERMINATE LOOP IF ALL ENEMIES ARE DEAD

      if (this.enemies.length === 0) {
        buildYouWin();
        new Audio("./sound/youwin.mp3").play();
        sound.pause();
        sound.currentTime = 0;
      }

      // TERMINATE LOOP IF GAME IS OVER

      this.enemies.forEach((enemy) => {
        if (enemy.y + enemy.size >= this.canvas.height) {
          buildGameOver();
          new Audio("./sound/gameover.mp3").play();
          sound.pause();
          sound.currentTime = 0;
        }
      });

      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      } else {
        buildGameOver();
        new Audio("./sound/gameover.mp3").play();
        sound.pause();
        sound.currentTime = 0;
      }
    };

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we need to `start an infinitive loop` till the game is over
    window.requestAnimationFrame(loop);
  }
  
  

  generateEnemies() {
    for (let i = 0; i <= 700; i += 60) {
      const y = 51 + i;
      let x = 20;
      this.enemies.push(new Enemy(this.ctx, y, x, 1));
    }
    for (let i = 0; i <= 600; i += 60) {
      const y = 80 + i;
      let x = 80;
      this.enemies.push(new Enemy(this.ctx, y, x, 1));
    }
    for (let i = 0; i <= 700; i += 60) {
      const y = 51 + i;
      let x = 140;
      this.enemies.push(new Enemy(this.ctx, y, x, 1));
    }
    for (let i = 0; i <= 600; i += 60) {
      const y = 80 + i;
      let x = 200;
      this.enemies.push(new Enemy(this.ctx, y, x, 1));
    }
  }

  checkPlayerLaserCollisions() {
    this.player.lasers.forEach((laser) => {
      this.enemies.forEach((enemy) => {
        if (enemy.didCollide(laser)) {
          const removeEnemy = this.enemies.indexOf(enemy);
          this.enemies.splice(removeEnemy, 1);
          const removeLaser = this.player.lasers.indexOf(laser);
          this.player.lasers.splice(removeLaser, 1);
          new Audio("./sound/enemydie.mp3").play();
        }
      });
    });
  }

  checkEnemyLaserCollisions(){
    this.enemyLasers.forEach((enemyLaser) => {
        if (this.player.didCollide(enemyLaser)) {
          console.log("you killed me motherfucker!!");
          this.gameIsOver = true;
          let gameOverSound = new Audio("./sound/gameover.mp3").play();
          // gameOverSound.pause();
          // gameOverSound.currentTime = 0;
        }
    });
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (this.player.didCollide(enemy)) {
        this.gameIsOver = true;
      }
    });
  }

  enemyShoot() {
    const randomEnemyIdx = Math.floor(Math.random() * this.enemies.length)
    const randomEnemy = this.enemies[randomEnemyIdx]
      const laserEnemy = new EnemyLaser(randomEnemy.x, randomEnemy.y, this.ctx);
      this.enemyLasers.push(laserEnemy);
  }
}
