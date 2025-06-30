let scene, camera, renderer, planet, wireframe, controls;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.set(0, 80, 400);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('canvas').appendChild(renderer.domElement);

  // Lighting dengan tone putih netral
  const ambient = new THREE.AmbientLight(0xeeeeee, 0.5); // Putih soft
  const directional = new THREE.DirectionalLight(0xcccccc, 1.2); // Cahaya arah lembut
  directional.position.set(1, 1, 1);
  scene.add(ambient, directional);

  // Geometry bola
  const geometry = new THREE.IcosahedronGeometry(15, 3);

  // Planet dengan warna biru navy + emissive gold
  const material = new THREE.MeshStandardMaterial({
    color: 0x0A192F,              // Biru tua navy
    roughness: 0.25,
    metalness: 0.9,
    emissive: 0xFFD700,           // Emas lembut
    emissiveIntensity: 0.4,
    flatShading: true
  });

  planet = new THREE.Mesh(geometry, material);
  planet.scale.set(18, 18, 18);
  scene.add(planet);

  // Wireframe dengan warna emas transparan
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFD700,              // Emas
    wireframe: true,
    transparent: true,
    opacity: 0.1
  });

  wireframe = new THREE.Mesh(geometry, wireMaterial);
  wireframe.scale.set(20, 20, 20);
  scene.add(wireframe);

  // Orbit control (interaktif)
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);
  planet.rotation.y += 0.002;
  wireframe.rotation.y -= 0.001;
  controls.update();
  renderer.render(scene, camera);
}
