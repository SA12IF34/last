import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

let container = document.getElementById("Third");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({alpha: true});
const python = new URL("./python.glb", import.meta.url);
const html = new URL("./html.glb", import.meta.url);
const css = new URL("./css.glb", import.meta.url);
const javaScript = new URL("./javaScript.glb", import.meta.url);
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


const loader1 = new GLTFLoader();
const loader2 = new GLTFLoader();
const loader3 = new GLTFLoader();
const loader4 = new GLTFLoader();
let model1;
let model2;
let model3;
let model4;

function loadChan(g, x=0, y=0) {
  
  let model = g.scene;
  scene.add(model);
  model.scale.set(5, 5, 5);
  model.rotation.set(Math.random()+1 * 4, Math.random()+1 * 4, Math.random()+1 * 4)
  model.position.set(x, y, 0);
  arrchan.push(model)
  
}

loader1.load(python.href, (g) => {loadChan(g, -20)});

loader2.load(html.href, (g) => {loadChan(g, -5)});

loader3.load(css.href, (g) => {loadChan(g, 10)});

loader4.load(javaScript.href, (g) => {loadChan(g, 25)});

container.appendChild(renderer.domElement);

renderer.setSize(container.parentElement.offsetWidth, 500, true);
renderer.setClearColor(0x000000, 0);


const light = new THREE.PointLight(0xffffff, 1);
camera.add(light);

camera.position.set(0, 0, 35)

//new OrbitControls(camera, renderer.domElement)


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
  
  if (arrchan) {
    arrchan.forEach(e => {
      e.rotation.x+=0.01;
      e.rotation.y+=0.01;
      e.rotation.z+=0.01; 
    })
  }

  if (resized) resize();

  console.log();(renderer.getSize(new THREE.Vector2(0, 0)))

  requestAnimationFrame( render );
}

render();

