class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 20;
    this.speed = PLAYER_SPEED;
    this.image = playerImage01;
  }
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - this.speed;
    }
  }
  moveRight() {
    if (this.x + PLAYER_WIDTH < canvas.width) {
      this.x = this.x + this.speed;
    }
  }
  moveUp() {
    if (this.y > 0) {
      this.y = this.y - this.speed;
    }
  }
  moveDown() {
    if (this.y + PLAYER_HEIGHT < canvas.height) {
      this.y = this.y + this.speed;
    }
  }
  shoot() {
    playerBullets.push(new playerBullet(this.x, this.y, 0, 1));
  }
}
