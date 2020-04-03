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
  updateGroups(percentGroupOne);
  sliderPercentGroupTwo.value = 100 - sliderPercentGroupOne.value;
  reset();
});

sliderVelocityGroupOne.addEventListener('click', function(){
  velocityGroupOne = sliderVelocityGroupOne.value; 
  updateVelocity("one", velocityGroupOne);
  reset();
  
});

sliderPercentGroupTwo.addEventListener('click', function(){
  
  percentGroupTwo = sliderPercentGroupTwo.value; 
  updateGroups(percentGroupTwo);
  sliderPercentGroupOne.value = 100 - sliderPercentGroupTwo.value;
  reset();
});

sliderVelocityGroupTwo.addEventListener('click', function(){
  velocityGroupTwo = sliderVelocityGroupTwo.value; 
  updateVelocity("two", velocityGroupTwo);
  reset();
});

sliderNumberOfPersons.addEventListener('click', function(){
  numberPersonsChanged(sliderNumberOfPersons.value);
  reset();
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

// ----------------- LOOP FÜR DAS STÄNDIGE NEUZEICHNEN -------------------

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

function updateGroups(percentGroup){
  setGroups();

  var velOne = velocityGroupOne;
  var velTwo = velocityGroupTwo;
  var velX = 0;
  var velY = 0;

  persons.forEach(person => {
    if (person.group === "one") {
     
      velX = person.velX;
      velY = person.velY;
  
      var multiplier = Math.pow(velOne, 2) / (Math.pow(velX, 2) + Math.pow(velY, 2));
  
      person.velX = Math.pow(velX, 2) * multiplier;
      person.velY = Math.pow(velY, 2) * multiplier;
        
    } 
    else if(person.group === "two"){
     
      velX = person.velX;
      velY = person.velY;

      var velXIsMinus = false;
      var velYIsMinus = false;

      if(velX < 0){
        velXIsMinus = true;
      }
      if(velY < 0){
        velYIsMinus = true;
      }
  
      var multiplier = Math.pow(velTwo, 2) / (Math.pow(velX, 2) + Math.pow(velY, 2));
  
      velXIsMinus ? person.velX = -(Math.pow(velX, 2) * multiplier) : person.velX = (Math.pow(velX, 2) * multiplier);
      velYIsMinus ? person.velY = -(Math.pow(velY, 2) * multiplier) : person.velY = (Math.pow(velY, 2) * multiplier); 
       
    }
  });

  

  
}

function updateVelocity(group, velGroup){

  var velX = 0;
  var velY = 0;

  persons.forEach(person => {
    if (person.group === group) {
     
      velX = person.velX;
      velY = person.velY;

      var velXIsMinus = false;
      var velYIsMinus = false;

      if(velX < 0){
        velXIsMinus = true;
      }
      if(velY < 0){
        velYIsMinus = true;
      }
  
      var multiplier = Math.pow(velGroup, 2) / (Math.pow(velX, 2) + Math.pow(velY, 2));
  


      velXIsMinus ? person.velX = -(Math.pow(velX, 2) * multiplier) : person.velX = (Math.pow(velX, 2) * multiplier);
      velYIsMinus ? person.velY = -(Math.pow(velY, 2) * multiplier) : person.velY = (Math.pow(velY, 2) * multiplier); 
        
    } 
  });

  
}

function fillPersons(){
  var numberOfGroupOne = Math.floor(sliderNumberOfPersons.value * sliderPercentGroupOne.value / 100);

  while (persons.length < numberOfGroupOne) {

    const randomVelocities = randomVelocity(sliderVelocityGroupOne.value);
    const ball = null;

    if(addFirstPerson === true){
      ball = new Ball(
        "one",
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
        "one",
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

  while (persons.length < numberOfPersons) {

    const randomVelocities = randomVelocity(sliderVelocityGroupTwo.value);
    const ball = null;

    
      ball = new Ball(
        "two",
        random(20, width - 20),
        random(20, height - 20),
        randomVelocities[0],
        randomVelocities[1],
        normal,
        10
      );
    
    
    persons.push(ball);
  }

  //setGroups();
  console.log(persons);

}

function setGroups(){
  var numberOfGroupOne = Math.floor(numberOfPersons * percentGroupOne / 100);
  var numberOfGroupTwo = numberOfPersons - numberOfGroupOne;

  for (let index = 0; index < numberOfGroupOne; index++) {
    persons[index].group = "one";    
  }

  for (let index = numberOfGroupOne; index < numberOfPersons; index++) {
    persons[index].group = "two";    
  }
}

function start(){
  startStop = true;
  updatePersons = true;
  buttonStartStop.textContent = "Stoppen";
  sliderNumberOfPersons.disabled = true;
  persons = [];
  addFirstPerson = true;
  fillPersons();
  loop();
}

function stop(){
  startStop = false;
  buttonStartStop.textContent = "Starten";
  sliderNumberOfPersons.disabled = false;
  updatePersons = false;
  loop();
}
function reset(){
  startStop = false;
  buttonStartStop.textContent = "Starten";
  sliderNumberOfPersons.disabled = false;
  updatePersons = false;
    
  persons = [];
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillRect(0, 0, width, height);

  //loop();
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
setGroups();
