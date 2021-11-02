
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

    //setInterval(function() {
      this.generateEnemies();
      console.log('enemies going down')
    //}, 1000);

    // Any function provided to eventListener
    document.body.addEventListener("keydown", this.handleKeyDown);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  startLoop() {
    const loop = () => {
      
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // if (Math.random() > 0.99) {
      //   const y = Math.random() * this.canvas.height;
      //   const x = this.canvas.width - 20;
      //   this.enemies.push(new Enemy(this.ctx, y, x, 1));
      // }

      // 1. UPDATE THE STATE OF PLAYER AND WE MOVE THE OBSTACLES

      // this.enemies.forEach((enemy) => {
      //  enemy.move();
      // });

      // for (let i = 0; i <= 800; i+=40) {


      // this.enemies.forEach(enemy => {
      //   enemy.update();
      //   setInterval(function(){ console.log('enemies going down') }, 500);
      // })

      this.checkCollisions();

      // 2. CLEAR THE CANVAS
      
      // 3. UPDATE THE CANVAS
      // Draw the player

      this.player.draw();

      // Draw the laser

      this.player.lasers.forEach(laser => {
        console.log('is painting the laser')
        laser.drawLaser()
      })

      // Draw the enemies

      this.enemies.forEach((enemy) => {
      enemy.drawEnemy();
      enemy.update();
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

  generateEnemies(){
    for (let i = 0; i <= 700; i+=60) {
      const y = 10+i;
      let x = 20;
      this.enemies.push(new Enemy(this.ctx, y, x, 1));
      console.log("make an enemy")
    }
  }

  checkLaserCollisions() {
    this.player.lasers.forEach((laser) => {
      if (this.enemy.didCollide(laser)) {
        console.log("die motherfucker!");
      }
    });
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
