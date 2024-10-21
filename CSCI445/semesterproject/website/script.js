import * as THREE from "./three.module.js";
let camera, scene, renderer;
let earth, skybox;
init();
function init() {
  //Initialize Stuff
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 2;
  scene = new THREE.Scene();

  //Add a light
  const light = new THREE.DirectionalLight(0xffffff, 10);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  //Setup meshes
  earthRender();
  skyboxRender();

  //Get Shaders
  //const fragmentShader = document.getElementById("fragmentShader").textContent;
  //const vertexShader = document.getElementById("vertexShader").textContent;

  //Render Stuff
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  earth.rotation.y += 0.0000013888888888889; /*!! UPDATE TO USE EPOCH TIME !!*/
  renderer.render(scene, camera);
}

function earthRender() {
  const radius = 1,
    heightmaprange = 6400;
  const earthTexture = new THREE.TextureLoader().load(
    "./images/Earth-Mercator-Day-Texture.jpg"
  );
  const earthHeightmap = new THREE.TextureLoader().load(
    "./images/Earth-Mercator-Heightmap.png"
  );
  earthTexture.colorSpace = THREE.SRGBColorSpace;
  const earthGeometry = new THREE.SphereGeometry(radius, 128, 128);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    displacementMap: earthHeightmap,
    displacementScale: radius / heightmaprange,
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);
}

function skyboxRender() {
  const skyboxTexture = new THREE.TextureLoader().load(
    "./images/MilkyWay-Mercator-Texture.jpg"
  );
  skyboxTexture.colorSpace = THREE.SRGBColorSpace;
  const skyboxGeometry = new THREE.SphereGeometry(-50, 4, 4);
  const skyboxMaterial = new THREE.MeshBasicMaterial({ map: skyboxTexture });
  skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  scene.add(skybox);
}
