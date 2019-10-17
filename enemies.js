class Enemy {
  constructor(x, y) {
    this.y = y;
    this.x = x;
    this.speed = 0.5;
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
  constructor(x, y) {
    super(x, y);
    this.image = enemyImage01;
    this.health = 2;
    this.points = 50;
    this.flashArray = enemy1flashAnim;
    this.explArray = enemy1Expl;
    this.shootPatternX = SHOOTPATTERN1X;
    this.shootPatternY = SHOOTPATTERN1Y;
    this.rateOfFire = 3000;
    this.lastShot = new Date() / 1;
    this.spot = x;
  }
  shoot = () => {
    let now = new Date() / 1;
    if (now - this.lastShot > this.rateOfFire) {
      gameEngine.enemyBullets.push(new bulletT1(this.x - 4, this.y, 1, 0, 1));
      gameEngine.enemyBullets.push(new bulletT1(this.x - 4, this.y, 1, -0.38, 0.92));
      gameEngine.enemyBullets.push(new bulletT1(this.x - 4, this.y, 1, 0.38, 0.92));
    } else {
      return;
    }
    this.lastShot = new Date() / 1;
  };

  update(speedX, speedY) {
    // this.x = this.x + speedX
    this.x = this.spot + 15 * Math.cos(Math.PI * 2 / 30 * this.y + Math.PI * 2 / speedY * this.y);
    this.y = this.y + speedY;
  }
}

class EnemyT2 extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.image = enemyImage02;
    this.health = 4;
    this.points = 75;
    this.flashArray = enemy2flashAnim;
    this.explArray = enemy2Expl;
    this.shootPatternX = SHOOTPATTERN2X;
    this.shootPatternY = SHOOTPATTERN2Y;
    this.timeout;
    this.rateOfFire = 500;
    this.lastShot = new Date() / 1;
  }
  shoot = () => {
    let now = new Date() / 1;
    if (now - this.lastShot > this.rateOfFire) {
      let bulletSpeedModifier = 1;
      this.xModifier = this.shootPatternX[this.shootOrder];
      this.yModifier = this.shootPatternY[this.shootOrder];
      this.shootOrder++;
      if (this.shootOrder > this.shootPatternX.length) {
        this.shootOrder = 0;
      }
      gameEngine.enemyBullets.push(new bulletT1(this.x - 4, this.y, bulletSpeedModifier, this.xModifier, this.yModifier));
    } else return;
    this.lastShot = new Date() / 1;
  };
  update(speedX, speedY) {
    // this.x = this.x + speedX
    this.x = this.spot + 30 * Math.cos(Math.PI * 2 / 30 * this.y + Math.PI * 2 / speedY * this.y);
    this.y = this.y + speedY;
  }
}

class EnemyT3 extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.image = enemyImage03;
    this.health = 8;
    this.points = 125;
    this.flashArray = enemy3flashAnim;
    this.explArray = enemy3Expl;
    this.shootPatternX = SHOOTPATTERN3X;
    this.shootPatternY = SHOOTPATTERN3Y;
    this.timeout;
    this.bulletSpeedModifier = 1;
    this.rateOfFire = 500;
    this.lastShot = new Date() / 1;
  }
  shoot = () => {
    let now = new Date() / 1;
    if (now - this.lastShot > this.rateOfFire) {
      this.xModifier = this.shootPatternX[this.shootOrder];
      this.yModifier = this.shootPatternY[this.shootOrder];
      this.shootOrder++;
      if (this.shootOrder > this.shootPatternX.length) {
        this.shootOrder = 0;
      }
      gameEngine.enemyBullets.push(new bulletT1(this.x - 4, this.y, this.bulletSpeedModifier, this.xModifier, this.yModifier));
    } else return;
    this.lastShot = new Date() / 1;
  };
}
