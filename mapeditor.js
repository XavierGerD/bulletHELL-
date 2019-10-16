class MapEditor {
  constructor() {
    this.numOfRows = 5;
    this.rowWidth = 8;
    this.grid = [];
    this.arrayOfEnemies = [];
    this.levelExport = [];
    this.currentEnemyType = "";
    this.parallaxees = [new Parallax(0, 0, parallax1), new Parallax(0, 0, parallax2), new Parallax(0, 0, parallax3)];
    this.bottomOffset = 240;
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
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.rect(elem.x, elem.y, ENEMY1_WIDTH, ENEMY1_HEIGHT);
        ctx.stroke();
      });
    });

    //draw enemies placed in the grid
    this.grid.forEach(arr => {
      arr.forEach(elem => {
        if (elem.value === "EnemyT1") {
          ctx.drawImage(enemyImage01, elem.x, elem.y);
        }
        if (elem.value === "EnemyT2") {
          ctx.drawImage(enemyImage02, elem.x, elem.y);
        }
        if (elem.value === "EnemyT3") {
          ctx.drawImage(enemyImage03, elem.x, elem.y);
        }
      });
    });

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
  };

  generateLevel = () => {
    this.grid.forEach(arr => {
      arr.forEach(obj => {
        if (obj.type !== "") {
          this.levelExport.push(obj);
        }
      });
    });
  };

  editorLoop = () => {
    this.generateRows();
    canvas.addEventListener("click", this.isClicked, false);
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
