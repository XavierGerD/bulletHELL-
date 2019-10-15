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
let BULLET_SIZE = 8;
let anim;

let body = document.getElementById("body");
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.height = GAME_HEIGHT + "";
canvas.width = GAME_WIDTH + "";
body.append(canvas);

let background = new Image();
background.src = "Assets/background.png";

let titleScreen = new Image();
titleScreen.src = "Assets/Title.png";

let newGame = new Image();
newGame.src = "Assets/new_game.png";

let leaderboard = new Image();
leaderboard.src = "Assets/leaderboard.png";

let menuPointer = new Image();
menuPointer.src = "Assets/menu_pointer.png";

let parallax1 = new Image();
parallax1.src = "Assets/Parallax1.png";

let parallax2 = new Image();
parallax2.src = "Assets/Parallax2.png";

let parallax3 = new Image();
parallax3.src = "Assets/Parallax3.png";

//anim files

let swipeAnimImg = new Image();
swipeAnimImg.src = "Assets/swipe_anim.png";

let splitAnimTop = new Image();
splitAnimTop.src = "Assets/split_anim_top.png";

let splitAnimBot = new Image();
splitAnimBot.src = "Assets/split_anim_bot.png";

let cutAnimImg = new Image();
cutAnimImg.src = "Assets/cut_anim_head.png";

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

//player engine anim
let engineAnim1 = new Image();
engineAnim1.src = "Assets/engineanim1.png";

let engineAnim2 = new Image();
engineAnim2.src = "Assets/engineanim2.png";

let engineAnim3 = new Image();
engineAnim3.src = "Assets/engineanim3.png";

let engineAnim4 = new Image();
engineAnim4.src = "Assets/engineanim4.png";

let engineAnim5 = new Image();
engineAnim5.src = "Assets/engineanim5.png";

let engineAnimArray = [engineAnim1, engineAnim2, engineAnim3, engineAnim4, engineAnim5, engineAnim4, engineAnim3, engineAnim2];

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

let healthUp = new Image();
healthUp.src = "Assets/healthup_powerup.png";

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

let enemy2Explode1 = new Image();
enemy2Explode1.src = "Assets/enemy2Explode1.png";

let enemy2Explode2 = new Image();
enemy2Explode2.src = "Assets/enemy2Explode2.png";

let enemy2Explode3 = new Image();
enemy2Explode3.src = "Assets/enemy2Explode3.png";

let enemy2Explode4 = new Image();
enemy2Explode4.src = "Assets/enemy2Explode4.png";

//enemy3 images

let enemyImage03 = new Image();
enemyImage03.src = "Assets/EnemyShip03.png";

let enemy03Flash = new Image();
enemy03Flash.src = "Assets/EnemyShip03_flash.png";

// let enemy2Explode1 = new Image();
// enemy2Explode1.src = "Assets/enemy2Explode1.png";

// let enemy2Explode2 = new Image();
// enemy2Explode2.src = "Assets/enemy2Explode2.png";

// let enemy2Explode3 = new Image();
// enemy2Explode3.src = "Assets/enemy2Explode3.png";

// let enemy2Explode4 = new Image();
// enemy2Explode4.src = "Assets/enemy2Explode4.png";

//enemy-related arrays

//shoot-pattern arrays. Each pair of values is a specific vector.

let SHOOTPATTERN1X = [];
let SHOOTPATTERN1Y = [];

let SHOOTPATTERN2X = [-0.38, -0.71, -0.38, 0.38, 0.71, 0.38];
let SHOOTPATTERN2Y = [0.92, 0.71, 0.92, 0.92, 0.71, 0.92];

let SHOOTPATTERN3X = [0, -0.38, -0.71, -0.92, -1, -0.92, -0.71, -0.38, 0, 0.38, 0.71, 0.92, 1, 0.92, 0.71, 0.38];
let SHOOTPATTERN3Y = [1, 0.92, 0.71, 0.38, 0, -0.38, -0.71, -0.92, -1, -0.92, -0.71, -0.38, 0, 0.38, 0.71, 0.92];

//explosion animations and flashing animations
let enemy1Expl = [enemyExplode1, enemyExplode2, enemyExplode3, enemyExplode4];
let enemy1flashAnim = [enemy01Flash, enemyImage01, enemy01Flash, enemyImage01, enemy01Flash, enemyImage01];

let enemy2Expl = [enemy2Explode1, enemy2Explode2, enemy2Explode3, enemy2Explode4];
let enemy2flashAnim = [enemy02Flash, enemyImage02, enemy02Flash, enemyImage02, enemy02Flash, enemyImage02];

let enemy3Expl = [enemy2Explode1, enemy2Explode2, enemy2Explode3, enemy2Explode4];
let enemy3flashAnim = [enemy03Flash, enemyImage03, enemy03Flash, enemyImage03, enemy03Flash, enemyImage03];
