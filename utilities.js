let setFlashCounter = () => {
  gameEngine.globalFlashCounter = 1;
  flashCounterDecrease();
};

let flashCounterDecrease = () => {
  if (gameEngine.globalFlashCounter > 0) {
    gameEngine.globalFlashCounter -= 0.005;
    setTimeout(flashCounterDecrease, 10);
  }
};

let playAreaFlash = () => {
  ctx.fillStyle = "rgba(255, 255, 255," + gameEngine.globalFlashCounter + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

class Parallax {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
  }
}

let garbageCollection = () => {
  gameEngine.enemyBullets.forEach((bullet, i) => {
    if (bullet.x < 0 || bullet.x > GAME_WIDTH || bullet.y < 0 || bullet.y > GAME_HEIGHT) {
      gameEngine.enemyBullets.splice(i, 1);
    }
  });
  gameEngine.enemies.forEach((enemy, i) => {
    if (enemy.exploded) {
      gameEngine.enemies.splice(i, 1);
    }
  });
  gameEngine.playerBullets.forEach((bullet, i) => {
    if (bullet.y < 0) {
      gameEngine.playerBullets.splice(i, 1);
    }
  });
  gameEngine.enemies.forEach((enemy, i) => {
    if (enemy.y > canvas.height) {
      gameEngine.enemies.splice(i, 1);
    }
  });
};

class SwipeAnim {
  constructor(elementHeight, speed, func) {
    this.elementHeight = elementHeight;
    this.x = 0;
    this.y = -this.elementHeight;
    this.clearX = canvas.width;
    this.clearY = this.y + this.elementHeight / 2;
    this.speed = speed;
    this.img = swipeAnimImg;
    this.animDone = false;
    this.nextFunc = func;
  }

  makeAnim = () => {
    ctx.clearRect(0, 0, this.clearX, this.clearY);
    ctx.drawImage(background, 0, 0, this.clearX, this.clearY, 0, 0, canvas.width, this.clearY);
    ctx.drawImage(parallax1, 0, 0, this.clearX, this.clearY, 0, 0, canvas.width, this.clearY);
    ctx.drawImage(parallax2, 0, 0, this.clearX, this.clearY, 0, 0, canvas.width, this.clearY);
    ctx.drawImage(parallax3, 0, 0, this.clearX, this.clearY, 0, 0, canvas.width, this.clearY);
    ctx.drawImage(this.img, this.x, this.y);
    this.y = this.y + this.speed;
    this.clearY = this.y + this.elementHeight / 2;
    if (this.y < canvas.height) {
      window.requestAnimationFrame(this.makeAnim);
    }
    if (this.y >= canvas.height) {
      this.nextFunc();
    }
  };
}

class SplitAnim {
  constructor(elementHeight, speed, func) {
    this.elementHeight = elementHeight;
    this.topX = canvas.width;
    this.topY = canvas.height / 2 - elementHeight;
    this.botX = -300;
    this.botY = canvas.height / 2;
    this.clearYTop = canvas.height / 2 - 1;
    this.clearYBot = canvas.height / 2;
    this.speed = speed;
    this.img1 = splitAnimTop;
    this.img2 = splitAnimBot;
    this.animDone = false;
    this.nextFunc = func;
    this.phase = 1;
    this.animstart;
    this.waitTime = 100;
    this.lastPhase;
  }

