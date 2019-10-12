class bullet {
  update() {
    this.x = this.x + this.speed * this.xModifier;
    this.y = this.y + this.speed * this.yModifier;
  }
}

class bulletT1 extends bullet {
  constructor(enemyX, enemyY, bulletSpeedModifier, xModifier, yModifier) {
    super();
    this.x = enemyX + ENEMY1_WIDTH / 2;
    this.y = enemyY + ENEMY1_HEIGHT / 2;
    this.speed = 0.5 + bulletSpeedModifier;
    this.xModifier = xModifier;
    this.yModifier = yModifier;
    this.image = bulletImage01;
  }
}

class playerBullet extends bullet {
  constructor(playerX, playerY, xModifier, yModifier) {
    super();
    this.x = playerX;
    this.y = playerY;
    this.speed = -2;
    this.xModifier = xModifier;
    this.yModifier = yModifier;
    this.image = bulletImage02;
  }
}
