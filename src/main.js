// importing the sass stylesheet for bundling
import "./../sass/styles.scss";

import * as THREE from "three";

let scene;
let camera;
let renderer;

let planeGeometry;
let planeMaterial;
let planeMesh;

let light;

// ---------------------- public functions
function setupScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    camera.position.z = 5;
}

function setupRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
}

function generatePlane() {
    planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
    planeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide });

    planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    scene.add(planeMesh);
}

function setupLights() {
    light = new THREE.DirectionalLight(0xffffff, 15);
    light.position.set(0, 0, 1);
    console.log(light);
    scene.add(light);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// ---------------------- main function
function main() {
    setupScene();
    setupRenderer();
    generatePlane();
    setupLights();

    animate();
}

main();