  makeAnim = () => {
    if (this.phase === 1) {
      ctx.drawImage(this.img1, this.topX, this.topY);
      ctx.drawImage(this.img2, this.botX, this.botY);
      this.topX = this.topX - this.speed;
      this.botX = this.botX + this.speed;
      if (this.topX > 0) {
        window.requestAnimationFrame(this.makeAnim);
      }
      if (this.topX === 0) {
        this.phase = 2;
        this.lastPhase = new Date() / 1;
      }
    }
    if (this.phase === 2) {
      let now = new Date() / 1;
      ctx.drawImage(this.img1, this.topX, this.topY);
      ctx.drawImage(this.img2, this.botX, this.botY);
      if (now - this.lastPhase > this.waitTime) {
        this.phase = 3;
      } else {
        window.requestAnimationFrame(this.makeAnim);
      }
    }
    if (this.phase === 3) {
      ctx.clearRect(0, this.clearYTop, canvas.width, this.clearYBot - this.clearYTop);
      ctx.drawImage(
        background,
        0,
        this.clearYTop,
        canvas.width,
        this.clearYBot - this.clearYTop,
        0,
        this.clearYTop,
        canvas.width,
        this.clearYBot - this.clearYTop
      );
      ctx.drawImage(
        parallax1,
        0,
        this.clearYTop,
        canvas.width,
        this.clearYBot - this.clearYTop,
        0,
        this.clearYTop,
        canvas.width,
        this.clearYBot - this.clearYTop
      );
      ctx.drawImage(
        parallax2,
        0,
        this.clearYTop,
        canvas.width,
        this.clearYBot - this.clearYTop,
        0,
        this.clearYTop,
        canvas.width,
        this.clearYBot - this.clearYTop
      );
      ctx.drawImage(
        parallax3,
        0,
        this.clearYTop,
        canvas.width,
        this.clearYBot - this.clearYTop,
        0,
        this.clearYTop,
        canvas.width,
        this.clearYBot - this.clearYTop
      );
      ctx.drawImage(this.img1, this.topX, this.topY);
      ctx.drawImage(this.img2, this.botX, this.botY);
      this.topY = this.topY - this.speed;
      this.botY = this.botY + this.speed;
      this.clearYTop = this.topY + this.elementHeight;
      this.clearYBot = this.botY;
      if (this.topY > 0) {
        window.requestAnimationFrame(this.makeAnim);
      }
      if (this.topY < 0) {
        this.nextFunc();
      }
    }
  };
}

class CutAnim {
  constructor(elementHeight, speed, func) {
    this.elementHeight = elementHeight;
    this.x = canvas.width / 2 - 10;
    this.y = -this.elementHeight;
    this.rightX = canvas.width / 2;
    this.leftX = canvas.width / 2;
    this.clearX = canvas.width / 2;
    this.clearY = canvas.height;
    this.speed = speed;
    this.img = cutAnimImg;
    this.animDone = false;
    this.nextFunc = func;
    this.phase = 1;
    this.animstart;
    this.waitTime = 500;
    this.lastPhase;
  }

  makeAnim = () => {
    if (this.phase === 1) {
      ctx.drawImage(this.img, this.x, this.y);
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "white";
      ctx.moveTo(canvas.width / 2, -1);
      ctx.lineTo(this.x + 10, this.y + 40);
      ctx.stroke();
      this.y = this.y + this.speed;
      if (this.y < canvas.height + this.elementHeight) {
        window.requestAnimationFrame(this.makeAnim);
      }
      if (this.y >= canvas.height + this.elementHeight) {
        this.phase = 2;
        this.lastPhase = new Date() / 1;
      }
    }
    if (this.phase === 2) {
      let now = new Date() / 1;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "white";
      ctx.moveTo(canvas.width / 2, -1);
      ctx.lineTo(this.x + 10, this.y);
      ctx.stroke();
      if (now - this.lastPhase > this.waitTime) {
        this.phase = 3;
      } else {
        window.requestAnimationFrame(this.makeAnim);
      }
    }
    if (this.phase === 3) {
      ctx.clearRect(this.leftX, 0, this.rightX - this.leftX, canvas.height);
      ctx.drawImage(
        background,
        this.leftX,
        0,
        this.rightX - this.leftX,
        canvas.height,
        this.leftX,
        0,
        this.rightX - this.leftX,
        canvas.height
      );
      ctx.drawImage(
        parallax1,
        this.leftX,
        0,
        this.rightX - this.leftX,
        canvas.height,
        this.leftX,
        0,
        this.rightX - this.leftX,
        canvas.height
      );
      ctx.drawImage(
        parallax2,
        this.leftX,
        0,
        this.rightX - this.leftX,
        canvas.height,
        this.leftX,
        0,
        this.rightX - this.leftX,
        canvas.height
      );
      ctx.drawImage(
        parallax3,
        this.leftX,
        0,
        this.rightX - this.leftX,
        canvas.height,
        this.leftX,
        0,
        this.rightX - this.leftX,
        canvas.height
      );
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "white";
      ctx.moveTo(this.leftX, -1);
      ctx.lineTo(this.leftX, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "white";
      ctx.moveTo(this.rightX, -1);
      ctx.lineTo(this.rightX, canvas.height);
      ctx.stroke();
      this.leftX = this.leftX - this.speed / 2;
      this.rightX = this.rightX + this.speed / 2;
      if (this.rightX < canvas.width) {
        window.requestAnimationFrame(this.makeAnim);
      }
      if (this.rightX >= canvas.width) {
        this.nextFunc();
      }
    }
  };
}

let wait = (lastEvent, waitTime, executable) => {
  let now = new Date() / 1;
  if (now - lastEvent > waitTime) {
    executable();
  }
  lastEvent = new Date() / 1;
  return lastEvent;
};
