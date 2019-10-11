let spotGeneration = () => {
  let spots = GAME_WIDTH / ENEMY1_WIDTH;
  let nextShip = Math.floor(Math.random() * spots);
  if (allEnemies.length < MAX_ENEMIES) {
    return nextShip * ENEMY1_WIDTH;
  }
};

let enemyGeneration = () => {
  let enemyType = Math.floor(Math.random() * enemyTypeModifier + 1);
  if (enemyType === 1) {
    enemies.push(new EnemyT1(spotGeneration(), canvas.height / 2, 1));
  }
  if (enemyType === 2) {
    enemies.push(new EnemyT2(spotGeneration(), canvas.height / 2, 1));
  }
};
