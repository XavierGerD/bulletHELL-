class Menu {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.titleImg = titleScreen;

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
    // ctx.drawImage(this.titleImg, canvas.width / 2 - 100, 300);

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
      this.pointerSelection--;
      if (this.pointerSelection < 0) {
        this.pointerSelection = this.keys.length - 1;
      }
    }
    if (e.code === "ArrowDown") {
      this.pointerSelection++;
      if (this.pointerSelection > this.keys.length - 1) {
        this.pointerSelection = 0;
      }
    }
  };

  keyDownHandlerMenu = e => {
    this.moveArrows(e);
    if (e.code === "Enter") {
      document.removeEventListener("keydown", this.keyDownHandlerMenu, false);
      let gameStart = () => {
        this.menuItems[this.keys[this.pointerSelection]].launch();
      };
      exitAnim();
      getRandomAnim(gameStart);
    }
  };
}

class Start extends Menu {
  constructor() {
    super();
    this.menuItems = {
      start: {
        value: "PRESS ENTER",
        posX: canvas.width / 2 - 85,
        posY: canvas.height / 2
      }
    };
  }

  draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    this.parallaxees.forEach(paral => {
      ctx.drawImage(paral.image, paral.x, paral.y);
    });
    if (mainTheme.state() === "loaded") {
      this.keys.forEach(key => {
        ctx.font = "30px Racing Sans One";
        ctx.fillStyle = "white";
        ctx.fillText(this.menuItems[key].value, this.menuItems[key].posX, this.menuItems[key].posY);
      });
      ctx.drawImage(this.menuPointer, this.pointerPosX, this.pointerPosY);
    }

    window.requestAnimationFrame(this.draw);
  };

  keyDownHandlerMenu = e => {
    if (e.code === "Enter") {
      if (mainTheme.state() === "loaded") {
        document.removeEventListener("keydown", this.keyDownHandlerMenu, false);
        if (this.pointerSelection === 0) {
          gameEngine = new MainMenu();
          gameEngine.launch();
        }
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
        posY: 455,
        launch() {
          entranceAnim();
          gameEngine = new LevelSelector();
          gameEngine.launch();
        }
      },
      leaderboards: {
        value: "LEADERBOARDS",
        posX: canvas.width / 2 - 100,
        posY: 505,
        launch: undefined
      },
      custom: {
        value: "LEVEL EDITOR",
        posX: canvas.width / 2 - 87,
        posY: 555,
        launch() {
          gameEngine = new MapEditor();
          gameEngine.editorLoop();
        }
      }
    };
    this.keys = Object.keys(this.menuItems);
    this.mainTheme = mainTheme;
    this.isStarted = false;
    this.titleY = 300;
  }

  draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    this.parallaxees.forEach(paral => {
      ctx.drawImage(paral.image, paral.x, paral.y);
    });

    this.keys.forEach(key => {
      ctx.font = "30px Racing Sans One";
      ctx.fillStyle = "white";
      ctx.fillText(this.menuItems[key].value, this.menuItems[key].posX, this.menuItems[key].posY);
    });
    ctx.drawImage(this.menuPointer, this.pointerPosX, this.pointerPosY);
    window.requestAnimationFrame(this.draw);
  };

  moveTitle = () => {
    if (this.titleY < 300) {
      this.titleY += 2.2;
    }
    if (this.titleY >= 200) {
      this.menuItems.campaign.posX += 5;
      this.menuItems.leaderboards.posX -= 5.6;
      this.menuItems.custom.posX += 5.5;
    }
    if (this.menuItems.campaign.posX >= canvas.width / 2 - 75) {
      introAnim = true;
      window.cancelAnimationFrame(this.moveTitle);
      // window.removeEventListener("keydown", this.skipAnim, false);
      this.launch();
      return;
    }
    window.requestAnimationFrame(this.moveTitle);
  };

  // skipAnim = e => {
  //   if (this.titleY > -140) {
  //     if (e.code === "Enter") {
  //       this.menuItems = {
  //         campaign: {
  //           value: "NEW GAME",
  //           posX: canvas.width / 2 - 75,
  //           posY: 455
  //         },
  //         leaderboards: {
  //           value: "LEADERBOARDS",
  //           posX: canvas.width / 2 - 100,
  //           posY: 505
  //         },
  //         custom: {
  //           value: "LEVEL EDITOR",
  //           posX: canvas.width / 2 - 87,
  //           posY: 555
  //         }
  //       };
  //       this.titleY = 300;
  //       introAnim = true;
  //       this.launch();
  //       window.removeEventListener("keydown", this.skipAnim, false);
  //     }
  //   }
  // };

  launch = () => {
    if (!introAnim) {
      this.menuItems = {
        campaign: {
          value: "NEW GAME",
          posX: -150,
          posY: 455,
          launch() {
            entranceAnim();
            gameEngine = new LevelSelector();
            gameEngine.launch();
          },
          geometry
        },
        leaderboards: {
          value: "LEADERBOARDS",
          posX: canvas.width,
          posY: 505,
          launch: undefined,
          geometry
        },
        custom: {
          value: "LEVEL EDITOR",
          posX: -185,
          posY: 555,
          launch() {
            gameEngine = new MapEditor();
            gameEngine.editorLoop();
          },
          geometry
        }
      };
      this.titleY = -230;
      this.moveTitle();
      this.draw();
      animateTitle();
      // this.generate3D(menuItem);
      // window.addEventListener("keydown", this.skipAnim, false);
      mainTheme.play();
    } else {
      this.pointerPosition();
      document.addEventListener("keydown", this.keyDownHandlerMenu, false);
      this.draw();
    }
  };

  generate3D = (item, text) => {
    if (!params) {
      return;
    }
    let instance = new THREE.TextGeometry(text, params);
    instance.translate(-3.8, 0.25, -0.25);
    item = new THREE.Mesh(blaster, material);
    scene.add(item);
  };
}

