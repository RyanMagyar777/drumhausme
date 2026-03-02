import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.166.1/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector("#scene");
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xa8e5ff, 30, 80);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  200,
);
camera.position.set(18, 11, 20);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 3, 0);
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 10;
controls.maxDistance = 38;

const hemi = new THREE.HemisphereLight(0xffffff, 0x87c4ff, 0.95);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffffff, 1.3);
sun.position.set(14, 24, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 80;
sun.shadow.camera.left = -30;
sun.shadow.camera.right = 30;
sun.shadow.camera.top = 30;
sun.shadow.camera.bottom = -30;
scene.add(sun);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(120, 120),
  new THREE.MeshStandardMaterial({ color: 0xb7f7a0, roughness: 1 }),
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const road = new THREE.Mesh(
  new THREE.PlaneGeometry(120, 16),
  new THREE.MeshStandardMaterial({ color: 0x4f5d75, roughness: 0.92 }),
);
road.rotation.x = -Math.PI / 2;
road.position.z = 18;
road.position.y = 0.01;
scene.add(road);

for (let i = -54; i < 54; i += 7) {
  const stripe = new THREE.Mesh(
    new THREE.PlaneGeometry(3.3, 0.85),
    new THREE.MeshStandardMaterial({ color: 0xfff9c4, roughness: 0.8 }),
  );
  stripe.rotation.x = -Math.PI / 2;
  stripe.position.set(i, 0.02, 18);
  scene.add(stripe);
}

function mat(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.75,
    metalness: 0.05,
  });
}

const store = new THREE.Group();
scene.add(store);

const body = new THREE.Mesh(new THREE.BoxGeometry(18, 7, 12), mat(0xfff8e7));
body.position.y = 3.5;
body.castShadow = true;
body.receiveShadow = true;
store.add(body);

const roof = new THREE.Mesh(
  new THREE.BoxGeometry(19.6, 1.4, 13.6),
  mat(0xf9fbff),
);
roof.position.y = 7.95;
roof.castShadow = true;
roof.receiveShadow = true;
store.add(roof);

const signBand = new THREE.Mesh(
  new THREE.BoxGeometry(19.75, 1.1, 13.75),
  mat(0xffffff),
);
signBand.position.y = 8.15;
store.add(signBand);

function stripe(color, yOffset) {
  const stripeMesh = new THREE.Mesh(
    new THREE.BoxGeometry(19.95, 0.26, 13.85),
    mat(color),
  );
  stripeMesh.position.y = yOffset;
  stripeMesh.castShadow = true;
  store.add(stripeMesh);
}

stripe(0xf97316, 8.5);
stripe(0x16a34a, 8.17);
stripe(0xef4444, 7.85);

const glassGroup = new THREE.Group();
store.add(glassGroup);

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xd9f3ff,
  roughness: 0.08,
  metalness: 0,
  transmission: 0.8,
  thickness: 0.2,
  transparent: true,
  opacity: 0.72,
});

for (let i = -6; i <= 6; i += 3) {
  if (Math.abs(i) < 1) continue;
  const windowPane = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 2.6, 0.2),
    glassMaterial,
  );
  windowPane.position.set(i, 3.5, 6.1);
  windowPane.castShadow = true;
  glassGroup.add(windowPane);
}

const door = new THREE.Mesh(
  new THREE.BoxGeometry(2.6, 4.3, 0.24),
  glassMaterial,
);
door.position.set(0, 2.2, 6.1);
store.add(door);

const doorFrame = new THREE.Mesh(
  new THREE.BoxGeometry(2.9, 4.6, 0.18),
  mat(0x1f2937),
);
doorFrame.position.set(0, 2.2, 6.02);
store.add(doorFrame);

const logoPlate = new THREE.Mesh(
  new THREE.BoxGeometry(4.8, 1.9, 0.3),
  mat(0xffffff),
);
logoPlate.position.set(0, 8.2, 6.8);
store.add(logoPlate);

const seven = new THREE.Mesh(
  new THREE.BoxGeometry(1.25, 1.45, 0.12),
  mat(0xf97316),
);
seven.position.set(-0.65, 8.2, 6.98);
store.add(seven);

const eleven = new THREE.Mesh(
  new THREE.BoxGeometry(1.95, 1.45, 0.12),
  mat(0x16a34a),
);
eleven.position.set(0.65, 8.2, 6.98);
store.add(eleven);

const parking = new THREE.Mesh(
  new THREE.PlaneGeometry(28, 18),
  new THREE.MeshStandardMaterial({ color: 0x8f9aa8, roughness: 0.88 }),
);
parking.rotation.x = -Math.PI / 2;
parking.position.set(0, 0.02, 8);
parking.receiveShadow = true;
scene.add(parking);

for (const x of [-7, -2.2, 2.2, 7]) {
  const line = new THREE.Mesh(
    new THREE.PlaneGeometry(0.24, 9),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 }),
  );
  line.rotation.x = -Math.PI / 2;
  line.position.set(x, 0.03, 8);
  scene.add(line);
}

for (const x of [-20, -13, 13, 20]) {
  const treeTop = new THREE.Mesh(
    new THREE.SphereGeometry(2.1, 18, 16),
    mat(0x22c55e),
  );
  treeTop.position.set(x, 3.8, -8);
  treeTop.castShadow = true;
  scene.add(treeTop);

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.6, 2.2, 12),
    mat(0x8b5a2b),
  );
  trunk.position.set(x, 1.3, -8);
  trunk.castShadow = true;
  scene.add(trunk);
}

for (let i = 0; i < 8; i += 1) {
  const cloud = new THREE.Mesh(
    new THREE.SphereGeometry(1 + Math.random() * 0.7, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 }),
  );
  cloud.position.set(
    -30 + i * 9,
    14 + Math.sin(i) * 2,
    -20 + Math.random() * 8,
  );
  scene.add(cloud);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize);

function tick() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
