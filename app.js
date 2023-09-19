import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.z = 3;
camera.position.y = 4;
camera.position.x = 2;

const renderer = new THREE.WebGLRenderer({
    alpha: true
})

renderer.setSize(window.innerWidth - window.innerWidth/10, window.innerHeight - window.innerHeight/10 - 10);
document.getElementById("object").appendChild(renderer.domElement)

const loader = new GLTFLoader();

const input = document.getElementById("file-input");

let model = "";

input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    loader.load(url, (gltf) => {

        if(model != "") scene.remove(model)

        model = gltf.scene;

        scene.add(model);
    });
});

let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

const controls = new OrbitControls(camera, renderer.domElement);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
const ambientLight = new THREE.AmbientLight(0x333333 , 5);

topLight.position.set(100, 100, 100);
ambientLight.position.set(100, 100, 100);
scene.add(topLight);
scene.add(ambientLight);

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.update();

    renderer.setSize(window.innerWidth - window.innerWidth/10, window.innerHeight - window.innerHeight/10 - 10);
})

document.onmousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

animate();