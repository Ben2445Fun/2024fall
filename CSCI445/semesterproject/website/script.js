import * as THREE from "./three.js";
import { OrbitControls } from "./OrbitControls.js";
let camera, scene, renderer;
let earth, skybox;
let t = 0;
var uniforms1 = {
  time: { value: t },
  resolution: { value: new THREE.Vector2() },
};
init();
function init() {
  //Initialize Stuff
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.00001,
    -1
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

  //Render Stuff
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  //Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 20, 10);
  controls.update();

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
  const earthDayTexture = new THREE.TextureLoader().load(
    "./images/Earth-Mercator-Day-Texture.jpg"
  );
  const earthNightTexture = new THREE.TextureLoader().load(
    "./images/Earth-Mercator-Night-Texture.jpg"
  );
  const earthHeightmap = new THREE.TextureLoader().load(
    "./images/Earth-Mercator-Heightmap.png"
  );
  earthDayTexture.colorSpace = THREE.SRGBColorSpace;
  earthNightTexture.colorSpace = THREE.SRGBColorSpace;
  const earthGeometry = new THREE.SphereGeometry(radius, 128, 128);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthDayTexture,
    displacementMap: earthHeightmap,
    displacementScale: radius / heightmaprange,
  });
  /*var material = new THREE.ShaderMaterial({
    uniforms: uniforms1,
    fragmentShader: document.getElementById("fragmentShader").textContent,
    vertexShader: document.getElementById("vertexShader").textContent,
  });*/
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);
}

function skyboxRender() {
  const skyboxTexture = new THREE.TextureLoader().load(
    "./images/MilkyWay-Mercator-Texture.jpg"
  );
  skyboxTexture.colorSpace = THREE.SRGBColorSpace;
  const skyboxGeometry = new THREE.SphereGeometry(4294967295, 32, 32);
  const skyboxMaterial = new THREE.MeshBasicMaterial({
    map: skyboxTexture,
    side: THREE.BackSide,
  });
  skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  scene.add(skybox);
}
