let garbageCollection = () => {
  enemyBullets.forEach((bullet, i) => {
    if (bullet.x < 0 || bullet.x > GAME_WIDTH || bullet.y < 0 || bullet.y > GAME_HEIGHT) {
      enemyBullets.splice(i, 1);
    }
  });
  enemies.forEach((enemy, i) => {
    if (enemy.exploded) {
      enemies.splice(i, 1);
    }
  });
  playerBullets.forEach((bullet, i) => {
    if (bullet.y < 0) {
      playerBullets.splice(i, 1);
    }
  });
};
