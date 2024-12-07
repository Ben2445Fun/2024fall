import * as THREE from "./three.js";
import { OrbitControls } from "./OrbitControls.js";
let camera,
  scene,
  renderer,
  earth,
  skybox,
  pointLight,
  moon,
  sun,
  pof,
  controls;
let PI = 3.1415926535897932384626433832795;
let scale = 100;
init();

async function init() {
  //Initialize Stuff
  camera = new THREE.PerspectiveCamera(
    70, // Field of View
    window.innerWidth / window.innerHeight, // Resolution
    0.00001, // Near-plane clipping
    -1 // Far-plane clipping
  );
  camera.position.z = 1;
  scene = new THREE.Scene();

  //Add Lighting
  pointLight = new THREE.DirectionalLight(0xffffff, 10);
  await pointLight.position.set(0, 0, 10);
  scene.add(pointLight);

  //Setup meshes
  earthRender();
  sunRender();
  moonRender();
  skyboxRender();

  //Render Stuff
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  //Orbit Controls
  controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 5, 0);
  controls.update();
  const pofGeometry = new THREE.SphereGeometry(0.01, 8, 8);
  const pofMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  pof = new THREE.Mesh(pofGeometry, pofMaterial);
  scene.add(pof);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  pof.position.copy(controls.target);
  //* Rotate Earth and Moon in real-time
  earth.rotation.y =
    (Date.now() % 86_400_000) *
      ((0.00000416666666666666666666666666667 * PI) / 180) +
    PI / 2;
  moon.rotation.y =
    (Date.now() / 2_358_720_000) *
    ((0.00000015250414991327385530279169436982 * PI) / 180);

  //* Moon orbit
  moon.position.x =
    Math.sin(
      (Date.now() / 2_358_720_000) *
        ((0.00000015250414991327385530279169436982 * PI) / 180)
    ) * 15;
  moon.position.z =
    Math.cos(
      (Date.now() / 2_358_720_000) *
        ((0.00000015250414991327385530279169436982 * PI) / 180)
    ) * 15;

  //* Sun orbit
  sun.position.x =
    Math.sin(
      (Date.now() % 31_556_736_000) *
        ((0.00000001140802394772387106195013324572 * PI) / 180)
    ) * 2360.6969078637576518599905823262;
  sun.position.z =
    Math.cos(
      (Date.now() % 31_556_736_000) *
        ((0.00000001140802394772387106195013324572 * PI) / 180)
    ) * 2360.6969078637576518599905823262;
  pointLight.position.x = sun.position.x;
  pointLight.position.z = sun.position.z;

  //* Console Logs
  //!console.log("Earth's Rotation: ", (earth.rotation.y * 180) / PI);
  //!console.log("Moon's Rotation: ", (moon.rotation.y * 180) / PI);
  //!console.log("Moon's Position: ", moon.position);
  //!console.log("Sun's Position: ", sun.position);

  renderer.render(scene, camera);
}

async function earthRender() {
  const earthDayTexture = new THREE.TextureLoader().load(
    "./images/Earth-Mercator-Day-Texture.jpg" // Water color is #020514
  );
  const earthNightTexture = new THREE.TextureLoader().load(
    "./images/Earth-Mercator-Night-Texture.jpg"
  );
  const earthHeightmap = new THREE.TextureLoader().load(
    "./images/Earth-Mercator-Heightmap.png"
  );
  earthDayTexture.colorSpace = THREE.SRGBColorSpace;
  earthNightTexture.colorSpace = THREE.SRGBColorSpace;
  const earthGeometry = new THREE.SphereGeometry(1, 128, 128);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthDayTexture,
    displacementMap: earthHeightmap,
    metalness: 1.0,
    metalnessMap: earthDayTexture,
    displacementScale: 0.00015625 * scale, //Use the second number to change the scale of the displacement
    lightMap: earthNightTexture, //The light map works surprisingly well for switching between day and night
    lightMapIntensity: 5.0,
  });
  const earthFragmentShader = await loadShader("./shaders/earth.frag");
  const earthVertexShader = await loadShader("./shaders/earth.vert");
  var earthShaderMaterial = new THREE.ShaderMaterial({
    fragmentShader: earthFragmentShader,
    vertexShader: earthVertexShader,
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);
  //earth.rotation.x = (23.44 * PI) / 180; //Actual tilt of the earth | I don't like it
}

async function sunRender() {
  //It uses texture now and still flashes, whyyyyyyy
  const sunTexture = new THREE.TextureLoader().load(
    "./images/Sun-Mercator-Texture.jpg"
  );
  sunTexture.colorSpace = THREE.SRGBColorSpace;
  const sunGeometry = new THREE.SphereGeometry(
    109.16656562594725674446802061231,
    16,
    16
  );
  const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
  });
  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);
}

async function moonRender() {
  const moonGeometry = new THREE.SphereGeometry(
    0.27270890168738001414570071738911,
    64,
    64
  );
  const moonTexture = new THREE.TextureLoader().load(
    "./images/Moon-Mercator-Texture.jpg"
  );
  const moonHeightmap = new THREE.TextureLoader().load(
    "./images/Moon-Mercator-Heightmap.jpg"
  );
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    displacementMap: moonHeightmap,
    displacementScale: 0.0001 * scale, //Use the second number to change the scale of the displacement
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  scene.add(moon);
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
