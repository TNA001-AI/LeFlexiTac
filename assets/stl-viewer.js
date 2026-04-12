import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

document.querySelectorAll(".stl-viewer").forEach((canvas) => {
  const url = canvas.dataset.stl;
  if (!url) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(1, 2, 3);
  scene.add(dirLight);

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener("resize", resize);

  const rotations = {
    "assets/models/Moving_Jaw_08d.stl": { x: Math.PI, z: 0 },
    "assets/models/Wrist_Roll_08c.stl": { x: -Math.PI / 2, z: 0 },
  };

  new STLLoader().load(url, (geometry) => {
    const rot = rotations[url] || { x: 0, z: 0 };
    if (rot.x) geometry.rotateX(rot.x);
    if (rot.z) geometry.rotateZ(rot.z);

    geometry.computeBoundingBox();
    geometry.center();

    const material = new THREE.MeshPhongMaterial({
      color: 0x6a9fb5,
      specular: 0x555555,
      shininess: 80,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const size = new THREE.Vector3();
    geometry.boundingBox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.set(0, maxDim * 0.6, maxDim * 1.6);
    controls.target.set(0, 0, 0);
    controls.update();
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});
