class Menu {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.titleImg = titleScreen;
    this.background = background;
    this.menuPointer = menuPointer;
    this.parallaxees = [new Parallax(0, 0, parallax1), new Parallax(0, 0, parallax2), new Parallax(0, 0, parallax3)];
    this.pointerPosX = canvas.width / 2 - 100;
    this.menuPointer = menuPointer;
    this.pointerSelection = 0;
  }

  draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    this.parallaxees.forEach(paral => {
      ctx.drawImage(paral.image, paral.x, paral.y);
    });
    ctx.drawImage(this.titleImg, canvas.width / 2 - 100, 300);

    this.keys.forEach(key => {
      ctx.font = "30px Racing Sans One";
      ctx.fillStyle = "white";
      ctx.fillText(this.menuItems[key].value, this.menuItems[key].posX, this.menuItems[key].posY);
    });
    ctx.drawImage(this.menuPointer, this.pointerPosX, this.pointerPosY);
    window.requestAnimationFrame(this.draw);
  };

  pointerPosition = () => {
    this.keys = Object.keys(this.menuItems);
    this.pointerPosX = this.menuItems[this.keys[this.pointerSelection]].posX - 25;
    this.pointerPosY = this.menuItems[this.keys[this.pointerSelection]].posY - 25;
    window.requestAnimationFrame(this.pointerPosition);
  };

  launch = () => {
    this.pointerPosition();
    document.addEventListener("keydown", this.keyDownHandlerMenu, false);
    this.draw();
  };

  moveArrows = e => {
    if (e.code === "ArrowUp") {
      if (this.pointerSelection > 0) {
        this.pointerSelection--;
      }
    }
    if (e.code === "ArrowDown") {
      if (this.pointerSelection < this.keys.length - 1) {
        this.pointerSelection++;
      }
    }
  };
}

class MainMenu extends Menu {
  constructor() {
    super();
    this.menuItems = {
      campaign: {
        value: "NEW GAME",
        posX: canvas.width / 2 - 75,
        posY: 455
      },
      continue: {
        value: "LEADERBOARDS",
        posX: canvas.width / 2 - 100,
        posY: 505
      },
      custom: {
        value: "LEVEL EDITOR",
        posX: canvas.width / 2 - 87,
        posY: 555
      }
      // ,
      // options: {
      //   value: "OPTIONS",
      //   posX: canvas.width / 2 - 65,
      //   posY: 605
      // }
      // ,
      // main: {
      //   value: "MAIN MENU",
      //   posX: canvas.width / 2 - 80,
      //   posY: 655
      // }
    };
    this.keys = Object.keys(this.menuItems);
  }

  keyDownHandlerMenu = e => {
    this.moveArrows(e);
    if (e.code === "Enter") {
      let gameStart = () => {
        document.removeEventListener("keydown", this.keyDownHandlerMenu, false);
        if (this.pointerSelection === 0) {
          gameEngine = new LevelSelector();
          gameEngine.launch();
        }
        if (this.pointerSelection === 2) {
          gameEngine = new MapEditor();
          gameEngine.editorLoop();
        }
      };
      getRandomAnim(gameStart);
    }
  };
}

class LevelSelector extends Menu {
  constructor() {
    super();
    this.menuItems = {
      campaign: {
        value: "CAMPAIGN",
        posX: canvas.width / 2 - 75,
        posY: 455
      },
      continue: {
        value: "CONTINUE",
        posX: canvas.width / 2 - 70,
        posY: 505
      },
      custom: {
        value: "CUSTOM MAP",
        posX: canvas.width / 2 - 92,
        posY: 555
      },
      options: {
        value: "OPTIONS",
        posX: canvas.width / 2 - 65,
        posY: 605
      },
      main: {
        value: "MAIN MENU",
        posX: canvas.width / 2 - 80,
        posY: 655
      }
    };
    this.keys = Object.keys(this.menuItems);
  }

  keyDownHandlerMenu = e => {
    this.moveArrows(e);
    if (e.code === "Enter") {
      let gameStart = () => {
        document.removeEventListener("keydown", this.keyDownHandlerMenu, false);
        if (this.pointerSelection === 0) {
          gameEngine = new GameEngine();
          gameEngine.initalizeMap();
          gameEngine.gameLoop();
        }
        if (this.pointerSelection === 1) {
          gameEngine = new GameEngine();
          gameEngine.initalizeMap();
          gameEngine.gameLoop();
        }
        if (this.pointerSelection === 2) {
          gameEngine = new GameEngine();
          gameEngine.initalizeCustomMap(0);
          gameEngine.gameLoop();
        }
        if (gameEngine.pointerSelection === 3) {
          gameEngine = new OptionsMenu(false);
          gameEngine.launch();
        }
        if (gameEngine.pointerSelection === 4) {
          gameEngine = new MainMenu();
          gameEngine.launch();
        }
      };
      getRandomAnim(gameStart);
    }
  };
}

