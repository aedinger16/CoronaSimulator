import {
  BALL_RADIUS,
  COLORS,
  MORTALITY_PERCENTATGE,
  TICKS_TO_RECOVER,
  velocityGroupOne,
  velocityGroupTwo,
  RUN,
  // SPEED,
  STATES
} from './options.js'
import { checkCollision, calculateChangeDirection } from './collisions.js'
import { randomVelocity } from './randomVelocity.js'

const diameter = BALL_RADIUS * 2

export class Ball {
  constructor ({ x, y, group, speed, id, state, sketch, hasMovement }) {
    this.x = x
    this.y = y
    this.group = group;
    this.speed = speed;
    var randomVelocities = randomVelocity(speed);
    this.vx = randomVelocities[0]
    this.vy = randomVelocities[1]
    this.sketch = sketch
    this.id = id
    this.state = state
    this.timeInfected = 0
    this.hasMovement = hasMovement
    this.hasCollision = true
    this.survivor = false
  }

  checkState () {
    if (this.state === STATES.infected) {
      // Man stirbt zurzeit doppelt so schnell wie man genest
      if (RUN.filters.death && !this.survivor && this.timeInfected >= TICKS_TO_RECOVER / 2) {
        this.survivor = this.sketch.random(100) >= MORTALITY_PERCENTATGE
        if (!this.survivor) {
          this.hasMovement = false
          this.state = STATES.death
          RUN.results[STATES.infected]--
          RUN.results[STATES.death]++
          return
        }
      }

      // 64 Ticks/Durchläufe = 1 Sekunde  -----  Slider 4 Sekunden (256 Ticks) bis 10 Sekunden (640 Ticks)
      if (this.timeInfected >= TICKS_TO_RECOVER) {
        this.state = STATES.recovered
        RUN.results[STATES.infected]--
        RUN.results[STATES.recovered]++
      } else {
        this.timeInfected++
      }
    }
  }

  checkCollisions ({ others }) {
    if (this.state === STATES.death) return

    for (let i = this.id + 1; i < others.length; i++) {
      const otherBall = others[i]
      const { state, x, y } = otherBall
      if (state === STATES.death) continue

      const dx = x - this.x
      const dy = y - this.y

      if (checkCollision({ dx, dy, diameter: BALL_RADIUS * 2 })) {
        const { ax, ay } = calculateChangeDirection({ dx, dy })

        var randomVelocitiesThis;
        if (this.group === 1){
          randomVelocitiesThis = randomVelocity(velocityGroupOne);
        }
        else{
          randomVelocitiesThis = randomVelocity(velocityGroupTwo);
        }

        var randomVelocitiesOtherBall;
        if (otherBall.group === 1){
          randomVelocitiesOtherBall = randomVelocity(velocityGroupOne);
        }
        else{
          randomVelocitiesOtherBall = randomVelocity(velocityGroupTwo);
        }

        // console.log(randomVelocities)

        this.vx -= ax
        this.vy -= ay
        otherBall.vx = ax
        otherBall.vy = ay

        this.vx < 0 ? this.vx = -Math.abs(randomVelocitiesThis[0]) : this.vx = Math.abs(randomVelocitiesThis[0]);

        this.vy < 0 ? this.vy = -Math.abs(randomVelocitiesThis[1]) : this.vy = Math.abs(randomVelocitiesThis[1]);

        otherBall.vx < 0 ? otherBall.vx = -Math.abs(randomVelocitiesOtherBall[0]) : otherBall.vx = Math.abs(randomVelocitiesOtherBall[0]);

        otherBall.vy < 0 ? otherBall.vy = -Math.abs(randomVelocitiesOtherBall[1]) : otherBall.vy = Math.abs(randomVelocitiesOtherBall[1]);

        // both has same state, so nothing to do
        if (this.state === state) return
        // if any is recovered, then nothing happens
        if (this.state === STATES.recovered || state === STATES.recovered) return
        // then, if some is infected, then we make both infected
        if (this.state === STATES.infected || state === STATES.infected) {
          this.state = otherBall.state = STATES.infected
          RUN.results[STATES.infected]++
          RUN.results[STATES.well]--
        }
      }
    }
  }

  move () {
    if (!this.hasMovement) return

    this.x += this.vx
    this.y += this.vy

    // check horizontal walls
    if (
      (this.x + BALL_RADIUS > this.sketch.width && this.vx > 0) ||
      (this.x - BALL_RADIUS < 0 && this.vx < 0)) {
      this.vx *= -1
    }

    // check vertical walls
    if (
      (this.y + BALL_RADIUS > this.sketch.height && this.vy > 0) ||
      (this.y - BALL_RADIUS < 0 && this.vy < 0)) {
      this.vy *= -1
    }
  }

  render () {
    const color = COLORS[this.state]
    this.sketch.noStroke()
    this.sketch.fill(color)
    this.sketch.ellipse(this.x, this.y, diameter, diameter)
  }
}
