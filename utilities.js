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