class PauseMenu extends Menu {
  constructor() {
    super();
    this.menuItems = {
      resume: {
        value: "RESUME",
        posX: canvas.width / 2 - 55,
        posY: 455
      },
      restart: {
        value: "RESTART LEVEL",
        posX: canvas.width / 2 - 90,
        posY: 505
      },
      options: {
        value: "OPTIONS",
        posX: canvas.width / 2 - 65,
        posY: 555
      },
      main: {
        value: "MAIN MENU",
        posX: canvas.width / 2 - 80,
        posY: 605
      }
    };
    this.keys = Object.keys(this.menuItems);
  }

  draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.titleImg, canvas.width / 2 - 100, 200);

    this.keys.forEach(key => {
      ctx.font = "30px Racing Sans One";
      ctx.fillStyle = "white";
      ctx.fillText(this.menuItems[key].value, this.menuItems[key].posX, this.menuItems[key].posY);
    });

    ctx.drawImage(this.menuPointer, this.pointerPosX, this.pointerPosY);
    window.requestAnimationFrame(this.draw);
  };

  keyDownHandlerMenu = e => {
    this.moveArrows(e);
    if (e.code === "Enter") {
      let gameStart = () => {
        document.removeEventListener("keydown", this.keyDownHandlerMenu, false);
        if (this.pointerSelection === 0) {
          gameEngine.unpause();
          gameEngine.isPaused = false;
          window.cancelAnimationFrame(gameEngine.gamePausedScreen);
        }
        if (this.pointerSelection === 1) {
          gameEngine = new GameEngine();
          gameEngine.initalizeMap();
          gameEngine.gameLoop();
        }
        if (this.pointerSelection === 2) {
          gameEngine.options = new OptionsMenu(true);
          gameEngine.options.launch();
        }
        if (this.pointerSelection === 3) {
          gameEngine = new MainMenu();
          gameEngine.launch();
        }
      };
      getRandomAnim(gameStart);
    }
  };
}

class OptionsMenu extends Menu {
  constructor(game) {
    super(game);
    this.isComingFromGame = game;
    this.menuItems = {
      up: {
        value: "UP: " + keyMapping.up,
        posX: 40,
        posY: 55
      },
      down: {
        value: "DOWN: " + keyMapping.down,
        posX: 40,
        posY: 105
      },
      left: {
        value: "LEFT: " + keyMapping.left,
        posX: 40,
        posY: 155
      },
      right: {
        value: "RIGHT: " + keyMapping.right,
        posX: 40,
        posY: 205
      },
      shoot: {
        value: "SHOOT: " + keyMapping.shoot,
        posX: 40,
        posY: 255
      },
      bomb: {
        value: "MEGABOMB: " + keyMapping.bomb,
        posX: 40,
        posY: 305
      },
      pause: {
        value: "PAUSE: " + keyMapping.pause,
        posX: 40,
        posY: 355
      },
      return: {
        value: "",
        posX: 40,
        posY: canvas.height - 40
      }
    };
    this.keys = Object.keys(this.menuItems);
  }

  returnTo = () => {
    if (this.isComingFromGame) {
      this.menuItems.return.value = "RESUME";
    } else {
      this.menuItems.return.value = "MAIN MENU";
    }
  };

  draw = () => {
    this.returnTo();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    this.parallaxees.forEach(paral => {
      ctx.drawImage(paral.image, paral.x, paral.y);
    });
    this.keys.forEach(key => {
      ctx.font = "25px Racing Sans One";
      ctx.fillStyle = "white";
      ctx.fillText(this.menuItems[key].value, this.menuItems[key].posX, this.menuItems[key].posY);
    });
    ctx.fillText(this.menuItems.return.value, this.menuItems.return.posX, this.menuItems.return.posY);
    ctx.drawImage(this.menuPointer, this.pointerPosX, this.pointerPosY);
    window.requestAnimationFrame(this.draw);
  };

  returnNewKeyCode = e => {
    keyMapping.up = e;
    document.removeEventListener("keydown", this.returnNewKeyCode, false);
  };

  keyDownHandlerMenu = e => {
    this.moveArrows(e);
    if (e.code === "Enter") {
      if (this.pointerSelection === 0) {
      }
      document.addEventListener("keydown", this.returnNewKeyCode, false);
      document.removeEventListener("keydown", this.keyDownHandlerMenu, false);

      if (this.pointerSelection === 1) {
      }
      keyMapping.down = this.returnNewKeyCode();
      if (this.pointerSelection === 2) {
      }
      keyMapping.left = this.returnNewKeyCode();
      if (this.pointerSelection === 3) {
      }
      keyMapping.right = this.returnNewKeyCode();
      if (this.pointerSelection === 4) {
      }
      if (this.pointerSelection === 5) {
      }
      if (this.pointerSelection === 6) {
      }
    }
  };
}