class LevelSelector extends Menu {
  constructor() {
    super();
    this.menuItems = {
      campaign: {
        value: "CAMPAIGN",
        posX: canvas.width / 2 - 75,
        posY: 455,
        launch() {
          mainTheme.fade(1, 0, 300);
          gameEngine = new GameEngine();
          gameEngine.initalizeMap();
          gameEngine.gameLoop();
        }
      },
      continue: {
        value: "CONTINUE",
        posX: canvas.width / 2 - 70,
        posY: 505,
        launch() {
          mainTheme.fade(1, 0, 300);
          gameEngine = new GameEngine();
          gameEngine.initalizeMap();
          gameEngine.gameLoop();
        }
      },
      custom: {
        value: "CUSTOM MAP",
        posX: canvas.width / 2 - 92,
        posY: 555,
        launch() {
          mainTheme.fade(1, 0, 300);
          gameEngine = new GameEngine();
          gameEngine.initalizeCustomMap(0);
          gameEngine.gameLoop();
        }
      },
      options: {
        value: "OPTIONS",
        posX: canvas.width / 2 - 65,
        posY: 605,
        launch() {
          gameEngine = new OptionsMenu(false);
          gameEngine.launch();
        }
      },
      main: {
        value: "MAIN MENU",
        posX: canvas.width / 2 - 80,
        posY: 655,
        launch() {
          entranceAnim();
          gameEngine = new MainMenu();
          gameEngine.launch();
        }
      }
    };
    this.keys = Object.keys(this.menuItems);
    // this.mainTheme = mainTheme;
  }
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
      document.removeEventListener("keydown", this.keyDownHandlerMenu, false);
      if (this.pointerSelection === 0) {
        gameEngine.unpause();
        return;
      }
      let gameStart = () => {
        if (this.pointerSelection === 1) {
          flyingDragon.stop();
          gameEngine = new GameEngine();
          gameEngine.initalizeMap();
          gameEngine.gameLoop();
        }
        if (this.pointerSelection === 2) {
          gameEngine.options = new OptionsMenu();
          gameEngine.options.launch();
        }
        if (this.pointerSelection === 3) {
          flyingDragon.stop();
          entranceAnim();
          gameEngine = new MainMenu();
          gameEngine.launch();
        }
      };
      exitAnim();
      getRandomAnim(gameStart);
    }
  };
}

class OptionsMenu extends Menu {
  constructor() {
    super();
    this.newKey = "";
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
    this.destroyed = false;
  }

  returnTo = () => {
    if (gameEngine instanceof GameEngine) {
      this.menuItems.return.value = "RESUME";
    } else {
      this.menuItems.return.value = "MAIN MENU";
    }
  };

  draw = () => {
    if (!this.destroyed) {
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
    }
  };

  returnNewKeyCode = e => {
    keyMapping[this.newKey] = e.code;
    this.menuItems[this.newKey].value = this.newKey.toUpperCase() + ": " + keyMapping[this.newKey];
    document.removeEventListener("keydown", this.returnNewKeyCode, false);
    document.addEventListener("keydown", this.keyDownHandlerMenu, false);
    this.newKey = "";
  };

  resetListeners = () => {
    document.addEventListener("keydown", this.returnNewKeyCode, false);
    document.removeEventListener("keydown", this.keyDownHandlerMenu, false);
  };

  keyDownHandlerMenu = e => {
    this.moveArrows(e);
    if (e.code === "Enter") {
      if (this.pointerSelection === 0) {
        this.newKey = "up";
        this.resetListeners();
      }
      if (this.pointerSelection === 1) {
        this.newKey = "down";
        this.resetListeners();
      }

      if (this.pointerSelection === 2) {
        this.newKey = "left";
        this.resetListeners();
      }

      if (this.pointerSelection === 3) {
        this.newKey = "right";
        this.resetListeners();
      }

      if (this.pointerSelection === 4) {
        this.newKey = "shoot";
        this.resetListeners();
      }
      if (this.pointerSelection === 5) {
        this.newKey = "bomb";
        this.resetListeners();
      }
      if (this.pointerSelection === 6) {
        this.newKey = "pause";
        this.resetListeners();
      }
      if (this.pointerSelection === 7) {
        document.removeEventListener("keydown", this.keyDownHandlerMenu, false);
        let gameStart = () => {
          if (gameEngine instanceof GameEngine) {
            entranceAnim();
            window.cancelAnimationFrame(gameEngine.options.draw);
            this.destroyed = true;
            delete gameEngine.options;
            gameEngine.pauseMenu.launch();
          } else {
            entranceAnim();
            gameEngine = new MainMenu();
            gameEngine.launch();
          }
        };
        getRandomAnim(gameStart);
      }
    }
  };
}
