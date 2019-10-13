class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 40;
    this.speed = PLAYER_SPEED;
    this.damage = 1;
    this.health = 3;
    this.flashArray = playerFlashArray;
    this.flashCounter = 0;
    this.image = playerImage01;
    this.PowerUpType = "single";
    this.megaBombs = 1;
    this.maxMegaBombs = 2;
    this.rateOfFire = 1000;
    this.lastShot = new Date() / 1;
  }
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - this.speed;
    }
  }
  moveRight() {
    if (this.x + PLAYER_WIDTH < canvas.width) {
      this.x = this.x + this.speed;
    }
  }
  moveUp() {
    if (this.y > 0) {
      this.y = this.y - this.speed;
    }
  }
  moveDown() {
    if (this.y + PLAYER_HEIGHT < canvas.height) {
      this.y = this.y + this.speed;
    }
  }
  shoot() {
    let now = new Date() / 1;
    if (now - this.lastShot > this.rateOfFire) {
      if (this.PowerUpType === "single") {
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 - 2, this.y, 0, 1));
      }
      if (this.PowerUpType === "double") {
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 + 5, this.y, 0, 1));
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 - 10, this.y, 0, 1));
      }
      if (this.PowerUpType === "triple") {
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 - 2, this.y, 0, 1));
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 + 5, this.y, -0.1, 1));
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 - 10, this.y, 0.1, 1));
      }
    } else {
      return;
    }
    this.lastShot = new Date() / 1;
  }
  megaBomb = () => {
    if (this.megaBombs > 0) {
      setFlashCounter();
      gameEngine.enemies.forEach(enemy => {
        enemy.explode();
      });
      this.megaBombs--;
    }
  };

  loseCondition = () => {
    if (this.health < 1) {
      gameEngine.gameLost();
    }
  };
  flash = () => {
    this.image = this.flashArray[this.flashCounter];
    this.flashCounter++;
    if (this.flashCounter < this.flashArray.length) {
      setTimeout(this.flash, 100);
    }
    if (this.flashCounter >= this.flashArray.length) {
      this.flashCounter = 0;
    }
  };
}
