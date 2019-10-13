let setFlashCounter = () => {
  gameEngine.globalFlashCounter = 1;
  flashCounterDecrease();
};

let flashCounterDecrease = () => {
  if (gameEngine.globalFlashCounter > 0) {
    gameEngine.globalFlashCounter -= 0.005;
    setTimeout(flashCounterDecrease, 10);
  }
};

let playAreaFlash = () => {
  ctx.fillStyle = "rgba(255, 255, 255," + gameEngine.globalFlashCounter + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

class Parallax {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
  }
}

let garbageCollection = () => {
  gameEngine.enemyBullets.forEach((bullet, i) => {
    if (bullet.x < 0 || bullet.x > GAME_WIDTH || bullet.y < 0 || bullet.y > GAME_HEIGHT) {
      gameEngine.enemyBullets.splice(i, 1);
    }
  });
  gameEngine.enemies.forEach((enemy, i) => {
    if (enemy.exploded) {
      gameEngine.enemies.splice(i, 1);
    }
  });
  gameEngine.playerBullets.forEach((bullet, i) => {
    if (bullet.y < 0) {
      gameEngine.playerBullets.splice(i, 1);
    }
  });
};

class SwipeAnim {
  constructor(elementHeight, speed, img, func) {
    this.elementHeight = elementHeight;
    this.x = 0;
    this.y = -this.elementHeight;
    this.clearX = canvas.width;
    this.clearY = this.y + this.elementHeight / 2;
    this.speed = speed;
    this.img = img;
    this.animDone = false;
    this.nextFunc = func;
  }
  makeAnim = () => {
    ctx.clearRect(0, 0, this.clearX, this.clearY);
    ctx.drawImage(background, 0, 0, this.clearX, this.clearY, 0, 0, canvas.width, this.clearY);
    ctx.drawImage(parallax1, 0, 0, this.clearX, this.clearY, 0, 0, canvas.width, this.clearY);
    ctx.drawImage(parallax2, 0, 0, this.clearX, this.clearY, 0, 0, canvas.width, this.clearY);
    ctx.drawImage(parallax3, 0, 0, this.clearX, this.clearY, 0, 0, canvas.width, this.clearY);
    ctx.drawImage(this.img, this.x, this.y);
    this.y = this.y + this.speed;
    this.clearY = this.y + this.elementHeight / 2;
    if (this.y < canvas.height) {
      window.requestAnimationFrame(this.makeAnim);
    }
    if (this.y >= canvas.height) {
      this.nextFunc();
    }
  };
}
