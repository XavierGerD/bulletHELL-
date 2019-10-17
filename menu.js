class Menu {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.titleImg = titleScreen;
    this.background = background;
    this.menuPointer = menuPointer;
    this.parallaxees = [new Parallax(0, 0, parallax1), new Parallax(0, 0, parallax2), new Parallax(0, 0, parallax3)];
    this.pointerPosY = 432;
    this.pointerPosX = canvas.width / 2 - 100;
    this.menuPointer = menuPointer;
    this.pointerSelection = 1;
  }

  draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.background, 0, 0);
    this.parallaxees.forEach(paral => {
      ctx.drawImage(paral.image, paral.x, paral.y);
    });
    ctx.drawImage(this.titleImg, canvas.width / 2 - 100, 300);

    ctx.font = "30px Racing Sans One";
    ctx.fillStyle = "white";
    ctx.fillText("NEW GAME", canvas.width / 2 - 75, 454);
    ctx.font = "30px Racing Sans One";
    ctx.fillStyle = "white";
    ctx.fillText("LEADERBOARD", canvas.width / 2 - 100, 505);
    ctx.font = "30px Racing Sans One";
    ctx.fillStyle = "white";
    ctx.fillText("LEVEL EDITOR", canvas.width / 2 - 95, 555);
    ctx.drawImage(this.menuPointer, this.pointerPosX, this.pointerPosY);
    window.requestAnimationFrame(this.draw);
  };

  pointerPosition = () => {
    if (this.pointerSelection === 1) {
      this.pointerPosY = 432;
      this.pointerPosX = canvas.width / 2 - 100;
    }
    if (this.pointerSelection === 2) {
      this.pointerPosY = 482;
      this.pointerPosX = canvas.width / 2 - 125;
    }
    if (this.pointerSelection === 3) {
      this.pointerPosY = 532;
      this.pointerPosX = canvas.width / 2 - 118;
    }
    window.requestAnimationFrame(this.pointerPosition);
  };

  launch = () => {
    this.pointerPosition();
    document.addEventListener("keydown", keyDownHandlerMenu, false);
    window.requestAnimationFrame(this.draw);
  };
}

let keyDownHandlerMenu = e => {
  if (e.code === "ArrowUp") {
    if (gameEngine.pointerSelection > 1) {
      gameEngine.pointerSelection--;
    }
  }
  if (e.code === "ArrowDown") {
    if (gameEngine.pointerSelection < 3) {
      gameEngine.pointerSelection++;
    }
  }
  if (e.code === "Enter") {
    if (gameEngine.pointerSelection === 1) {
      let gameStart = () => {
        document.removeEventListener("keydown", keyDownHandlerMenu, false);
        gameEngine = new GameEngine();
        gameEngine.gameLoop();
      };

      let randomAnim = Math.floor(Math.random() * 3 + 1);
      if (randomAnim === 1) {
        anim = new SwipeAnim(50, 20, gameStart);
      } else if (randomAnim === 2) {
        anim = new SplitAnim(15, 10, gameStart);
      } else if (randomAnim === 3) {
        anim = new CutAnim(40, 40, gameStart);
      }
      anim.makeAnim();
    }

    if (gameEngine.pointerSelection === 3) {
      let gameStart = () => {
        document.removeEventListener("keydown", keyDownHandlerMenu, false);
        gameEngine = new MapEditor();
        gameEngine.editorLoop();
      };

      let randomAnim = Math.floor(Math.random() * 3 + 1);
      if (randomAnim === 1) {
        anim = new SwipeAnim(50, 20, gameStart);
      } else if (randomAnim === 2) {
        anim = new SplitAnim(15, 10, gameStart);
      } else if (randomAnim === 3) {
        anim = new CutAnim(40, 40, gameStart);
      }
      anim.makeAnim();
    }
  }
};
