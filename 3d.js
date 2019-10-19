import * as THREE from "./node-modules/build/three.js";

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 01, 1000);

let renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(canvas.width, canvas.height);

let loader = THREE.FontLoader();

loader.load("/Assets/Fonts/Racing Sans One_Regular.json", function(font) {
  var geometry = new THREE.TextGeometry("Hello three.js!", {
    font: font,
    size: 80,
    height: 30,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 3,
    bevelOffset: 0,
    bevelSegments: 5
  });
});
