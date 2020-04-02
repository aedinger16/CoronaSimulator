// import of modules
import { random } from './random';

// define Ball constructor
export class Ball {
  constructor(x, y, velX, velY, v, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.v = v;
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

    if(Math.pow(this.velX, 2)  + Math.pow(this.velY, 2) == Math.pow(this.v, 2)){
      this.x += this.velX;
      this.y += this.velY;
    }

    while(Math.round(Math.pow(this.velX, 2))  + Math.round(Math.pow(this.velY, 2)) > Math.round(Math.pow(this.v, 2))){
      this.velY -0.1;
      this.velX -0.1;
      console.log(Math.round(Math.pow(this.velX, 2))  + Math.round(Math.pow(this.velY, 2)));
    }

    while(Math.round(Math.pow(this.velX, 2))  + Math.round(Math.pow(this.velY, 2)) < Math.round(Math.pow(this.v, 2))){
      this.velY +0.1;
      this.velX +0.1;
      console.log(Math.round(Math.pow(this.velX, 2))  + Math.round(Math.pow(this.velY, 2)));
    }

    this.x += this.velX;
    this.y += this.velY;
    
  }

  // define ball collision detection

  //`rgb(180,125,73)` ==> infiziert
  //`rgb(0,0,136)` ==> nicht infiziert
  //`rgb(255,0,255)` ==> geheilt
  //`rgb(255,255,255)` ==> tot

  collisionDetect(balls) {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          if(this.color === `rgb(180,125,73)` || balls[j].color === `rgb(180,125,73)`)
          balls[j].color = this.color = `rgb(180,125,73)`;
          
        }
      }
    }
  }
}
