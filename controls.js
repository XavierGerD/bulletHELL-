let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let spacePressed = false;

let keyDownHandler = e => {
  if (e.code === "ArrowUp") {
    upPressed = true;
  }
  if (e.code === "ArrowDown") {
    downPressed = true;
  }
  if (e.code === "ArrowLeft") {
    leftPressed = true;
  }
  if (e.code === "ArrowRight") {
    rightPressed = true;
  }
  if (e.code === "Space") {
    spacePressed = true;
  }
  if (e.code === "KeyZ" && gameEngine.gameStart) {
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

    let anim = new SwipeAnim(50, 20, swipeAnimImg, newGame);
    anim.makeAnim();
    return;
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
