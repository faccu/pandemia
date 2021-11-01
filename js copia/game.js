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
        this.player.setDirection("right");
      } else if (event.code === "ArrowLeft") {
        this.player.setDirection("left");
      }
    };

    this.handleKeyUp = (event) => {
      if (event.code === "ArrowRight") {
        this.player.setDirection("right");
      } else if (event.code === "ArrowLeft") {
        this.player.setDirection("left");
      }
    };

    // Any function provided to eventListener
    document.body.addEventListener("keydown", this.handleKeyDown);
    document.body.addEventListener("keyup", this.handleKeyUp);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  startLoop() {
    const loop = () => {
      // We create the enemies with random y
      if (Math.random() > 0.99) {
        const y = Math.random() * this.canvas.height;
        const x = this.canvas.width - 20;
        this.enemies.push(new Enemy(this.ctx, y, x, 1));
      }

      // 1. UPDATE THE STATE OF PLAYER AND WE MOVE THE OBSTACLES
      this.player.update();
      this.enemies.forEach((enemy) => {
        enemy.move();
      });

      this.checkCollisions();

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. UPDATE THE CANVAS
      // Draw the player
      this.player.draw();

      // Draw the enemies
      this.enemies.forEach((enemy) => {
        enemy.draw();
      });

      // 4. TERMINATE LOOP IF GAME IS OVER
      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      } else {
        buildGameOver();
      }
    };

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we need to `start an infinitive loop` till the game is over
    window.requestAnimationFrame(loop);
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