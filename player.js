class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 20;
    this.speed = PLAYER_SPEED;
    this.damage = 1;
    this.health = 3;
    this.flashArray = playerFlashArray;
    this.flashCounter = 0;
    this.image = playerImage01;
    this.megaBombs = 1;
    this.maxMegaBombs = 2;
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
    playerBullets.push(new playerBullet(this.x, this.y, 0, 1));
  }
  megaBomb = () => {
    if (player.megaBombs > 0) {
      setFlashCounter();
      enemies.forEach(enemy => {
        enemy.explode();
      });
      this.megaBombs--;
    }
  };

  loseCondition = () => {
    if (this.health < 1) {
      gameLost();
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
