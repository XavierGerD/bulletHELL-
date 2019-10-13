let spotGeneration = () => {
  let spots = GAME_WIDTH / ENEMY1_WIDTH;
  let nextShip = Math.floor(Math.random() * spots);
  if (gameEngine.enemies.length < MAX_ENEMIES) {
    return nextShip * ENEMY1_WIDTH;
  }
};

let enemyGenerationFrame;

let enemyGeneration = () => {
  if (gameEngine.firstEnemy) {
    {
      gameEngine.enemies.push(new EnemyT1(spotGeneration(), 1));
      gameEngine.firstEnemy = false;
    }
  }
  let now = new Date() / 1;
  if (now - gameEngine.lastEnemyGenerated > gameEngine.enemySpawnRate) {
    let enemyType = Math.floor(Math.random() * gameEngine.enemyTypeModifier + 1);
    if (enemyType === 1) {
      gameEngine.enemies.push(new EnemyT1(spotGeneration(), 1));
    }
    if (enemyType === 2) {
      gameEngine.enemies.push(new EnemyT2(spotGeneration(), 1));
    }
    if (enemyType === 3) {
      gameEngine.enemies.push(new EnemyT3(spotGeneration(), 1));
    }
  } else {
    enemyGenerationFrame = window.requestAnimationFrame(enemyGeneration);
    return;
  }
  gameEngine.lastEnemyGenerated = new Date() / 1;
  enemyGenerationFrame = window.requestAnimationFrame(enemyGeneration);
};

let powerUpGenerationFrame;

let powerupGeneration = () => {
  let now = new Date() / 1;
  if (now - gameEngine.lastPowerUpGenerated > gameEngine.powerUpSpawnRate) {
    let isPowerUpSpawned = Math.floor(Math.random() + 1);
    if (isPowerUpSpawned === 1) {
      let powerUpType = Math.floor(Math.random() * gameEngine.powerUpTypeModifier * 10 + 1);
      if (powerUpType > 1 && powerUpType < 11) {
        gameEngine.powerups.push(new IncreaseDamage(spotGeneration(), 1));
      }
      if (powerUpType >= 11 && powerUpType < 21) {
        gameEngine.powerups.push(new IncreaseRoF(spotGeneration(), 1));
      }
      if (powerUpType >= 21 && powerUpType < 26) {
        gameEngine.powerups.push(new DoubleShoot(spotGeneration(), 1));
      }
      if (powerUpType >= 26 && powerUpType < 31) {
        gameEngine.powerups.push(new TripleShoot(spotGeneration(), 1));
      }
      if (powerUpType >= 31 && powerUpType < 34) {
        gameEngine.powerups.push(new ExtraMegaBomb(spotGeneration(), 1));
      }
      if (powerUpType >= 34 && powerUpType < 36) {
        gameEngine.powerups.push(new HealthUp(spotGeneration(), 1));
      }
      return;
    }
  } else {
    powerUpGenerationFrame = window.requestAnimationFrame(powerupGeneration);
    return;
  }
  gameEngine.lastPowerUpGenerated = new Date() / 1;
  powerUpGenerationFrame = window.requestAnimationFrame(powerupGeneration);
};
