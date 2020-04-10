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

const buttonReset = document.getElementById('buttonReset');

// ------------------ COLOR VALUES -----------------------

const infected = `rgb(180,125,73)`;
const normal = `rgb(0,0,136)`;


// ---------------------- SETTINGS -----------------------------

var startStop = false;

var numberOfPersons = 100;

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
  sliderPercentGroupTwo.value = 100 - sliderPercentGroupOne.value;
  updateGroups();
});

sliderVelocityGroupOne.addEventListener('click', function(){
  updateVelocity("one", sliderVelocityGroupOne.value);  
});

sliderPercentGroupTwo.addEventListener('click', function(){
  sliderPercentGroupOne.value = 100 - sliderPercentGroupTwo.value;
  updateGroups();
});

sliderVelocityGroupTwo.addEventListener('click', function(){
  updateVelocity("two", sliderVelocityGroupTwo.value);
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

buttonReset.addEventListener('click', function(){
  reset();
});

// ----------------- LOOP FÜR DAS STÄNDIGE NEUZEICHNEN -------------------

var persons = [];
var addFirstPerson = true;
var updatePersons = true;
var firstRun = true;

function loop() {
  ctx.fillStyle = 'rgba(240,240,240,1)';
  ctx.fillRect(0, 0, width, height);

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

function updateGroups(){
  setGroups();

  console.log(persons);

  var velOne = sliderVelocityGroupOne.value;
  var velTwo = sliderVelocityGroupTwo.value;

  persons.forEach(person => {
    if(person.group === "one"){

      var vel = Math.round(Math.sqrt(Math.pow(person.velX, 2) + Math.pow(person.velY, 2)));

      if(vel === sliderVelocityGroupOne.value){
        
        console.log(sliderVelocityGroupOne.value);
        const randomVelocities = randomVelocity(velOne);
        person.velX = randomVelocities[0];
        person.veY = randomVelocities[1];
      }
    }

    if(person.group === "two"){

      var vel = Math.round(Math.sqrt(Math.pow(person.velX, 2) + Math.pow(person.velY, 2)));

      if(vel === sliderVelocityGroupTwo.value){
        const randomVelocities = randomVelocity(velTwo);
        person.velX = randomVelocities[0];
        person.veY = randomVelocities[1];
      }
    }
  });
}

function setGroups(group){

  var numberOfGroupOne = Math.floor(sliderPercentGroupOne.value * numberOfPersons / 100);

  for (let index = 0; index < numberOfGroupOne; index++) {
    persons[index].group = "one";    
  }

  for (let index = numberOfGroupOne; index < numberOfPersons; index++) {
    persons[index].group = "two";  
  }
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
  
      const randomVelocities = randomVelocity(velGroup);

      var newVelX = randomVelocities[0];
      var newVelY = randomVelocities[1];  

      //#region Check and set direction

      if(velXIsMinus === true){
        if(newVelX <= 0){
          person.velX = newVelX;
        }
        else{
          person.velX = -newVelX;
        }
      }
      else{
        if(newVelX <= 0){
          person.velX = Math.abs(newVelX);
        }
        else{
          person.velX = newVelX;
        }
      }

      if(velYIsMinus === true){
        if(newVelY <= 0){
          person.velY = newVelY;
        }
        else{
          person.velY = -newVelY;
        }
      }
      else{
        if(newVelY <= 0){
          person.velY = Math.abs(newVelY);
        }
        else{
          person.velY = newVelY;
        }
      }

      //#endregion

    } 
  });
}


function prepareCanvasAndPersons(){

  ctx.fillStyle = 'rgba(240,240,240,1)';
  ctx.fillRect(0, 0, width, height);
  // ctx.strokeRect(0, 0, width, height)

  var numberOfGroupOne = Math.floor(numberOfPersons * sliderPercentGroupOne.value / 100);
  var currentGroup = "one";

  while (persons.length < numberOfPersons) {

    const randomVelocities = randomVelocity(sliderVelocityGroupOne.value);
    const ball = null;

    persons.length === numberOfGroupOne ? currentGroup = "two" : "one";

    if(addFirstPerson === true){
      ball = new Ball(
        "one",
        random(20, width - 20),
        random(20, height - 20),
        randomVelocities[0],
        randomVelocities[1],
        infected,
        5
      );
      addFirstPerson = false;
    }
    else{
      ball = new Ball(
        currentGroup,
        random(20, width - 20),
        random(20, height - 20),
        randomVelocities[0],
        randomVelocities[1],
        normal,
        5
      );
    }
    
    persons.push(ball);
  }

  for (let i = 0; i < persons.length; i++) {
    persons[i].draw(ctx);
    if(updatePersons === true && firstRun === false){
      persons[i].update(screenSize);
    }
    persons[i].collisionDetect(persons);
  }

  console.log(persons);
}

function start(){
  startStop = true;
  updatePersons = true;
  buttonStartStop.textContent = "Stoppen";
  loop();
}

function stop(){
  startStop = false;
  buttonStartStop.textContent = "Starten";
  updatePersons = true;
  loop();
  updatePersons = false;
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
    prepareCanvasAndPersons();
    console.log(persons);
  }
  updatePersons = true;
}

function reset(){
  location.reload();
}

prepareCanvasAndPersons();
