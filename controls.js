let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let spacePressed = false;

let keyDownHandler = e => {
  if (e.code === keyMapping.up) {
    upPressed = true;
  }
  if (e.code === keyMapping.down) {
    downPressed = true;
  }
  if (e.code === keyMapping.left) {
    leftPressed = true;
  }
  if (e.code === keyMapping.right) {
    rightPressed = true;
  }
  if (e.code === keyMapping.shoot) {
    spacePressed = true;
  }
  if (e.code === keyMapping.bomb && gameEngine.gameStart) {
    gameEngine.player.megaBomb();
  }
  if (e.code === "Enter" && gameEngine.gameStart === false) {
    window.cancelAnimationFrame(gameEngine.drawGame);
    let newGame = () => {
      firstEnemy = true;
      gameEngine = new GameEngine();
      gameEngine.player = new Player();
      gameEngine.gameLoop();
    };
    getRandomAnim(newGame);
  }
  if (e.code === keyMapping.pause) {
    if (!gameEngine.isPaused && gameEngine.gameStart) {
      gameEngine.pause();
      gameEngine.isPaused = true;
    } else if (gameEngine.isPaused && gameEngine.gameStart) {
      gameEngine.unpause();
      gameEngine.isPaused = false;
      window.cancelAnimationFrame(gameEngine.gamePausedScreen);
    }
  }
};

let keyUpHandler = e => {
  if (e.code === "ArrowUp") {
    upPressed = false;
  }
  if (e.code === "ArrowDown") {
    downPressed = false;
  }
  if (e.code === "ArrowLeft") {
    leftPressed = false;
  }
  if (e.code === "ArrowRight") {
    rightPressed = false;
  }
  if (e.code === "Space") {
    spacePressed = false;
  }
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let keyPressListenerFrame;

let keyPressListener = () => {
  if (upPressed) {
    gameEngine.player.moveUp();
  }
  if (downPressed) {
    gameEngine.player.moveDown();
  }
  if (leftPressed) {
    gameEngine.player.moveLeft();
    if (gameEngine.parallaxees[0].x > -4) {
      gameEngine.parallaxees[0].x -= 0.07;
    }
    if (gameEngine.parallaxees[1].x > -10) {
      gameEngine.parallaxees[1].x -= 0.15;
    }
    if (gameEngine.parallaxees[2].x > -13) {
      gameEngine.parallaxees[2].x -= 0.2;
    }
  }
  if (rightPressed) {
    gameEngine.player.moveRight();
    if (gameEngine.parallaxees[0].x < 4) {
      gameEngine.parallaxees[0].x += 0.07;
    }
    if (gameEngine.parallaxees[1].x < 10) {
      gameEngine.parallaxees[1].x += 0.15;
    }
    if (gameEngine.parallaxees[2].x < 13) {
      gameEngine.parallaxees[2].x += 0.2;
    }
  }
  if (spacePressed) {
    gameEngine.player.shoot();
  }
  keyPressListenerFrame = window.requestAnimationFrame(keyPressListener);
};
