// importing the sass stylesheet for bundling
import "./../sass/styles.scss";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

let scene;
let camera;
let renderer;

let planeGeometry;
let planeMaterial;
let planeMesh;

let boxGeometry;
let boxMaterial;
let boxMesh;

let sphereGeometry;
let sphereMaterial;
let sphereMesh;
var orbitRadius;
let angle = 0;

let frontLight;
let backLight;

let gui;
let world = {
    plane: {
        width: 5,
        height: 5,
        widthSegments: 10,
        heightSegments: 10
    }
};

// ---------------------- event handler
function generatePlane() {
    scene.remove(planeMesh);

    planeGeometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);
    planeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide });

    planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    scene.add(planeMesh);
}

function generateBox() {
    boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    boxMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide });

    boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    scene.add(boxMesh);
}

function generateSphere() {
    sphereGeometry = new THREE.SphereGeometry(0.5);
    sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide });

    sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

    scene.add(sphereMesh);
}

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

function setupLights() {
    frontLight = new THREE.DirectionalLight(0xffffff, 15);
    frontLight.position.set(0, 0, 1);
    scene.add(frontLight);

    backLight = new THREE.DirectionalLight(0xffffff, 15);
    backLight.position.set(0, 0, -1);
    scene.add(backLight);
}

function animate() {
    requestAnimationFrame(animate);

    // box animation
    boxMesh.rotation.x += 0.05;
    boxMesh.rotation.z += 0.05;

    // sphere animation
    sphereMesh.position.x = 2;
    sphereMesh.position.y = 2;

    orbitRadius = 2.7;
    sphereMesh.position.x = Math.sin(angle) * orbitRadius;
    sphereMesh.position.y = Math.cos(angle) * orbitRadius;

    // increase the angle
    angle += 0.01;

    renderer.render(scene, camera);
}

function addOrbitControls() {
    new OrbitControls(camera, renderer.domElement);
}

function addDatGUI() {
    gui = new dat.GUI();

    gui.add(world.plane, "width", 1, 20).onChange(generatePlane);
    gui.add(world.plane, "height", 1, 20).onChange(generatePlane);
}

// ---------------------- main function
function main() {
    setupScene();
    setupRenderer();
    setupLights();

    // generatePlane();
    generateBox();
    generateSphere();

    // addOrbitControls();
    // addDatGUI();

    animate();
}

main();