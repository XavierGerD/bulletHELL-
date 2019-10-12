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
let POWERUP_SIZE = 15;

let body = document.getElementById("body");
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.height = GAME_HEIGHT + "";
canvas.width = GAME_WIDTH + "";
body.append(canvas);

let background = new Image();
background.src = "Assets/background.png";

//player images
let playerImage01 = new Image();
playerImage01.src = "Assets/PlayerShip.png";

let playerFlash = new Image();
playerFlash.src = "Assets/PlayerShip_flash.png";

let healthbar = new Image();
healthbar.src = "Assets/healthbar.png";

let healthblock = new Image();
healthblock.src = "Assets/healthblock.png";

let megaBombImg = new Image();
megaBombImg.src = "Assets/megaBomb.png";

let megaBombSilhouetteImg = new Image();
megaBombSilhouetteImg.src = "Assets/megabomb_silhouette.png";

let playerFlashArray = [playerFlash, playerImage01, playerFlash, playerImage01, playerFlash, playerImage01];

//powerup images
let doubleShootPwrUp = new Image();
doubleShootPwrUp.src = "Assets/doubleshoot_powerup.png";

let tripleShootPwrUp = new Image();
tripleShootPwrUp.src = "Assets/tripleshoot_powerup.png";

let increaseDmg = new Image();
increaseDmg.src = "Assets/increaseDamage_powerup.png";

let increaseRoF = new Image();
increaseRoF.src = "Assets/increaseRoF_powerup.png";

let megaBombPwrUp = new Image();
megaBombPwrUp.src = "Assets/megaBomb_powerup.png";

//bullet images
let bulletImage01 = new Image();
bulletImage01.src = "Assets/Bullet01.png";

let bulletImage02 = new Image();
bulletImage02.src = "Assets/Bullet02.png";

//enemy1 images

let enemyImage01 = new Image();
enemyImage01.src = "Assets/EnemyShip01.png";

let enemy01Flash = new Image();
enemy01Flash.src = "Assets/EnemyShip01_flash.png";

let enemyExplode1 = new Image();
enemyExplode1.src = "Assets/enemyExplode1.png";

let enemyExplode2 = new Image();
enemyExplode2.src = "Assets/enemyExplode2.png";

let enemyExplode3 = new Image();
enemyExplode3.src = "Assets/enemyExplode3.png";

let enemyExplode4 = new Image();
enemyExplode4.src = "Assets/enemyExplode4.png";

//enemy2 images

let enemyImage02 = new Image();
enemyImage02.src = "Assets/EnemyShip02.png";

let enemy02Flash = new Image();
enemy02Flash.src = "Assets/EnemyShip02_flash.png";

// let enemyExplode1 = new Image();
// enemyExplode1.src = "Assets/enemyExplode1.png";

// let enemyExplode2 = new Image();
// enemyExplode2.src = "Assets/enemyExplode2.png";

// let enemyExplode3 = new Image();
// enemyExplode3.src = "Assets/enemyExplode3.png";

// let enemyExplode4 = new Image();
// enemyExplode4.src = "Assets/enemyExplode4.png";

let SHOOTPATTERN1X = [0, -0.38, -0.71, -0.92, -1, -0.92, -0.71, -0.38, 0, 0.38, 0.71, 0.92, 1, 0.92, 0.71, 0.38];
let SHOOTPATTERN1Y = [1, 0.92, 0.71, 0.38, 0, -0.38, -0.71, -0.92, -1, -0.92, -0.71, -0.38, 0, 0.38, 0.71, 0.92];

let SHOOTPATTERN2X = [-0.38, -0.71, -0.38, 0.38, 0.71, 0.38];
let SHOOTPATTERN2Y = [0.92, 0.71, 0.92, 0.92, 0.71, 0.92];

let enemy1Expl = [enemyExplode1, enemyExplode2, enemyExplode3, enemyExplode4];
let enemy1flashAnim = [enemy01Flash, enemyImage01, enemy01Flash, enemyImage01, enemy01Flash, enemyImage01];

let enemy2flashAnim = [enemy02Flash, enemyImage02, enemy02Flash, enemyImage02, enemy02Flash, enemyImage02];
