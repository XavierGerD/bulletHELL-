let GAME_WIDTH = 300;
let GAME_HEIGHT = 800;
let ENEMY1_WIDTH = 30;
let ENEMY1_HEIGHT = 30;
let ENEMY1_SPEED = 0.2;
let PLAYER_WIDTH = 30;
let PLAYER_HEIGHT = 30;
let PLAYER_SPEED = 2;
let GAMESPEED = 10;
let POWERUP_SIZE = 15;
let BULLET_SIZE = 8;
let anim;
let introAnim = false;
let maps = [
  [
    { x: 60, y: -30, value: "EnemyT1" },
    { x: 210, y: -90, value: "EnemyT1" },
    { x: 60, y: -150, value: "EnemyT1" },
    { x: 30, y: -180, value: "EnemyT3" },
    { x: 90, y: -180, value: "EnemyT1" },
    { x: 210, y: -210, value: "EnemyT1" },
    { x: 60, y: -300, value: "EnemyT1" },
    { x: 90, y: -330, value: "EnemyT1" },
    { x: 60, y: -360, value: "EnemyT1" },
    { x: 210, y: -360, value: "EnemyT1" },
    { x: 180, y: -390, value: "EnemyT1" },
    { x: 90, y: -420, value: "EnemyT2" },
    { x: 30, y: -450, value: "EnemyT3" },
    { x: 60, y: -480, value: "EnemyT1" },
    { x: 210, y: -480, value: "EnemyT1" },
    { x: 120, y: -510, value: "EnemyT2" },
    { x: 150, y: -510, value: "EnemyT2" },
    { x: 60, y: -630, value: "EnemyT1" },
    { x: 210, y: -630, value: "EnemyT1" },
    { x: 120, y: -690, value: "EnemyT3" },
    { x: 60, y: -750, value: "EnemyT1" },
    { x: 60, y: -780, value: "EnemyT3" },
    { x: 90, y: -780, value: "EnemyT1" },
    { x: 120, y: -810, value: "EnemyT1" },
    { x: 150, y: -840, value: "EnemyT1" },
    { x: 210, y: -900, value: "EnemyT1" },
    { x: 90, y: -960, value: "EnemyT2" },
    { x: 180, y: -960, value: "EnemyT2" },
    { x: 150, y: -1050, value: "EnemyT3" },
    { x: 60, y: -1140, value: "EnemyT1" },
    { x: 90, y: -1140, value: "EnemyT1" },
    { x: 180, y: -1140, value: "EnemyT1" },
    { x: 210, y: -1140, value: "EnemyT1" },
    { x: 120, y: -1230, value: "EnemyT1" },
    { x: 150, y: -1230, value: "EnemyT1" },
    { x: 60, y: -1290, value: "EnemyT1" },
    { x: 210, y: -1290, value: "EnemyT1" },
    { x: 90, y: -1320, value: "EnemyT1" },
    { x: 180, y: -1320, value: "EnemyT1" },
    { x: 120, y: -1440, value: "EnemyT3" },
    { x: 150, y: -1440, value: "EnemyT3" },
    { x: 90, y: -1470, value: "EnemyT2" },
    { x: 180, y: -1470, value: "EnemyT2" }
  ]
];
let customMaps = [];
let keyMapping = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  shoot: "Space",
  bomb: "KeyZ",
  pause: "KeyP"
};

// let body = document.getElementById("body");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// canvas.height = GAME_HEIGHT + "";
// canvas.width = GAME_WIDTH + "";
// body.append(canvas);
let gl = document.getElementById("gl");
let glctx = gl.getContext("webgl");

let background = new Image();
background.src = "Assets/background.png";

let background2 = new Image();
background2.src = "Assets/background2.png";

let titleScreen = new Image();
titleScreen.src = "Assets/Title.png";

let saveMap = new Image();
saveMap.src = "Assets/save.png";

let exitMap = new Image();
exitMap.src = "Assets/exit.png";

let menuPointer = new Image();
menuPointer.src = "Assets/menu_pointer.png";

let parallax1 = new Image();
parallax1.src = "Assets/Parallax1.png";

let parallax2 = new Image();
parallax2.src = "Assets/Parallax2.png";

let parallax3 = new Image();
parallax3.src = "Assets/Parallax3.png";

let movingStars = new Image();
movingStars.src = "Assets/movingstars.png";

let overlay = new Image();
overlay.src = "Assets/overlay.png";

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

let rightTilt = new Image();
rightTilt.src = "Assets/ship_tilt_right02.png";

let leftTilt = new Image();
leftTilt.src = "Assets/ship_tilt_left02.png";

let playerFlashArray = [playerFlash, playerImage01, playerFlash, playerImage01, playerFlash, playerImage01];

let playerExplosion1 = new Image();
playerExplosion1.src = "Assets/shipExplosion1.png";

let playerExplosion2 = new Image();
playerExplosion2.src = "Assets/shipExplosion2.png";

let playerExplosion3 = new Image();
playerExplosion3.src = "Assets/shipExplosion3.png";

let playerExplosion4 = new Image();
playerExplosion4.src = "Assets/shipExplosion4.png";

let playerExplosion5 = new Image();
playerExplosion5.src = "Assets/shipExplosion5.png";

let playerExplosion6 = new Image();
playerExplosion6.src = "Assets/shipExplosion6.png";

let playerExplosion7 = new Image();
playerExplosion7.src = "Assets/shipExplosion7.png";

let playerExplosionArray = [
  playerExplosion1,
  playerExplosion2,
  playerExplosion3,
  playerExplosion4,
  playerExplosion5,
  playerExplosion6,
  playerExplosion7
];

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
increaseDmg.src = "Assets/increasedamage_powerup.png";

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

//bosses images

let jackyBoyImg = new Image();
jackyBoyImg.src = "Assets/jackyboy.png";

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

let enemy3Explode1 = new Image();
enemy3Explode1.src = "Assets/enemy3Explode1.png";

let enemy3Explode2 = new Image();
enemy3Explode2.src = "Assets/enemy3Explode2.png";

let enemy3Explode3 = new Image();
enemy3Explode3.src = "Assets/enemy3Explode3.png";

let enemy3Explode4 = new Image();
enemy3Explode4.src = "Assets/enemy3Explode4.png";

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

let enemy3Expl = [enemy3Explode1, enemy3Explode2, enemy3Explode3, enemy3Explode4];
let enemy3flashAnim = [enemy03Flash, enemyImage03, enemy03Flash, enemyImage03, enemy03Flash, enemyImage03];

//editor images

let addRowsImg = new Image();
addRowsImg.src = "Assets/addrows.png";

let removeRowsImg = new Image();
removeRowsImg.src = "Assets/removeRows.png";

//music

let mainTheme = new Howl({ src: "Assets/Music/Main_theme.mp3" });
