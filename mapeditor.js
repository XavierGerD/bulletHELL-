class MapEditor {
  constructor() {
    this.numOfRows = 50;
    this.rowWidth = 8;
    this.grid = [];
    this.levelExport = [];
    this.currentEnemyType = "";
    this.parallaxees = [new Parallax(0, 0, parallax1), new Parallax(0, 0, parallax2), new Parallax(0, 0, parallax3)];
    this.bottomOffset = 240;
    this.hoveredElement = "";
    this.selectors = [
      {
        type: "EnemyT1",
        x: 30,
        y: 760,
        img: enemyImage01
      },
      {
        type: "EnemyT2",
        x: 60,
        y: 760,
        img: enemyImage02
      },
      {
        type: "EnemyT3",
        x: 90,
        y: 760,
        img: enemyImage03
      }
    ];

    this.rowManagement = [
      {
        type: "add",
        x: 30,
        y: 670,
        img: addRowsImg
      },
      {
        type: "remove",
        x: 30,
        y: 700,
        img: removeRowsImg
      }
    ];
  }

  draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0);

    this.parallaxees.forEach(paral => {
      ctx.drawImage(paral.image, paral.x, paral.y);
    });

    //draw the grid
    this.grid.forEach(arr => {
      arr.forEach(elem => {
        if (elem.y <= canvas.height - this.bottomOffset) {
          ctx.beginPath();
          ctx.strokeStyle = "white";
          ctx.rect(elem.x, elem.y, ENEMY1_WIDTH, ENEMY1_HEIGHT);
          ctx.stroke();
        }
      });
    });

    //draw enemies placed in the grid
    this.grid.forEach(arr => {
      arr.forEach(elem => {
        if (elem.y <= canvas.height - this.bottomOffset) {
          if (elem.value === "EnemyT1") {
            ctx.drawImage(enemyImage01, elem.x, elem.y);
          }
          if (elem.value === "EnemyT2") {
            ctx.drawImage(enemyImage02, elem.x, elem.y);
          }
          if (elem.value === "EnemyT3") {
            ctx.drawImage(enemyImage03, elem.x, elem.y);
          }
        }
      });
    });
    ctx.globalAlpha = 0.5;
    //draw the hover
    if (this.hoveredElement !== "") {
      ctx.drawImage(this.hoveredElement.image, this.hoveredElement.x, this.hoveredElement.y);
    }
    ctx.globalAlpha = 1;

    //draw the selectors
    this.selectors.forEach(obj => {
      ctx.drawImage(obj.img, obj.x, obj.y);
    });

    //draw the row management icons
    this.rowManagement.forEach(obj => {
      ctx.drawImage(obj.img, obj.x, obj.y);
    });

    //draw a square over the selector
    this.selectors.forEach(obj => {
      if (obj.type === this.currentEnemyType) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.rect(obj.x, obj.y, ENEMY1_WIDTH, ENEMY1_HEIGHT);
        ctx.stroke();
      }
    });

    //draw save and exit
    ctx.font = "30px Racing Sans One";
    ctx.fillStyle = "white";
    ctx.fillText("SAVE", 220, 755);
    ctx.font = "30px Racing Sans One";
    ctx.fillStyle = "white";
    ctx.fillText("EXIT", 220, 785);

    window.requestAnimationFrame(this.draw);
  };

  generateRows = () => {
    for (let i = 0; i < this.numOfRows; i++) {
      let row = [];
      for (let j = 0; j < this.rowWidth; j++) {
        row.push(new BoxOfEnemy(ENEMY1_WIDTH * (j + 1), canvas.height - this.bottomOffset - ENEMY1_HEIGHT * i));
      }
      this.grid.push(row);
    }
  };

  addRows = () => {
    let row = [];
    for (let j = 0; j < this.rowWidth; j++) {
      row.push(new BoxOfEnemy(ENEMY1_WIDTH * (j + 1), canvas.height - this.bottomOffset - ENEMY1_HEIGHT * this.numOfRows));
    }
    this.grid.push(row);
    this.numOfRows++;
  };

  removeRows = () => {
    this.grid.pop();
    this.numOfRows--;
  };

  isHovered = event => {
    this.grid.forEach(arr => {
      arr.forEach(elem => {
        if (
          event.offsetX > elem.x &&
          event.offsetX < elem.x + ENEMY1_WIDTH &&
          event.offsetY > elem.y &&
          event.offsetY < elem.y + ENEMY1_HEIGHT
        ) {
          if (elem.value === "") {
            if (this.currentEnemyType === "EnemyT1") {
              this.hoveredElement = { image: enemyImage01, x: elem.x, y: elem.y };
            } else if (this.currentEnemyType === "EnemyT2") {
              this.hoveredElement = { image: enemyImage02, x: elem.x, y: elem.y };
            } else if (this.currentEnemyType === "EnemyT3") {
              this.hoveredElement = { image: enemyImage03, x: elem.x, y: elem.y };
            }
          } else if (elem.value !== "") {
            this.hoveredElement = "";
          }
        }

        if (
          event.offsetX > canvas.width - ENEMY1_WIDTH ||
          event.offsetX < ENEMY1_WIDTH ||
          event.offsetY > canvas.height - this.bottomOffset + ENEMY1_HEIGHT
        ) {
          this.hoveredElement = "";
        }
      });
    });
  };

  isClicked = () => {
    this.grid.forEach(arr => {
      arr.forEach(elem => {
        if (
          event.offsetX > elem.x &&
          event.offsetX < elem.x + ENEMY1_WIDTH &&
          event.offsetY > elem.y &&
          event.offsetY < elem.y + ENEMY1_HEIGHT
        ) {
          if (elem.value !== this.currentEnemyType) {
            elem.value = this.currentEnemyType;
          } else if (elem.value === this.currentEnemyType) {
            elem.value = "";
          }
        }
      });
    });

    this.selectors.forEach(obj => {
      if (event.offsetX > obj.x && event.offsetX < obj.x + ENEMY1_WIDTH && event.offsetY > obj.y && event.offsetY < obj.y + ENEMY1_HEIGHT) {
        this.currentEnemyType = obj.type;
      }
    });

    this.rowManagement.forEach(obj => {
      if (event.offsetX > obj.x && event.offsetX < obj.x + ENEMY1_WIDTH && event.offsetY > obj.y && event.offsetY < obj.y + ENEMY1_HEIGHT) {
        if (obj.type === "add") {
          this.addRows();
        }
        if (obj.type === "remove") {
          this.removeRows();
        }
      }
    });

    if (event.offsetX > 220 && event.offsetX < 285 && event.offsetY > 735 && event.offsetY < 757) {
      this.generateLevel();
    }

    if (event.offsetX > 220 && event.offsetX < 285 && event.offsetY > 765 && event.offsetY < 787) {
      let gameStart = () => {
        canvas.removeEventListener("click", this.isClicked, false);
        document.removeEventListener("keydown", this.isScrolled, false);
        canvas.removeEventListener("mousemove", this.isHovered, false);
        gameEngine = new Menu();
        gameEngine.launch();
      };

      let randomAnim = Math.floor(Math.random() * 3 + 1);
      if (randomAnim === 1) {
        anim = new SwipeAnim(50, 20, gameStart);
      } else if (randomAnim === 2) {
        anim = new SplitAnim(15, 10, gameStart);
      } else if (randomAnim === 3) {
        anim = new CutAnim(40, 60, gameStart);
      }
      anim.makeAnim();
    }
  };

  isScrolled = e => {
    if (e.code === "ArrowDown") {
      this.grid.forEach(arr => {
        arr.forEach(elem => {
          elem.y += ENEMY1_HEIGHT;
        });
      });
    }
    if (e.code === "ArrowUp") {
      if (this.grid[0][0].y > canvas.height - this.bottomOffset) {
        this.grid.forEach(arr => {
          arr.forEach(elem => {
            elem.y -= ENEMY1_HEIGHT;
          });
        });
      }
    }
  };

  resetPos = () => {
    while (this.grid[0][0].y > canvas.height - this.bottomOffset) {
      this.grid.forEach(arr => {
        arr.forEach(obj => {
          obj.y--;
        });
      });
    }
  };

  generateLevel = () => {
    this.resetPos();
    this.grid.forEach(arr => {
      arr.forEach(obj => {
        if (obj.value !== "") {
          obj.y = obj.y - canvas.height + this.bottomOffset - ENEMY1_HEIGHT;
          this.levelExport.push(obj);
        }
      });
    });
    maps.push(this.levelExport);
  };

  editorLoop = () => {
    this.generateRows();
    canvas.addEventListener("click", this.isClicked, false);
    canvas.addEventListener("mousemove", this.isHovered, false);
    document.addEventListener("keydown", this.isScrolled, false);
    window.requestAnimationFrame(this.draw);
  };
}

class BoxOfEnemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.value = "";
  }
}
