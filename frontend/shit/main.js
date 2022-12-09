import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { InteractionManager } from 'three.interactive';

let container = document.getElementById("Third");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({alpha: true});

const frontEnd = new URL("./frontend.glb", import.meta.url);
const backEnd = new URL("./backend.glb", import.meta.url);

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

// const python = new URL("./python.glb", import.meta.url);
// const html = new URL("./html.glb", import.meta.url);
// const css = new URL("./css.glb", import.meta.url);
// const javaScript = new URL("./javaScript.glb", import.meta.url);
// const react = new URL("./react.glb", import.meta.url);
// const django = new URL("./django.glb", import.meta.url);
// const drf = new URL("./drf.glb", import.meta.url);
// const postgres = new URL("./postgres.glb", import.meta.url);
// const numpy = new URL("./numpy.glb", import.meta.url);
// const pandas = new URL("./pandas.glb", import.meta.url);
// const plot = new URL("./plot.glb", import.meta.url);
// const selenium = new URL("./selenuim.glb", import.meta.url);
// const git = new URL("./git.glb", import.meta.url);
// const c = new URL("./c.glb", import.meta.url);
// const cpp = new URL("./cpp.glb", import.meta.url);

const arrchan = [];
var resized = false;

window.addEventListener('resize', function() {
  resized = true
})

// 1react, 2django, 3django restframework, 4sqlite, 5postgresql, 6three.js, 7c, 8c++, 9git&github, 10numpy, 11pandas, 12matplotlib, 13selenium

const frontLoader = new GLTFLoader();
const backLoader = new GLTFLoader();
let span = document.querySelector("#Third h2 span");



function loadChan(g, x=0, y=0, name) {
  
  let model = g.scene;
  scene.add(model);
  model.scale.set(3, 3, 3);
  model.rotation.set(1.6, 0, 0)
  model.position.set(x, y, 0);
  arrchan.push(model);

  if (name === "backend") {
    model.addEventListener("mouseover", () => {
      span.innerText = " BackEnd";
    });

    model.addEventListener("mouseleave", () => {
      span.innerText = "";
    });

    model.addEventListener("click", () => {
      window.location.assign("/skills-backend/")
    })
  } else if (name === "frontend") {
    model.addEventListener("mouseover", () => {
      span.innerText = " FrontEnd";
    });

    model.addEventListener("mouseleave", () => {
      span.innerText = "";
    });

    model.addEventListener("click", () => {
      window.location.assign("/skills-frontend/")
    });
  }

  interactionManager.add(model);
}

backLoader.load(backEnd.href, (g) => {loadChan(g, 0, -9, "backend")});
frontLoader.load(frontEnd.href, (g) => {loadChan(g, -2, 9, "frontend")});




container.appendChild(renderer.domElement);

renderer.setSize(container.parentElement.offsetWidth, 500, true);
renderer.setClearColor(0x000000, 0);


const light = new THREE.SpotLight(0xffffff, 0.8);
const light1 = new THREE.SpotLight(0xffffff, 0.8)
const light2 = new THREE.SpotLight(0xffffff, 0.8)
light1.position.set(20, 0, 35);
light1.lookAt(new THREE.Vector3(0, 0, 0));

light2.position.set(-20, 0, 35);
light2.lookAt(new THREE.Vector3(0, 0, 0));

scene.add(light1, light2)
camera.add(light);

camera.position.set(0, 0, 35)

// new OrbitControls(camera, renderer.domElement)


function resize() {
  resized = false

  // update the size
  renderer.setSize(container.parentElement.offsetWidth, 500)

  // update the camera
  const canvas = renderer.domElement
  camera.aspect = canvas.clientWidth/canvas.clientHeight
  camera.updateProjectionMatrix()
 }

function render() {

  renderer.render(scene, camera);
  interactionManager.update();

  if (arrchan) {
    arrchan.forEach((e, i) => {

      // e.rotation.x+=0.01;
      
      e.rotation.z+=0.01; 
    })
  }

  

  if (resized) resize();

  console.log();(renderer.getSize(new THREE.Vector2(0, 0)))

  requestAnimationFrame( render );
}

render();

