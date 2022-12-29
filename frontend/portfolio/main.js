let parent = document.getElementById("parent");
let face = document.querySelector(".one");
let faceOne = document.querySelector(".one");
let faceTwo = document.querySelector(".two");
let faceThree = document.querySelector(".three");
let faceFour = document.querySelector(".four");

let parentRotation = 0;



function maho() {
    parent.style.cssText = `transform: translateZ(${face.offsetWidth/2}px)`;
    faceOne.style.cssText = `transform: translateZ(-${face.offsetWidth/2}px)`;
    faceTwo.style.cssText = `transform: translateZ(${face.offsetWidth/2}px) rotateY(180deg)`;
    faceThree.style.cssText = `transform: rotateY(270deg) translateX(${face.offsetWidth/2}px);`;
    faceFour.style.cssText = `transform: rotateY(-270deg) translateX(-${face.offsetWidth/2}px);`;
}


maho();

window.addEventListener('resize', () => {
    maho();
})

function mouseDown(e) {
    e.target.parentElement.style.cssText = "opacity: 0.7";
}

function mouseUp(e) {
    e.target.parentElement.style.cssText = "opacity: 0.3";
}

let btnOne = document.querySelector(".btnOne");
let btnTwo = document.querySelector(".btnTwo");

btnOne.addEventListener("click", (e) => {

    parentRotation+=90;
    parent.style.cssText = `transform: translateZ(${parseInt(face.offsetWidth/2)}px) rotateY(${parentRotation}deg)`;
    
})
btnTwo.addEventListener("click", (e) => {
    parentRotation-=90;
    parent.style.cssText = `transform: translateZ(${parseInt(face.offsetWidth/2)}px) rotateY(${parentRotation}deg)`;
    
})

btnOne.addEventListener("mousedown", mouseDown);
btnTwo.addEventListener("mousedown", mouseDown);
btnOne.addEventListener("mouseup", mouseUp);
btnTwo.addEventListener("mouseup", mouseUp);
