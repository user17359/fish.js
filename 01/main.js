import * as THREE from 'three';

// basic declarations
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cube instance
const geometry = new THREE.BoxGeometry(2, 2, 2);

// adding texture to the cube
const texture = new THREE.TextureLoader().load("/textures/fish.jpg")

const material = new THREE.MeshBasicMaterial({
    map: texture
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// light and camera settings
const pointLight = new THREE.PointLight(0xFFFFFF)
scene.add(pointLight)

scene.background = new THREE.Color(0x7788ff)

camera.position.z = 5;


function animate() {
    // rotatiion animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);