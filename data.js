let GAME_WIDTH = 300;
let GAME_HEIGHT = 800;
let ENEMY1_WIDTH = 30;
let ENEMY1_HEIGHT = 30;
let MAX_ENEMIES = 5;
let ENEMY1_SPEED = 0.2;
let PLAYER_WIDTH = 30;
let PLAYER_HEIGHT = 30;
let PLAYER_SPEED = 2;
let GAMESPEED = 10;

let body = document.getElementById("body");
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.height = GAME_HEIGHT + "";
canvas.width = GAME_WIDTH + "";
body.append(canvas);

let SHOOTPATTERN1X = [0, -0.38, -0.71, -0.92, -1, -0.92, -0.71, -0.38, 0, 0.38, 0.71, 0.92, 1, 0.92, 0.71, 0.38];
let SHOOTPATTERN1Y = [1, 0.92, 0.71, 0.38, 0, -0.38, -0.71, -0.92, -1, -0.92, -0.71, -0.38, 0, 0.38, 0.71, 0.92];

let SHOOTPATTERN2X = [-0.38, -0.71, -0.38, 0.38, 0.71, 0.38];
let SHOOTPATTERN2Y = [0.92, 0.71, 0.92, 0.92, 0.71, 0.92];

let background = new Image();
background.src = "Assets/background.png";

let enemyImage01 = new Image();
enemyImage01.src = "Assets/EnemyShip01.png";

let bulletImage01 = new Image();
bulletImage01.src = "Assets/Bullet01.png";

let bulletImage02 = new Image();
bulletImage02.src = "Assets/Bullet02.png";

let playerImage01 = new Image();
playerImage01.src = "Assets/PlayerShip.png";

let enemyExplode1 = new Image();
enemyExplode1.src = "Assets/enemyExplode1.png";

let enemyExplode2 = new Image();
enemyExplode2.src = "Assets/enemyExplode2.png";

let enemyExplode3 = new Image();
enemyExplode3.src = "Assets/enemyExplode3.png";

let enemyExplode4 = new Image();
enemyExplode4.src = "Assets/enemyExplode4.png";

let enemy1Expl = [enemyExplode1, enemyExplode2, enemyExplode3, enemyExplode4];
