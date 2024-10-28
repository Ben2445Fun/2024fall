import * as THREE from "./three.js";
import { OrbitControls } from "./OrbitControls.js";
let camera, scene, renderer, earth, skybox, pointLight;
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
  pointLight = new THREE.DirectionalLight(0xffffff, 1);
  await pointLight.position.set(0, 0, 10);
  scene.add(pointLight);
  //ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Change color and brightness later
  //scene.add(ambientLight);

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
    heightmaprange = 6; //Actual range is 6400
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
  const earthFragmentShader = await loadShader("./shaders/earth.frag");
  const earthVertexShader = await loadShader("./shaders/earth.vert");
  /*const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthDayTexture,
    displacementMap: earthHeightmap,
    displacementScale: radius / heightmaprange,
  });*/
  var earthMaterial = new THREE.ShaderMaterial({
    uniforms: {
      dayTexture: { value: earthDayTexture },
      nightTexture: { value: earthNightTexture },
      heightmap: { value: earthHeightmap },
      heightmapScale: { value: radius / heightmaprange },
      minLayers: { value: 0 },
      maxLayers: { value: heightmaprange },
    },
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
