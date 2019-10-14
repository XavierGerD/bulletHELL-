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
    if (this.PowerUpType === "Dmg") {
      gameEngine.player.damage += 0.5;
      return;
    } else if (this.PowerUpType === "megabomb") {
      if (gameEngine.player.megaBombs < gameEngine.player.maxMegaBombs) {
        gameEngine.player.megaBombs++;
      }
      return;
    } else if (this.PowerUpType === "RoF") {
      if (gameEngine.player.rateOfFire > 200) {
        gameEngine.player.rateOfFire -= 100;
      }
      return;
    } else if (this.PowerUpType === "Health") {
      if (gameEngine.player.health < 3) {
        gameEngine.player.health++;
      }
      return;
    }
    gameEngine.player.PowerUpType = this.PowerUpType;
  };
}

class DoubleShoot extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.PowerUpType = "double";
    this.image = doubleShootPwrUp;
    this.points = 100;
  }
}

class TripleShoot extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.PowerUpType = "triple";
    this.image = tripleShootPwrUp;
    this.points = 125;
  }
}

class IncreaseDamage extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.PowerUpType = "Dmg";
    this.image = increaseDmg;
    this.points = 75;
  }
}

class ExtraMegaBomb extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.PowerUpType = "megabomb";
    this.image = megaBombPwrUp;
    this.points = 150;
  }
}

class IncreaseRoF extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.PowerUpType = "RoF";
    this.image = increaseRoF;
    this.points = 75;
  }
}

class HealthUp extends PowerUp {
  constructor(x, y) {
    super(x, y);
    this.PowerUpType = "Health";
    this.image = healthUp;
    this.points = 200;
  }
}
