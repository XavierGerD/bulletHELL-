class MapEditor {
  constructor() {
    this.numOfRows = 25;
    this.rowWidth = 8;
    this.grid = [];
    this.arrayOfEnemies = [];
    this.currentEnemyType = "E1";
    this.parallaxees = [new Parallax(0, 0, parallax1), new Parallax(0, 0, parallax2), new Parallax(0, 0, parallax3)];
    this.selectors = [
      {
        type: "E1",
        x: 30,
        y: 760,
        img: enemyImage01,
        isClicked: false
      },
      {
        type: "E2",
        x: 60,
        y: 760,
        img: enemyImage02,
        isClicked: false
      },
      {
        type: "E3",
        x: 90,
        y: 760,
        img: enemyImage03,
        isClicked: false
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
        if (elem.value === "E1") {
          ctx.drawImage(enemyImage01, elem.x, elem.y);
        }
        if (elem.value === "E2") {
          ctx.drawImage(enemyImage02, elem.x, elem.y);
        }
        if (elem.value === "E3") {
          ctx.drawImage(enemyImage03, elem.x, elem.y);
        }
      });
    });

    //draw the selectors
    this.selectors.forEach(obj => {
      ctx.drawImage(obj.img, obj.x, obj.y);
    });

    window.requestAnimationFrame(this.draw);
  };

  generateRows = () => {
    for (let i = 0; i < this.numOfRows; i++) {
      let row = [];
      this.grid.push(row);
      for (let j = 0; j < this.rowWidth; j++) {
        row.push(new RowOfEnemies(ENEMY1_WIDTH * (j + 1), canvas.height - 120 - ENEMY1_HEIGHT * i));
      }
    }
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
  };

  editorLoop = () => {
    this.generateRows();
    canvas.addEventListener("click", this.isClicked, false);
    window.requestAnimationFrame(this.draw);
  };
}

class RowOfEnemies {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.value = "";
  }
}
