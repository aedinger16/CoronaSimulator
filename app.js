import {
  BALL_RADIUS,
  CANVAS_SIZE,
  DESKTOP_CANVAS_SIZE,
  STARTING_BALLS,
  RUN,
  STATIC_PEOPLE_PERCENTATGE,
  STATES,
  resetRun,
  velocityGroupOne,
  velocityGroupTwo,
  percentGroupOne,
  numberOfPersons,
  numberOfPersonsGroupOne,
  numberOfPersonsGroupTwo,
} from './options.js'

import { randomVelocity } from './randomVelocity.js'

import {
  replayButton,
  deathFilter,
  stayHomeFilter,
  sliderNumberOfPersons,
  sliderMortality,
  sliderTimeForRecover,
  sliderPercentOne,
  sliderPercentTwo,
  sliderVelocityOne,
  sliderVelocityTwo,
  lblVelocityGroupOne,
  buttonReset
} from './dom.js'

import { Ball } from './Ball.js'

import {
  resetValues,
  updateCount
} from './results.js'

let balls = []
const matchMedia = window.matchMedia('(min-width: 800px)')

let isDesktop = matchMedia.matches
document.getElementById('death-count').classList.toggle('show', RUN.filters.death)

export const canvas = new window.p5(sketch => { // eslint-disable-line
    const startBalls = () => {
    let id = 0
    balls = []

    var infected_group_one = Math.random() >= 0.5;
    console.log(numberOfPersonsGroupOne + "   " + numberOfPersonsGroupTwo)
    Object.keys(STARTING_BALLS).forEach(state => {
      
      if(state === "well"){
        
        Array.from({ length: infected_group_one === true ? numberOfPersonsGroupOne - 1 : numberOfPersonsGroupOne}, () => {

          const hasMovement = RUN.filters.stayHome
            ? sketch.random(0, numberOfPersonsGroupOne) < STATIC_PEOPLE_PERCENTATGE / 2 || state === STATES.infected
            : true
  
          balls[id] = new Ball({
            id,
            sketch,
            state,
            hasMovement,
            x: sketch.random(BALL_RADIUS, sketch.width - BALL_RADIUS),
            y: sketch.random(BALL_RADIUS, sketch.height - BALL_RADIUS),
            speed: velocityGroupOne,
            group: 1
          })
          id++
        })

        // Erster Infizierter immer an erster Stelle
        Array.from({ length: infected_group_one === false ? numberOfPersonsGroupTwo - 1 : numberOfPersonsGroupTwo}, () => {

          const hasMovement = RUN.filters.stayHome
            ? sketch.random(0, numberOfPersonsGroupTwo) < STATIC_PEOPLE_PERCENTATGE / 2 || state === STATES.infected
            : true
  
          balls[id] = new Ball({
            id,
            sketch,
            state,
            hasMovement,
            x: sketch.random(BALL_RADIUS, sketch.width - BALL_RADIUS),
            y: sketch.random(BALL_RADIUS, sketch.height - BALL_RADIUS),
            speed: velocityGroupTwo,
            group: 2
          })
          id++
        })
      }
      else{
      Array.from({ length: STARTING_BALLS[state] }, () => {

        const hasMovement = RUN.filters.stayHome
          ? sketch.random(0, sliderNumberOfPersons.value) < sliderPercentOne.value || state === STATES.infected
          : true

        balls[id] = new Ball({
          id,
          sketch,
          state,
          hasMovement,
          x: sketch.random(BALL_RADIUS, sketch.width - BALL_RADIUS),
          y: sketch.random(BALL_RADIUS, sketch.height - BALL_RADIUS),
          speed: infected_group_one === true ? velocityGroupOne : velocityGroupTwo,
          group: infected_group_one === true ? 1 : 2
        })
        id++
      })
    }
    })

    console.log(balls)
  }

  const createCanvas = () => {
    const { height, width } = isDesktop
      ? DESKTOP_CANVAS_SIZE
      : CANVAS_SIZE

    sketch.createCanvas(width, height)
  }

  sketch.setup = () => {
    createCanvas()
    startBalls()

    matchMedia.addListener(e => {
      isDesktop = e.matches
      createCanvas()
      resetValues()
      startBalls()
    })

    replayButton.onclick = () => {
      resetValues()
      startBalls()
    }

    deathFilter.onclick = () => {
      RUN.filters.death = !RUN.filters.death
      resetValues()
      startBalls()
      document.getElementById('death-count').classList.toggle('show', RUN.filters.death)
    }

    stayHomeFilter.onchange = () => {
      RUN.filters.stayHome = !RUN.filters.stayHome
      resetValues()
      startBalls()
    }

    sliderNumberOfPersons.onchange = () => {
      document.getElementById('lblNumberOfPersons').textContent = sliderNumberOfPersons.value;
    }

    sliderTimeForRecover.onchange = () => {
      document.getElementById('lblTimeForRecover').textContent = Math.floor(sliderTimeForRecover.value / 64) + " Sek";
    }

    sliderMortality.onchange = () => {
      document.getElementById('lblMortality').textContent = sliderMortality.value + "%";
    }

    sliderPercentOne.onchange = () => {
      sliderPercentTwo.value = 100 - sliderPercentOne.value; 
      document.getElementById('lblPercentGroupOne').textContent = sliderPercentOne.value + "%";
      document.getElementById('lblPercentGroupTwo').textContent = sliderPercentTwo.value + "%";
    }

    sliderPercentTwo.onchange = () => {
      sliderPercentOne.value = 100 - sliderPercentTwo.value; 
      document.getElementById('lblPercentGroupTwo').textContent = sliderPercentTwo.value + "%";
      document.getElementById('lblPercentGroupOne').textContent = sliderPercentOne.value + "%";

    }

    sliderVelocityOne.onchange = () => {
      lblVelocityGroupOne.textContent = sliderVelocityOne.value
    }

    buttonReset.onclick = () => {
      resetValues();
      startBalls();
    }
  }

  sketch.draw = () => {
    sketch.background('white')
    balls.forEach(ball => {
      ball.checkState()
      ball.checkCollisions({ others: balls })
      ball.move()
      ball.render()
    })
    updateCount()
  }
  
}, document.getElementById('canvas'))
