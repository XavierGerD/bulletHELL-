var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ canvas: gl });
let geometry = renderer.setClearColor(0x000000, 0);
renderer.setSize(canvas.width, canvas.height);

let blasterText;
let starText;

var loader = new THREE.FontLoader();

let blaster = loader.load("/Assets/Fonts/Racing Sans One_Regular.json", function(font) {
  var geometry = new THREE.TextGeometry("STAR", {
    font: font,
    size: 1.2,
    height: 0.5,
    curveSegments: 12
  });
  var material = new THREE.MeshBasicMaterial();
  starText = new THREE.Mesh(geometry, material);
  scene.add(starText);
});

let star = loader.load("/Assets/Fonts/Racing Sans One_Regular.json", function(font) {
  var geometry = new THREE.TextGeometry("BLASTER!", {
    font: font,
    size: 1.2,
    height: 0.5,
    curveSegments: 12
  });
  var material = new THREE.MeshBasicMaterial();
  blasterText = new THREE.Mesh(geometry, material);
  scene.add(blasterText);
});

camera.position.z = 20;

var animate = function() {
  requestAnimationFrame(animate);
  loader.onLoadComplete = function() {
    starText.position.set(-4.5, 0.5, 1);
    blasterText.position.set(-4.5, 1.5, 1);
    renderer.render(scene, camera);
  };
};

animate();
