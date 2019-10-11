class bullet {
  update(speed) {
    this.x = this.x + speed * this.xModifier;
    this.y = this.y + speed * this.yModifier;
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
    this.x = playerX + PLAYER_WIDTH / 2 - 2;
    this.y = playerY;
    this.speed = 0.5;
    this.xModifier = xModifier;
    this.yModifier = yModifier;
    this.image = bulletImage02;
  }
}
