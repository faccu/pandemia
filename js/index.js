// General function that will update the HTML content dinamically

const buildDom = (html) => {
  const main = document.querySelector("main");
  main.innerHTML = html;
};

// First Screen => Splash Screen
const buildSplashScreen = () => {
  buildDom(`
  <div class="outer">
    <div class="middle">
      <div class="inner logo-splash">
      <img src="./images/logo.png" alt="" style="width:50%;"/>
      <br/>
      <button id="start-button" class="blink">START</button>
      <br/>
      <p>Coronavirus is taking over the world! Is your duty to stop it.<br>Use the arrows (← →) to move the character and the spacebar for shooting.</p>
      </div>
    </div>
  </div>
  <div class="footer">
      <p>ORIGINAL GAME: © TAMED YOUTH STUDIOS 2021<br>LICENSED TO NIENTIENDO</p>
  </div>
  
  `)
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", buildGameScreen);
};

// 
const buildGameScreen = () => {
  buildDom(`
  <div class="">
    <div class="">
      <div class="">
        <div id="game-board">
        <canvas class="glow" id="canvas" width="800" height="500"></canvas>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <button id="end-button">FINISH</button>
  </div>
  `);
  const endButton = document.getElementById("end-button");
  endButton.addEventListener("click", buildGameOver);
  const game = new Game();
  game.start();
  new Audio('./sound/start.mp3').play();
};

// Third Screen => You Win

const buildYouWin = () => {
  buildDom(`
  <div class="outer">
    <div class="middle">
      <div class="inner">
        <section class="game-over">
        <h1>CONGRATS</h1>
        <p>You flattened the curve!</p>
        <button id="game" class="blink">PLAY AGAIN</button>
        <div class= "pointer"> </div>
        </section>
      </div>
    </div>
  </div>
  <div class="footer">
      <p>ORIGINAL GAME: © TAMED YOUTH STUDIOS 2021<br>LICENSED TO NIENTIENDO</p>
  </div>
  `);
  const restartButton = document.querySelector("button");
  restartButton.addEventListener("click", buildGameScreen);
};

// Fourth Screen => Game Over

const buildGameOver = () => {
  buildDom(`
  <div class="outer">
    <div class="middle">
      <div class="inner">
        <section class="game-over">
        <h1>GAME OVER</h1>
        <button id="game" class="blink">TRY AGAIN</button>
        <div class= "pointer"> </div>
        </section>
      </div>
    </div>
  </div>
  <div class="footer">
      <p>ORIGINAL GAME: © TAMED YOUTH STUDIOS 2021<br>LICENSED TO NIENTIENDO</p>
  </div>
  `);
  const restartButton = document.querySelector("button");
  restartButton.addEventListener("click", buildGameScreen);
};

// When the window loads, then we will run the "buildSplashScreen" function
// "load" waits for the html and JS
window.addEventListener("load", buildSplashScreen);
