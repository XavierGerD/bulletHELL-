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
    this.firstEnemy = true;
    this.lastEnemyGenerated = new Date() / 1;
    this.difficultyInterval = new Date() / 1;
    this.lastPowerUpGenerated = new Date() / 1;
    this.lastShotRound = new Date() / 1;
    this.maxEnemies = 5;
    this.enemySpawnRate = 4000;
    this.powerUpSpawnRate = 10000;
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
    this.movingStars = new Parallax(0, 0, movingStars);
    this.movingStars2 = new Parallax(0, -canvas.height * 2, movingStars);
    this.isPaused = false;
    this.options;
  }
  // new Parallax(0, 0, parallax3)
  initalizeMap = () => {
    maps[0].forEach(enemy => {
      if (enemy.value === "EnemyT1") {
        this.enemies.push(new EnemyT1(enemy.x, enemy.y));
      }
      if (enemy.value === "EnemyT2") {
        this.enemies.push(new EnemyT2(enemy.x, enemy.y));
      }
      if (enemy.value === "EnemyT3") {
        this.enemies.push(new EnemyT3(enemy.x, enemy.y));
      }
    });
  };

  initalizeCustomMap = selector => {
    customMaps[selector].forEach(enemy => {
      if (enemy.value === "EnemyT1") {
        this.enemies.push(new EnemyT1(enemy.x, enemy.y));
      }
      if (enemy.value === "EnemyT2") {
        this.enemies.push(new EnemyT2(enemy.x, enemy.y));
      }
      if (enemy.value === "EnemyT3") {
        this.enemies.push(new EnemyT3(enemy.x, enemy.y));
      }
    });
  };

  drawGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0);

    this.parallaxees.forEach(paral => {
      ctx.drawImage(paral.image, paral.x, paral.y);
    });

    ctx.drawImage(this.movingStars.image, this.movingStars.x, this.movingStars.y);
    ctx.drawImage(this.movingStars2.image, this.movingStars2.x, this.movingStars2.y);

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

    // ctx.globalCompositeOperation = "ligther";
    ctx.drawImage(this.player.image, this.player.x, this.player.y);
    // ctx.globalAlpha = 0.5;
    // ctx.drawImage(overlay, this.player.x, this.player.y);
    // ctx.globalAlpha = 1;
    // ctx.globalCompositeOperation = "source-over";

    window.requestAnimationFrame(this.drawGame);
  };

  enemiesShoot = () => {
    let now = new Date();
    if (now - this.lastShotRound > this.fireRate) {
      this.enemies.forEach(enemy => {
        if (enemy.y > 0) {
          enemy.shoot();
        }
      });
    }
    this.enemiesShootFrame = window.requestAnimationFrame(this.enemiesShoot);
  };

  move = () => {
    this.enemies.forEach(enemy => {
      enemy.update(0, ENEMY1_SPEED);
    });
    let arrays = [this.enemyBullets, this.playerBullets, this.powerups];
    arrays.forEach(array => {
      array.forEach(element => {
        element.update();
      });
    });

    this.movingStars.y += 7;
    this.movingStars2.y += 7;

    if (this.movingStars.y > canvas.height) {
      this.movingStars.y = -canvas.height * 2;
    }
    if (this.movingStars2.y > canvas.height) {
      this.movingStars2.y = -canvas.height * 2;
    }

    garbageCollection();
    this.moveFrame = window.requestAnimationFrame(this.move);
  };

  gameDifficulty = () => {
    let now = new Date();
    if (now - this.difficultyInterval > 10000) {
      if (this.enemySpawnRate > 1000) {
        this.enemySpawnRate = this.enemySpawnRate - 50;
      }
      if (this.score >= 1000) {
        this.enemyTypeModifier = 2;
        this.powerUpTypeModifier = 3;
        this.maxEnemies = 8;
      }
      if (this.score >= 2500) {
        this.enemyTypeModifier = 3;
        this.powerUpTypeModifier = 4;
        this.maxEnemies = 11;
      }
      if (this.score >= 5000) {
        this.enemyTypeModifier = 4;
        this.powerUpTypeModifier = 5;
        this.maxEnemies = 15;
      }
    } else {
      this.gameDifficultyFrame = window.requestAnimationFrame(this.gameDifficulty);
      return;
    }
    this.difficultyInterval = new Date();
    this.gameDifficultyFrame = window.requestAnimationFrame(this.gameDifficulty);
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
    this.detectCollisionFrame = window.requestAnimationFrame(this.detectCollision);
  };

  isGameLost = () => {
    if (this.player.health < 1) {
      this.gameLost();
      return;
    }
    this.isGameLostFrame = window.requestAnimationFrame(this.isGameLost);
  };

  pause = () => {
    // document.removeEventListener("keydown", keyDownHandler, false);
    this.pauseMenu = new PauseMenu();
    this.pauseMenu.launch();
    window.cancelAnimationFrame(this.isGameLostFrame);
    window.cancelAnimationFrame(this.detectCollisionFrame);
    window.cancelAnimationFrame(keyPressListenerFrame);
    // window.cancelAnimationFrame(enemyGenerationFrame);
    window.cancelAnimationFrame(this.moveFrame);
    window.cancelAnimationFrame(this.gameDifficultyFrame);
    window.cancelAnimationFrame(powerUpGenerationFrame);
    window.cancelAnimationFrame(this.enemiesShootFrame);
  };

  unpause = () => {
    delete this.pauseMenu;
    keyPressListener();
    window.requestAnimationFrame(this.drawGame);
    window.requestAnimationFrame(this.isGameLost);
    window.requestAnimationFrame(this.detectCollision);
    window.requestAnimationFrame(this.move);
    window.requestAnimationFrame(this.gameDifficulty);
    window.requestAnimationFrame(powerupGeneration);
    window.requestAnimationFrame(this.enemiesShoot);
    // window.requestAnimationFrame(enemyGeneration);
  };

  gameLost = () => {
    this.gameStart = false;
    window.cancelAnimationFrame(this.isGameLostFrame);
    window.cancelAnimationFrame(this.detectCollisionFrame);
    window.cancelAnimationFrame(keyPressListenerFrame);
    // window.cancelAnimationFrame(enemyGenerationFrame);
    window.cancelAnimationFrame(this.moveFrame);
    window.cancelAnimationFrame(this.gameDifficultyFrame);
    window.cancelAnimationFrame(powerUpGenerationFrame);
    window.cancelAnimationFrame(this.enemiesShootFrame);
    this.gameLostScreen();
  };

  gameLostScreen = () => {
    ctx.font = "30px Racing Sans One";
    ctx.fillStyle = "white";
    ctx.fillText("YOU LOST!", canvas.width / 2 - 65, canvas.height / 2);
    ctx.fillText("PRESS ENTER", canvas.width / 2 - 85, canvas.height / 2 + 50);
    window.requestAnimationFrame(this.gameLostScreen);
  };

  gameLoop() {
    keyPressListener();

    window.requestAnimationFrame(this.drawGame);
    window.requestAnimationFrame(this.isGameLost);
    window.requestAnimationFrame(this.detectCollision);
    window.requestAnimationFrame(this.move);
    window.requestAnimationFrame(this.gameDifficulty);
    window.requestAnimationFrame(powerupGeneration);
    window.requestAnimationFrame(this.enemiesShoot);

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    this.playerAnimationInterval = setInterval(this.player.animateEngine, 100);
  }
}
