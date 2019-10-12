class Enemy {
  constructor(x, enemySpeedModifier) {
    this.y = -ENEMY1_HEIGHT;
    this.x = x;
    this.speed = 0.5 + enemySpeedModifier;
    this.xModifier = 0;
    this.yModifier = 1;
    this.shootOrder = 0;
    this.flashCounter = 0;
    this.explosionCounter = 0;
    this.exploded = false;
  }
  update(speedX, speedY) {
    this.x = this.x + speedX;
    this.y = this.y + speedY;
  }
  shoot() {
    let bulletSpeedModifier = 1;
    this.xModifier = this.shootPatternX[this.shootOrder];
    this.yModifier = this.shootPatternY[this.shootOrder];
    this.shootOrder++;
    if (this.shootOrder > this.shootPatternX.length) {
      this.shootOrder = 0;
    }
    enemyBullets.push(new bulletT1(this.x, this.y, bulletSpeedModifier, this.xModifier, this.yModifier));
  }
  explode = () => {
    this.image = this.explArray[this.explosionCounter];
    this.explosionCounter++;
    if (this.explosionCounter < this.explArray.length) {
      this.timeout = setTimeout(this.explode, 100);
    } else if (this.explosionCounter >= this.explArray.length) {
      this.exploded = true;
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

class EnemyT1 extends Enemy {
  constructor(x, enemySpeedModifier) {
    super(x, enemySpeedModifier);
    this.image = enemyImage01;
    this.health = 5;
    this.flashArray = enemy1flashAnim;
    this.explArray = enemy1Expl;
    this.shootPatternX = SHOOTPATTERN1X;
    this.shootPatternY = SHOOTPATTERN1Y;
  }
}

class EnemyT2 extends Enemy {
  constructor(x, y, enemySpeedModifier) {
    super(x, enemySpeedModifier);
    this.image = enemyImage02;
    this.health = 8;
    this.flashArray = enemy2flashAnim;
    this.explArray = enemy1Expl;
    this.shootPatternX = SHOOTPATTERN2X;
    this.shootPatternY = SHOOTPATTERN2Y;
    this.timeout;
  }
}
