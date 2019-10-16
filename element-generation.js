let spotGeneration = () => {
  let spots = GAME_WIDTH / ENEMY1_WIDTH;
  let nextShip = Math.floor(Math.random() * (spots - 2) + 1);
  return nextShip * ENEMY1_WIDTH;
};

let enemyGenerationFrame;

let enemyGeneration = () => {
  if (gameEngine.firstEnemy) {
    {
      gameEngine.enemies.push(new EnemyT1(spotGeneration(), 1));
      gameEngine.firstEnemy = false;
    }
  }
  if (gameEngine.enemies.length < gameEngine.maxEnemies) {
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
  }
  gameEngine.lastEnemyGenerated = new Date() / 1;
  enemyGenerationFrame = window.requestAnimationFrame(enemyGeneration);
};

let powerUpGenerationFrame;

let powerupGeneration = () => {
  let now = new Date() / 1;
  if (now - gameEngine.lastPowerUpGenerated > gameEngine.powerUpSpawnRate) {
    let isPowerUpSpawned = Math.floor(Math.random() * 2 + 1);
    if (isPowerUpSpawned === 1) {
      let powerUpType = Math.floor(Math.random() * gameEngine.powerUpTypeModifier + 1);
      if (powerUpType === 1) {
        gameEngine.powerups.push(new IncreaseDamage(spotGeneration(), 1));
      }
      if (powerUpType === 2) {
        gameEngine.powerups.push(new IncreaseRoF(spotGeneration(), 1));
      }
      if (powerUpType === 3) {
        gameEngine.powerups.push(new DoubleShoot(spotGeneration(), 1));
      }
      if (powerUpType === 4) {
        gameEngine.powerups.push(new TripleShoot(spotGeneration(), 1));
      }
      if (powerUpType === 5) {
        gameEngine.powerups.push(new ExtraMegaBomb(spotGeneration(), 1));
      }
      if (powerUpType === 6) {
        gameEngine.powerups.push(new HealthUp(spotGeneration(), 1));
      }
    }
  } else {
    powerUpGenerationFrame = window.requestAnimationFrame(powerupGeneration);
    return;
  }
  gameEngine.lastPowerUpGenerated = new Date() / 1;
  powerUpGenerationFrame = window.requestAnimationFrame(powerupGeneration);
};
