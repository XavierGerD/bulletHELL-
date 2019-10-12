let spotGeneration = () => {
  let spots = GAME_WIDTH / ENEMY1_WIDTH;
  let nextShip = Math.floor(Math.random() * spots);
  if (enemies.length < MAX_ENEMIES) {
    return nextShip * ENEMY1_WIDTH;
  }
};

let enemyGeneration = () => {
  let enemyType = Math.floor(Math.random() * enemyTypeModifier + 1);
  if (enemyType === 1) {
    enemies.push(new EnemyT1(spotGeneration(), 1));
  }
  if (enemyType === 2) {
    enemies.push(new EnemyT2(spotGeneration(), 1));
  }
};

let powerupGeneration = () => {
  let powerUpType = Math.floor(Math.random() * powerUpTypeModifier + 1);
  if (powerUpType === 1) {
    powerups.push(new DoubleShoot(spotGeneration(), 1));
  }
  if (powerUpType === 2) {
    powerups.push(new TripleShoot(spotGeneration(), 1));
  }
  if (powerUpType === 3) {
    powerups.push(new IncreaseDamage(spotGeneration(), 1));
  }
  if (powerUpType === 4) {
    powerups.push(new ExtraMegaBomb(spotGeneration(), 1));
  }
  if (powerUpType === 5) {
    powerups.push(new IncreaseRoF(spotGeneration(), 1));
  }
};
