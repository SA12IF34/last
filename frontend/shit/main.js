import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { InteractionManager } from 'three.interactive';


let container = document.querySelector("#Third .three-d");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, container.offsetWidth / container.offsetHeight, 0.1, 1000);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({alpha: true});

renderer.setSize(container.offsetWidth, container.offsetHeight, true)

const arrow = new URL("./arrow.glb", import.meta.url);
let arr = []

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);
 

camera.position.set(0, 0, 15);


const arrowLoader = new GLTFLoader();

arrowLoader.load(arrow.href, (g) => {
  let model = g.scene;
  model.castShadow = true;
  model.receiveShadow = true;
  model.scale.set(2, 2, 2);
  model.rotateY(-1.6);
  scene.add(model);
  arr.push(model)
  model.addEventListener("mouseover", () => {
    document.body.style.cursor = "pointer"; 
    console.log("hello"); 
  })
  model.addEventListener("mouseleave", () => {
    document.body.style.cursor = "auto";  
  })
  model.addEventListener("click", () => {
    window.location.assign("/portfolio/");  
  })
  interactionManager.add(model);

})

container.appendChild(renderer.domElement);



const hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.8 ); 
const dirLight = new THREE.DirectionalLight(0xffffff, 2);

dirLight.position.set(0, 5, 10);
dirLight.lookAt(new THREE.Vector3(0, 0, 0));
dirLight.castShadow = true;
scene.add(dirLight);

hemiLight.position.set(0, 10, 0);
hemiLight.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(hemiLight);

arr.forEach(e => {
  
})


function render() {

  renderer.render(scene, camera);
  interactionManager.update();

  arr.forEach(e => {
    e.rotation.z -= 0.03;
  })

  requestAnimationFrame( render );
}

render();

