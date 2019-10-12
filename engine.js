let enemyBullets = [];
let playerBullets = [];
let allEnemies = [];
let enemySpawnModifier = 1;
let enemies = [];
let powerups = [];
let fireRate = 100;
let enemySpawnRate = 6000;
let powerUpSpawnRate = 1000;
let player = new Player();
let enemyTypeModifier = 2;
let powerUpTypeModifier = 5;

let drawGame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(background, 0, 0);

  enemyBullets.forEach(bullet => {
    ctx.drawImage(bullet.image, bullet.x, bullet.y);
  });

  playerBullets.forEach(bullet => {
    ctx.drawImage(bullet.image, bullet.x, bullet.y);
  });

  enemies.forEach(enemy => {
    ctx.drawImage(enemy.image, enemy.x, enemy.y);
  });

  powerups.forEach(power => {
    ctx.drawImage(power.image, power.x, power.y);
  });

  ctx.drawImage(player.image, player.x, player.y);

  ctx.drawImage(healthbar, canvas.width - 44, canvas.height - 24);
  for (let i = 0; i < player.health; i++) {
    ctx.drawImage(healthblock, canvas.width - 38 + i * 10, canvas.height - 18);
  }
  for (let i = 0; i < player.maxMegaBombs; i++) {
    ctx.drawImage(megaBombSilhouetteImg, 10 + i * 20, canvas.height - 20);
  }
  for (let i = 0; i < player.megaBombs; i++) {
    ctx.drawImage(megaBombImg, 10 + i * 20, canvas.height - 20);
  }
  playAreaFlash();
  window.requestAnimationFrame(drawGame);
};

let enemiesShoot = () => {
  enemies.forEach(enemy => {
    enemy.shoot();
  });
};

let move = () => {
  enemies.forEach(enemy => {
    enemy.update(0, ENEMY1_SPEED);
  });
  enemyBullets.forEach(bullet => {
    bullet.update();
  });
  playerBullets.forEach(bullet => {
    bullet.update();
  });
  powerups.forEach(power => {
    power.update();
  });
  garbageCollection();
};

let gameDifficulty = () => {
  enemySpawnRate = enemySpawnRate - 500;
};

let detectCollision = () => {
  playerBullets.forEach((bullet, j) => {
    enemies.forEach((enemy, i) => {
      if (bullet.x > enemy.x && bullet.x < enemy.x + ENEMY1_WIDTH && bullet.y > enemy.y && bullet.y < enemy.y + ENEMY1_HEIGHT) {
        enemy.health = enemy.health - player.damage;
        if (enemy.health > 0) {
          enemy.flash();
        }

        playerBullets.splice(j, 1);
        if (enemy.health <= 0) {
          enemy.explode();
        }
      }
    });
  });

  enemyBullets.forEach((bullet, i) => {
    if (bullet.x > player.x && bullet.x < player.x + PLAYER_WIDTH && bullet.y > player.y && bullet.y < player.y + PLAYER_HEIGHT) {
      player.health -= 1;
      enemyBullets.splice(i, 1);
      if (player.health > 0) {
        player.flash();
      }
      player.loseCondition();
    }
  });

  powerups.forEach((power, i) => {
    if (
      power.x + POWERUP_SIZE / 2 > player.x &&
      power.x + POWERUP_SIZE / 2 < player.x + PLAYER_WIDTH &&
      power.y + POWERUP_SIZE / 2 > player.y &&
      power.y + POWERUP_SIZE / 2 < player.y + PLAYER_HEIGHT
    ) {
      power.shootDouble();
      powerups.splice(i, 1);
    }
  });
};

let gameLost = () => {
  clearInterval(shootInterval);
  clearInterval(moveElements);
  clearInterval(generateEnemies);
  clearInterval(collisionInterval);
  clearInterval(keyPressInterval);
  clearInterval(generatePowerUps);
  ctx.font = "20px Kanit";
  ctx.fillStyle = "white";
  ctx.fillText("You lost!", canvas.width / 2 - 45, canvas.height / 2);
  window.requestAnimationFrame(gameLost);
};

enemyGeneration();

window.requestAnimationFrame(drawGame);

let shootInterval = setInterval(enemiesShoot, fireRate);
let collisionInterval = setInterval(detectCollision, GAMESPEED);
let moveElements = setInterval(move, GAMESPEED);
let generateEnemies = setInterval(enemyGeneration, enemySpawnRate);
let generatePowerUps = setInterval(powerupGeneration, powerUpSpawnRate);
let keyPressInterval = setInterval(keyPressListener, GAMESPEED);
let gameDifficultyInterval = setInterval(gameDifficulty, 5000);
