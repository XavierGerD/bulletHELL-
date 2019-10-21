var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ canvas: gl, alpha: true, antialias: true });
let geometry = renderer.setClearColor(0x000000, 0);
renderer.setSize(canvas.width, canvas.height);
var material = new THREE.MeshLambertMaterial({ color: 0xffffff });

let light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
let light2 = new THREE.PointLight(0xffffff, 0.5);
light2.position.z = 200;
scene.add(light2);
let light3 = new THREE.HemisphereLight(0xff00cc, 0xff00cc);
scene.add(light3);

let blasterText;
let starText;
let RacingOne;

var loader = new THREE.FontLoader();

let star = loader.load("/Assets/Fonts/Racing Sans One_Regular.json", function(font) {
  var geometry = new THREE.TextGeometry("STAR", {
    font: font,
    size: 1.3,
    height: 0.5,
    curveSegments: 12
  });

  geometry.translate(-2.1, 0, -0.25);
  starText = new THREE.Mesh(geometry, material);
  starText.position.set(0, 24.5, 1);
});

let blaster = loader.load("/Assets/Fonts/Racing Sans One_Regular.json", function(font) {
  var geometry = new THREE.TextGeometry("BLASTER!", {
    font: font,
    size: 1.3,
    height: 0.5,
    curveSegments: 12
  });
  geometry.translate(-3.8, 0.25, -0.25);
  blasterText = new THREE.Mesh(geometry, material);
  blasterText.position.set(0, 22, 1);
});

// loader.load("/Assets/Fonts/Racing Sans One_Regular.json", function(font) {
//   RacingOne = font;
// });

// let params1 = {
//   font: RacingOne,
//   size: 1.3,
//   height: 0.5,
//   curveSegments: 12
// };

camera.position.z = 20;

let waitForLoad = () => {
  if (blasterText === undefined) {
    window.requestAnimationFrame(waitForLoad);
  } else {
    scene.add(starText);
    scene.add(blasterText);
  }
};

let animateTitle = function() {
  if (blasterText.position.y >= 0.25) {
    requestAnimationFrame(animateTitle);
    blasterText.rotation.y += 0.0526;
    starText.rotation.y += 0.0526;
    blasterText.position.y -= 0.0915;
    starText.position.y -= 0.0915;
    renderer.render(scene, camera);
  }
};

let exitAnim = () => {
  if (blasterText.position.x < 10) {
    requestAnimationFrame(exitAnim);
    blasterText.position.x += 2;
    starText.position.x -= 2;
    renderer.render(scene, camera);
  }
};

let entranceAnim = () => {
  if (blasterText.position.x > 0.25) {
    requestAnimationFrame(entranceAnim);
    blasterText.position.x -= 2;
    starText.position.x += 2;
    renderer.render(scene, camera);
  }
};

waitForLoad();
