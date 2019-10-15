class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 40;
    this.speed = PLAYER_SPEED;
    this.damage = 1;
    this.health = 3;
    this.flashCounter = 0;
    this.engineCounter = 0;
    this.engineImage = engineAnimArray[this.engineCounter];
    this.image = playerImage01;
    this.PowerUpType = "single";
    this.megaBombs = 1;
    this.maxMegaBombs = 2;
    this.rateOfFire = 800;
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
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 - 4, this.y, 0, 1));
      }
      if (this.PowerUpType === "double") {
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 + 4, this.y, 0, 1));
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 - 14, this.y, 0, 1));
      }
      if (this.PowerUpType === "triple") {
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 - 4, this.y, 0, 1));
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 + 4, this.y, -0.1, 1));
        gameEngine.playerBullets.push(new playerBullet(this.x + PLAYER_WIDTH / 2 - 14, this.y, 0.1, 1));
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
    this.image = playerFlashArray[this.flashCounter];
    this.flashCounter++;
    if (this.flashCounter < playerFlashArray.length) {
      setTimeout(this.flash, 100);
    }
    if (this.flashCounter >= playerFlashArray.length) {
      this.flashCounter = 0;
    }
  };

  animateEngine = () => {
    this.engineImage = engineAnimArray[this.engineCounter];
    this.engineCounter++;
    if (this.engineCounter >= engineAnimArray.length) {
      this.engineCounter = 0;
    }
  };
}
