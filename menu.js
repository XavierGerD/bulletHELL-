class Menu {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.titleImg = titleScreen;
    this.newGame = newGame;
    this.background = background;
    this.menuPointer = menuPointer;
    this.leaderboard = leaderboard;
    this.parallaxees = [new Parallax(0, 0, parallax1), new Parallax(0, 0, parallax2), new Parallax(0, 0, parallax3)];
    this.pointerPosY = 432;
    this.pointerPosX = canvas.width / 2 - 100;
    this.menuPointer = menuPointer;
  }

  draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.background, 0, 0);
    this.parallaxees.forEach(paral => {
      ctx.drawImage(paral.image, paral.x, paral.y);
    });
    ctx.drawImage(this.titleImg, canvas.width / 2 - 100, 300);
    ctx.drawImage(this.newGame, canvas.width / 2 - 100, 430);
    ctx.drawImage(this.leaderboard, canvas.width / 2 - 100, 480);
    ctx.drawImage(this.menuPointer, this.pointerPosX, this.pointerPosY);
    window.requestAnimationFrame(this.draw);
  };

  launch = () => {
    document.addEventListener("keydown", keyDownHandlerMenu, false);
    window.requestAnimationFrame(this.draw);
  };
}

let keyDownHandlerMenu = e => {
  let xPos1 = canvas.width / 2 - 100;
  let yPos1 = 432;
  let xPos2 = canvas.width / 2 - 125;
  let yPos2 = 482;
  if (e.code === "ArrowUp") {
    gameEngine.pointerPosX = xPos1;
    gameEngine.pointerPosY = yPos1;
  }
  if (e.code === "ArrowDown") {
    gameEngine.pointerPosX = xPos2;
    gameEngine.pointerPosY = yPos2;
  }
  if (e.code === "Enter") {
    if (gameEngine.pointerPosY === yPos1) {
      let gameStart = () => {
        document.removeEventListener("keydown", keyDownHandlerMenu, false);
        gameEngine = new GameEngine();
        gameEngine.gameLoop();
      };
      let randomAnim = Math.floor(Math.random() * 2 + 1);
      if (randomAnim === 1) {
        anim = new SwipeAnim(50, 20, gameStart);
      } else if (randomAnim === 2) {
        anim = new SplitAnim(15, 10, gameStart);
      }
      anim.makeAnim();
    }
  }
};
