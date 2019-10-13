class GameEngine {
  constructor() {
    this.gameStart = true;
    this.enemyBullets = [];
    this.playerBullets = [];
    this.allEnemies = [];
    this.enemySpawnModifier = 1;
    this.enemies = [];
    this.powerups = [];
    this.fireRate = 100;
    this.enemySpawnRate = 7000;
    this.powerUpSpawnRate = 18000;
    this.player = new Player();
    this.enemyTypeModifier = 1;
    this.powerUpTypeModifier = 2;
    this.globalFlashCounter = 0;
    this.shootInterval;
    this.collisionInterval;
    this.moveElements;
    this.generateEnemies;
    this.generatePowerUps;
    this.keyPressInterval;
    this.gameDifficultyInterval;
    this.score = 0;
    this.parallaxees = [new Parallax(0, 0, parallax1), new Parallax(0, 0, parallax2), new Parallax(0, 0, parallax3)];
    this.animationFrame;
  }

  drawGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0);

    this.parallaxees.forEach(paral => {
      ctx.drawImage(paral.image, paral.x, paral.y);
    });

    this.enemyBullets.forEach(bullet => {
      ctx.drawImage(bullet.image, bullet.x, bullet.y);
    });

    this.playerBullets.forEach(bullet => {
      ctx.drawImage(bullet.image, bullet.x, bullet.y);
    });

    this.enemies.forEach(enemy => {
      ctx.drawImage(enemy.image, enemy.x, enemy.y);
    });

    this.powerups.forEach(power => {
      ctx.drawImage(power.image, power.x, power.y);
    });

    ctx.drawImage(this.player.image, this.player.x, this.player.y);

    ctx.drawImage(this.player.engineImage, this.player.x + PLAYER_WIDTH / 2 - 2, this.player.y + PLAYER_HEIGHT - 5);

    ctx.drawImage(healthbar, canvas.width - 44, canvas.height - 24);
    for (let i = 0; i < this.player.health; i++) {
      ctx.drawImage(healthblock, canvas.width - 38 + i * 10, canvas.height - 18);
    }
    for (let i = 0; i < this.player.maxMegaBombs; i++) {
      ctx.drawImage(megaBombSilhouetteImg, 10 + i * 20, canvas.height - 20);
    }
    for (let i = 0; i < this.player.megaBombs; i++) {
      ctx.drawImage(megaBombImg, 10 + i * 20, canvas.height - 20);
    }

    ctx.font = "20px Kanit";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + this.score, 10, 20);

    playAreaFlash();
    window.requestAnimationFrame(this.drawGame);
  };

  enemiesShoot = () => {
    this.enemies.forEach(enemy => {
      enemy.shoot();
    });
  };

  move = () => {
    this.enemies.forEach(enemy => {
      enemy.update(0, ENEMY1_SPEED);
    });
    this.enemyBullets.forEach(bullet => {
      bullet.update();
    });
    this.playerBullets.forEach(bullet => {
      bullet.update();
    });
    this.powerups.forEach(power => {
      power.update();
    });
    garbageCollection();
  };

  gameDifficulty = () => {
    if (this.enemySpawnRate > 1000) {
      this.enemySpawnRate = this.enemySpawnRate - 200;
    }

    if (this.score >= 500) {
      this.enemyTypeModifier = 2;
      this.powerUpTypeModifier = 3;
    }
    if (this.score >= 1500) {
      this.enemyTypeModifier = 3;
      this.powerUpTypeModifier = 4;
    }
    if (this.score >= 4000) {
      this.enemyTypeModifier = 4;
      this.powerUpTypeModifier = 5;
    }
  };

  detectCollision = () => {
    this.playerBullets.forEach((bullet, j) => {
      this.enemies.forEach((enemy, i) => {
        if (
          bullet.x > enemy.x &&
          bullet.x + BULLET_SIZE < enemy.x + ENEMY1_WIDTH &&
          bullet.y > enemy.y &&
          bullet.y + BULLET_SIZE < enemy.y + ENEMY1_HEIGHT
        ) {
          enemy.health = enemy.health - this.player.damage;
          if (enemy.health > 0) {
            enemy.flash();
          }

          this.playerBullets.splice(j, 1);
          if (enemy.health <= 0) {
            this.score += enemy.points;
            this.gameDifficulty();
            enemy.explode();
          }
        }
      });
    });

    this.enemyBullets.forEach((bullet, i) => {
      if (
        bullet.x > this.player.x &&
        bullet.x + BULLET_SIZE < this.player.x + PLAYER_WIDTH &&
        bullet.y > this.player.y &&
        bullet.y + BULLET_SIZE < this.player.y + PLAYER_HEIGHT
      ) {
        this.player.health -= 1;
        this.enemyBullets.splice(i, 1);
        if (this.player.health > 0) {
          this.player.flash();
        }
        this.player.loseCondition();
      }
    });

    this.powerups.forEach((power, i) => {
      if (
        power.x + POWERUP_SIZE / 2 > this.player.x &&
        power.x + POWERUP_SIZE / 2 < this.player.x + PLAYER_WIDTH &&
        power.y + POWERUP_SIZE / 2 > this.player.y &&
        power.y + POWERUP_SIZE / 2 < this.player.y + PLAYER_HEIGHT
      ) {
        power.shootDouble();
        this.powerups.splice(i, 1);
      }
    });
  };

  gameLost = () => {
    this.gameStart = false;
    clearInterval(this.shootInterval);
    clearInterval(this.moveElements);
    clearInterval(this.generateEnemies);
    clearInterval(this.collisionInterval);
    clearInterval(this.keyPressInterval);
    clearInterval(this.generatePowerUps);
    clearInterval(this.gameDifficultyInterval);
    ctx.font = "20px Kanit";
    ctx.fillStyle = "white";
    ctx.fillText("You lost!", canvas.width / 2 - 45, canvas.height / 2);
    ctx.fillText("Press Enter to play again!", canvas.width / 2 - 115, canvas.height / 2 + 30);
    window.requestAnimationFrame(this.gameLost);
  };

  gameLoop() {
    enemyGeneration();

    window.requestAnimationFrame(this.drawGame);

    this.shootInterval = setInterval(this.enemiesShoot, this.fireRate);
    this.collisionInterval = setInterval(this.detectCollision, GAMESPEED);
    this.moveElements = setInterval(this.move, GAMESPEED);
    this.generateEnemies = setInterval(enemyGeneration, this.enemySpawnRate);
    this.generatePowerUps = setInterval(powerupGeneration, this.powerUpSpawnRate);
    this.keyPressInterval = setInterval(keyPressListener, GAMESPEED);
    this.gameDifficultyInterval = setInterval(this.gameDifficulty, 5000);
    this.playerAnimationInterval = setInterval(this.player.animateEngine, 300);
  }
}
