class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0.4;
  }
  update(speedY) {
    this.y = this.y + this.speed;
  }
  shootDouble = () => {
    if (this.shootPattern === 4) {
      player.damage += 0.5;
      return;
    } else if (this.shootPattern === 5) {
      if (player.megaBombs < player.maxMegaBombs) {
        player.megaBombs++;
        return;
      }
    } else if (this.shootPattern === 6) {
      player.rateOfFire -= 25;
      return;
    } else {
      return;
    }
    player.shootPattern = this.shootPattern;
  };
}

class DoubleShoot extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.shootPattern = 2;
    this.image = doubleShootPwrUp;
  }
}

class TripleShoot extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.shootPattern = 3;
    this.image = tripleShootPwrUp;
  }
}

class IncreaseDamage extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.shootPattern = 4;
    this.image = increaseDmg;
  }
}

class ExtraMegaBomb extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.shootPattern = 5;
    this.image = megaBombPwrUp;
  }
}

class IncreaseRoF extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.shootPattern = 6;
    this.image = increaseRoF;
  }
}
