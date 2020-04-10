// import of modules

import { randomVelocity } from "../modules/randomVelocity.js";

// define Ball constructor
export class Ball {
  
  constructor(group, x, y, velX, velY, color, size) {
    this.group = group;
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  // define ball draw method
  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fill();
  }

  // define ball update method
  update(screenSize) {
    if ((this.x + this.size) >= screenSize.width) {
      if (this.velX > 0) {
        this.velX = -(this.velX);
      }
      // this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= screenSize.height) {
      if (this.velY > 0) {
        this.velY = -(this.velY);
      }
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX / 15;
    this.y += this.velY / 15;
  }

  // define ball collision detection
  collisionDetect(balls) {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;

        const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

        if (distance < this.size + balls[j].size) {
          if(this.color === `rgb(180,125,73)` || balls[j].color === `rgb(180,125,73)`)
          {
            balls[j].color = this.color = `rgb(180,125,73)`;
          }

          this.changeDirection(this);
        }
      }
    }
  }

  changeDirection(personOne){

    if(personOne.velX < 0){
      personOne.velX = Math.abs(personOne.velX);

      if(personOne.velY < 0){
        personOne.velY = Math.abs(personOne.velY);
      }
      else{
        personOne.velY = -personOne.velY;
      }
    }
    else if(personOne.velX > 0){
      personOne.velX = -personOne.velX;

      if(personOne.velY > 0){
        personOne.velY = -personOne.velY;
      }
      else{
        personOne.velY = Math.abs(personOne.velY);
      }
    }
    else if(personOne.velX === 0){
      var randomVelocities = randomVelocity(Math.round(Math.sqrt(Math.pow(personOne.velX, 2) + Math.pow(personOne.velY, 2))))

      personOne.velX = randomVelocities[0];
      personOne.velY = randomVelocities[1];

    }
    else if(personOne.velY === 0){
      var randomVelocities = randomVelocity(Math.round(Math.sqrt(Math.pow(personOne.velX, 2) + Math.pow(personOne.velY, 2))))

      personOne.velX = randomVelocities[0];
      personOne.velY = randomVelocities[1];

    }
  }
}
