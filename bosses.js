class Boss {
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
}

class JackyBoy extends Boss {
  constructor(x, y) {
    super(x, y);
    this.image = jackyBoyImg;
    this.health = 50;
    this.points = 1250;
    // this.flashArray = enemy3flashAnim;
    this.explArray = enemy3Expl;
    this.shootPatternX = SHOOTPATTERN2X;
    this.shootPatternY = SHOOTPATTERN2Y;
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
