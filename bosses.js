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
    this.wakaplayed = false;
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
    this.salvoCounter = 0;
    this.timeBetweenSalvo = 3000;
    this.lastSalvo = new Date() / 1;
    this.rateOfFire = 300;
    this.lastShot = new Date() / 1;
    this.size = 60;
    this.areEyesAnim = false;
    this.eyesImage = eyesAnim01;
    this.eyesImagesCounter = 0;
    this.eyesAnimRoF = 200;
    this.lastEyesAnim = new Date() / 1;
    this.animPart = 1;
    this.canShoot = false;
  }
  shoot = () => {
    if (this.canShoot) {
      let now = new Date() / 1;
      if (now - this.lastSalvo > this.timeBetweenSalvo) {
        if (now - this.lastShot > this.rateOfFire) {
          enemy1shoot.play();
          gameEngine.enemyBullets.push(new bulletT2(this.x + this.size / 2 - 2, this.y + this.size - 5, 1, 0, 1));
          gameEngine.enemyBullets.push(new bulletT2(this.x + this.size / 2 - 2, this.y + this.size - 5, 1, -0.38, 0.92));
          gameEngine.enemyBullets.push(new bulletT2(this.x + this.size / 2 - 2, this.y + this.size - 5, 1, 0.38, 0.92));
          this.salvoCounter++;
          if (this.salvoCounter === 7) {
            this.salvoCounter = 0;
            this.lastSalvo = new Date() / 1;
          }
        } else {
          return;
        }
        this.lastShot = new Date() / 1;
      }
    }
  };

  update(speedX, speedY) {
    this.x = this.x + speedX;
    this.y = this.y + speedY;
  }

  animateEyes = () => {
    let now = new Date() / 1;
    if (now - this.lastEyesAnim > this.eyesAnimRoF) {
      if (this.areEyesAnim) {
        this.eyesImage = eyesAnimArray[this.eyesImagesCounter];
        this.eyesImagesCounter++;
        if (this.eyesImagesCounter >= eyesAnimArray.length) {
          this.eyesImagesCounter = 0;
        }
        this.lastEyesAnim = new Date() / 1;
      }
    }
  };

  entranceAnim = () => {
    if (this.y > -50 && this.animPart === 1) {
      flyingDragon.stop();
      chromatic.play();
      document.removeEventListener("keydown", keyDownHandler, false);

      gameEngine.enemies.forEach(enemy => {
        if (enemy.y > -200) {
          enemy.explode();
        }
      });
      gameEngine.enemyBullets.forEach((bull, i) => {
        gameEngine.enemyBullets.splice(i, 1);
      });
      enemydead.play();
      this.animPart = 2;
    }
    if (this.y > 45 && this.animPart === 2) {
      waka.play();
      this.animPart = 3;
    }
    if (this.y > 60 && this.animPart === 3) {
      this.areEyesAnim = true;
      this.canShoot = true;
      this.lastSalvo = new Date() / 1;
      obfus.play();
      document.addEventListener("keydown", keyDownHandler, false);
      this.animPart = 4;
    }
  };
}
