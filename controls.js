let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

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
    player.shoot();
  }
  if (e.code === "KeyZ") {
    player.megaBomb();
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
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let keyPressListener = () => {
  if (upPressed) {
    player.moveUp();
  }
  if (downPressed) {
    player.moveDown();
  }
  if (leftPressed) {
    player.moveLeft();
  }
  if (rightPressed) {
    player.moveRight();
  }
};
