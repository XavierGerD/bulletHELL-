let enemyBullets = [];
let playerBullets = [];
let allEnemies = [];
let enemySpawnModifier = 1;
let enemies = [];
let fireRate = 100;
let enemySpawnRate = 6000;
let player = new Player();
let enemyTypeModifier = 2;

let drawGame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);
  enemies.forEach(enemy => {
    ctx.drawImage(enemy.image, enemy.x, enemy.y);
  });
  enemyBullets.forEach(bullet => {
    ctx.drawImage(bullet.image, bullet.x, bullet.y);
  });
  playerBullets.forEach(bullet => {
    ctx.drawImage(bullet.image, bullet.x, bullet.y);
  });
  ctx.drawImage(player.image, player.x, player.y);

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
    bullet.update(2);
  });
  playerBullets.forEach(bullet => {
    bullet.update(-2);
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
        enemy.health--;
        playerBullets.splice(j, 1);
        if (enemy.health <= 0) {
          enemy.explode();
        }
      }
    });
  });

  enemyBullets.forEach(bullet => {
    if (bullet.x > player.x && bullet.x < player.x + PLAYER_WIDTH && bullet.y > player.y && bullet.y < player.y + PLAYER_HEIGHT) {
      gameLost();
    }
  });
};

let gameLost = () => {
  clearInterval(shootInterval);
  clearInterval(moveElements);
  clearInterval(generateEnemies);
  clearInterval(collisionInterval);
  clearInterval(keyPressInterval);
  ctx.font = "20px Kanit";
  ctx.fillStyle = "white";
  ctx.fillText("You lost!", canvas.width / 2 - 45, canvas.height / 2);
  window.requestAnimationFrame(gameLost);
};

enemyGeneration();

let shootInterval = setInterval(enemiesShoot, fireRate);
let moveElements = setInterval(move, GAMESPEED);
let generateEnemies = setInterval(enemyGeneration, enemySpawnRate);
let collisionInterval = setInterval(detectCollision, GAMESPEED);
let keyPressInterval = setInterval(keyPressListener, GAMESPEED);
let gameDifficultyInterval = setInterval(gameDifficulty, 5000);

window.requestAnimationFrame(drawGame);
