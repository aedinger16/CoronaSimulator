// import of modules
import { random } from './modules/random';
import { Ball } from './modules/ball';
import { randomVelocity } from './modules/randomVelocity';

// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const screenSize = { width, height };

window.addEventListener('resize', () => {
  width = canvas.width = screenSize.width = window.innerWidth;
  height = canvas.height = screenSize.height = window.innerHeight;
});

// define array to store balls

const randomVelocitiesFirst = randomVelocity(2);   // GESCHWINDIGKEIT DES ERSTEN HIER ÄNDERN
const balls = [];

const ball = new Ball(
  random(20, width - 20),
  random(20, height - 20),
  randomVelocitiesFirst[0],
  randomVelocitiesFirst[1],
  `rgb(180,125,73)`,//`rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`, color
  5   //random(10, 20) size
);

balls.push(ball);

var amountOfPeople = 3000;

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < amountOfPeople) {

    const randomVelocities = randomVelocity(2);       // GESCHWINDIGKEIT DER ANDEREN HIER ÄNDERN
    const ball = new Ball(
      random(20, width - 20),
      random(20, height - 20),
      randomVelocities[0],
      randomVelocities[1],
      `rgb(0,0,136)`,
      5
    );
    balls.push(ball);
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw(ctx);
    balls[i].update(screenSize);
    balls[i].collisionDetect(balls);
  }

  requestAnimationFrame(loop);
}


loop();
