// import of modules
import { random } from './modules/random.js';
import { Ball } from './modules/ball.js';
import { randomVelocity } from './modules/randomVelocity.js';

// -------------- SLIDER, BUTTON -----------------

const sliderPercentGroupOne = document.getElementById('sliderPercentOne');
const sliderVelocityGroupOne = document.getElementById('sliderVelocityOne');

const sliderPercentGroupTwo = document.getElementById('sliderPercentTwo');
const sliderVelocityGroupTwo = document.getElementById('sliderVelocityTwo');

const sliderNumberOfPersons = document.getElementById('sliderNumberOfPersons');

const sliderTimeOfRecover = document.getElementById('sliderTimeOfRecover');

const buttonStartStop = document.getElementById('buttonStartStop');

// ------------------ COLOR VALUES -----------------------

const infected = `rgb(180,125,73)`;
const normal = `rgb(0,0,136)`;


// ---------------------- SETTINGS -----------------------------

var startStop = false;

var percentGroupOne = 50;
var velocityGroupOne = 2;  

var percentGroupTwo = 50;
var velocityGroupTwo = 2; 

var numberOfPersons = 50;

var timeForRecover = 10;


// ------------------ ERSTELLEN DES CANVAS --------------------------

const canvas = document.querySelector('canvas');
const settings = document.getElementById('divSettings');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth - settings.offsetWidth;
let height = canvas.height = window.innerHeight;
const screenSize = { width, height };

window.addEventListener('resize', () => {
  width = canvas.width = screenSize.width = window.innerWidth - settings.offsetWidth;
  height = canvas.height = screenSize.height = window.innerHeight;
});


// ---------------- SLIDER CHANGES -------------------------

sliderPercentGroupOne.addEventListener('click', function(){
  percentGroupOne = sliderPercentGroupOne.value; 
  updateGroups(percentGroupOne, "one");
  sliderPercentGroupTwo.value = 100 - sliderPercentGroupOne.value;
});

sliderVelocityGroupOne.addEventListener('click', function(){
  velocityGroupOne = sliderVelocityGroupOne.value; 
});

sliderPercentGroupTwo.addEventListener('click', function(){
  percentGroupTwo = sliderPercentGroupTwo.value; 
  sliderPercentGroupOne.value = 100 - sliderPercentGroupTwo.value;
});

sliderVelocityGroupTwo.addEventListener('click', function(){
  velocityGroupTwo = sliderVelocityGroupTwo.value; 
});

sliderNumberOfPersons.addEventListener('click', function(){
  numberPersonsChanged(sliderNumberOfPersons.value);
});

// -------------- BUTTON START STOPP ---------------------

buttonStartStop.addEventListener('click', function(){
  if(buttonStartStop.textContent === "Starten"){
    start();
  }
  else{
    stop();
  }
});

// ----------------- ERSTER INFIZIERTER -------------------

var persons = [];
var addFirstPerson = true;
var updatePersons = true;
var firstRun = true;

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillRect(0, 0, width, height);

  fillPersons();
  console.log(updatePersons);
  for (let i = 0; i < persons.length; i++) {
    persons[i].draw(ctx);
    if(updatePersons === true && firstRun === false){
      persons[i].update(screenSize);
    }
    persons[i].collisionDetect(persons);
  }

  if(startStop === true){
    requestAnimationFrame(loop);
  }

  firstRun = false;
}

function updateGroups(percentGroup, group){
  
  // var percentToNumber = Math.floor(numberOfPersons * percentGroup / 100)
  // if(group === "one"){
  //   balls.forEach(x => x.velX = velo)
  // }
}

function fillPersons(){
  while (persons.length < numberOfPersons) {

    const randomVelocities = randomVelocity(2);
    const ball = null;

    if(addFirstPerson === true){
      ball = new Ball(
        random(20, width - 20),
        random(20, height - 20),
        randomVelocities[0],
        randomVelocities[1],
        infected,
        10
      );
      addFirstPerson = false;
    }
    else{
      ball = new Ball(
        random(20, width - 20),
        random(20, height - 20),
        randomVelocities[0],
        randomVelocities[1],
        normal,
        10
      );
    }
    
    persons.push(ball);
  }
}

function start(){
  startStop = true;
  buttonStartStop.textContent = "Stoppen";
  sliderNumberOfPersons.disabled = true;
  loop();
}

function stop(){
  startStop = false;
  buttonStartStop.textContent = "Starten";
  sliderNumberOfPersons.disabled = false;
  updatePersons = false;
  loop();
}

function numberPersonsChanged(newNumberOfPersons){
  updatePersons = false;
  if(newNumberOfPersons !== numberOfPersons){
    if(newNumberOfPersons < numberOfPersons){
      persons = persons.slice(0, newNumberOfPersons); 
    }
    if(newNumberOfPersons === "1"){
      persons = persons.slice(0, newNumberOfPersons);
      persons[0].color = infected;
    }
    numberOfPersons = newNumberOfPersons;
    loop();
  }
  updatePersons = true;
}

loop();
