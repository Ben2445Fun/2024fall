import * as THREE from "./three.js";
import { OrbitControls } from "./OrbitControls.js";
let camera, scene, renderer, earth, skybox;
init();

async function init() {
  //Initialize Stuff
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.00001,
    -1
  );
  camera.position.z = 2;
  scene = new THREE.Scene();

  //Setup meshes
  await earthRender();
  await skyboxRender();

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

async function earthRender() {
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
  const earthFragmentShader = await loadShader("./shaders/earthfragment.glsl");
  const earthVertexShader = await loadShader("./shaders/earthvertex.glsl");
  /*const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthDayTexture,
    displacementMap: earthHeightmap,
    displacementScale: radius / heightmaprange,
  });*/
  var earthMaterial = new THREE.ShaderMaterial({
    uniforms: { uTexture: { value: earthDayTexture } },
    fragmentShader: earthFragmentShader,
    vertexShader: earthVertexShader,
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);
}

async function skyboxRender() {
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

async function loadShader(shaderfile) {
  return new Promise((resolve, reject) => {
    const loader = new THREE.FileLoader();
    loader.setResponseType("text");
    loader.load(
      shaderfile,
      (data) => resolve(data),
      undefined,
      (error) => reject(error)
    );
  });
}
