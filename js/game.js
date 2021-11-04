"use strict";

class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.enemies = [];
    this.player = null;
    this.gameIsOver = false;
    this.score = 0;
  }

  start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");

    // Create a new player for the current game
    this.player = new Player(this.canvas, 3);

    // Add event listener for moving the player
    this.handleKeyDown = (event) => {
      if (event.code === "ArrowRight") {
        this.player.goRight();
      } else if (event.code === "ArrowLeft") {
        this.player.goLeft();
      } else if (event.code === "Space") {
        this.player.shoot();
        new Audio('./sound/playerfire.mp3').play();
      }
    };
    // Any function provided to eventListener
    document.body.addEventListener("keydown", this.handleKeyDown);

    this.generateEnemies();

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  startLoop() {
    const loop = () => {
      // CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.checkCollisions();

      this.checkLaserCollisions();
      
      // UPDATE THE CANVAS
      // Draw the player

      this.player.draw();

      // Draw the laser

      this.player.lasers.forEach(laser => {
        laser.drawLaser()
      })

      // Draw the enemies

      this.enemies.forEach((enemy) => {
        enemy.drawEnemy();
        enemy.update();
        enemy.enemyShoot();
      });

      console.log(this.enemies);
      this.enemies[0].enemyLasers.forEach(laser => {
        laser.drawEnemyLaser();
      })

      // TERMINATE LOOP IF GAME IS OVER

      if (enemies.length <= 0) {
        buildYouWin();
        new Audio('./sound/youwin.mp3').play();
        sound.pause();
        sound.currentTime = 0;
      }

      this.enemies.forEach((enemy, index) => {
        if (enemy.y + enemy.size >= this.canvas.height) {
          buildGameOver();
          new Audio('./sound/gameover.mp3').play();
          sound.pause();
          sound.currentTime = 0;
        }
      });

      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      } else {
        buildGameOver();
        new Audio('./sound/gameover.mp3').play();
        sound.pause();
        sound.currentTime = 0;
      }
    };

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we need to `start an infinitive loop` till the game is over
    window.requestAnimationFrame(loop);
  }

  generateEnemies(){
    for (let i = 0; i <= 700; i+=60) {
      console.log(i)
      const y = 51+i;
      let x = 20;
      this.enemies.push(new Enemy(this.ctx, y, x, 1,));
    }
    for (let i = 0; i <= 600; i+=60) {
      console.log(i)
      const y = 80+i;
      let x = 80;
      this.enemies.push(new Enemy(this.ctx, y, x, 1));
    }
    for (let i = 0; i <= 700; i+=60) {
      console.log(i)
      const y = 51+i;
      let x = 140;
      this.enemies.push(new Enemy(this.ctx, y, x, 1));
    }
    for (let i = 0; i <= 600; i+=60) {
      console.log(i)
      const y = 80+i;
      let x = 200;
      this.enemies.push(new Enemy(this.ctx, y, x, 1));
    }
  }

   checkLaserCollisions() {
     this.player.lasers.forEach((laser) => {
       this.enemies.forEach((enemy) => {
         if(enemy.didCollide(laser)) {
          console.log("die motherfucker!");
          const removeEnemy = this.enemies.indexOf(enemy)
          this.enemies.splice(removeEnemy, 1)
          const removeLaser = this.player.lasers.indexOf(laser)
          this.player.lasers.splice(removeLaser, 1)
          new Audio('./sound/enemydie.mp3').play();
        }
       })
     });
    //  this.enemies.enemyLasers.forEach((laser) => {
    //   this.enemies.forEach((player) => {
    //     if(player.didCollide(enemyLasers)) {
    //      console.log("ouch");
    //      const removePlayer = this.player.indexOf(player)
    //      this.enemies.splice(removePlayer, 1)
    //      const removeEnemyLaser = this.player.enemyLasers.indexOf(laser)
    //      this.player.lasers.splice(removeEnemyLaser, 1)
    //      new Audio('./sound/playerhit.mp3').play();
    //    }
    //   })
    // });
   }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (this.player.didCollide(enemy)) {
        console.log("boom");
        this.gameIsOver = true;
        
      }
    });
  }
}
