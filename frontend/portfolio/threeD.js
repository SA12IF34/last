import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



let frontEnd = document.querySelector(".front .three-d");
let backEnd = document.querySelector(".back .three-d");

const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();
const renderer1 = new THREE.WebGLRenderer({alpha: true});
const renderer2 = new THREE.WebGLRenderer({alpha: true});
const light1 = new THREE.DirectionalLight(0xffffff, 1);
const light2 = new THREE.AmbientLight(0xffffff, 1);
const light3 = new THREE.DirectionalLight(0xffffff, 1);
const light4 = new THREE.AmbientLight(0xffffff, 1);
const camera = new THREE.PerspectiveCamera(55, frontEnd.offsetWidth / frontEnd.offsetHeight, 0.1, 1000);

camera.position.set(0,0,15);

const backEndModel = new URL("./backend.glb", import.meta.url);
const frontEndModel = new URL("./frontend.glb", import.meta.url);
const frontLoader = new GLTFLoader();
const backLoader = new GLTFLoader();

const arrchan = [];

function loadChan(g, x=0, y=0, scene) {
  
    let model = g.scene;
    scene.add(model);

    model.scale.set(3,3,3);
    model.rotation.set(1.6, 0, 0)
    model.position.set(x, y, -15);
    arrchan.push(model);
  
}
  
backLoader.load(backEndModel.href, (g) => {loadChan(g, 0, 0, scene2)});
frontLoader.load(frontEndModel.href, (g) => {loadChan(g, 0, 0, scene1)});

console.log(window.devicePixelRatio);
renderer1.setPixelRatio(window.devicePixelRatio+2);
renderer2.setPixelRatio(window.devicePixelRatio+2);
console.log(renderer1.getPixelRatio())
frontEnd.appendChild(renderer1.domElement);
renderer1.setSize(frontEnd.offsetWidth, frontEnd.offsetHeight, true);
renderer1.setClearColor(0x000000, 0);
scene2.add(camera);

backEnd.appendChild(renderer2.domElement);
renderer2.setSize(backEnd.offsetWidth, backEnd.offsetHeight, true);
renderer2.setClearColor(0x000000, 0);

scene1.add(camera);

light1.position.set(0,0,10);
light2.position.set(0,0,10);
light3.position.set(0,0,10);
light4.position.set(0,0,10);
scene1.add(light1, light2)
scene2.add(light3, light4)





function animateChan() {

    renderer1.render(scene1, camera);
    renderer2.render(scene2, camera);

    if (arrchan) {
        arrchan.forEach((e, i) => {
          e.rotation.z+=0.01; 
        })
    }

    requestAnimationFrame( animateChan );

};


animateChan();