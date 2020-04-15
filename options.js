const DEFAULT_FILTERS = {
  death: true,
  stayHome: false
}

export const CANVAS_SIZE = {
  height: 880,
  width: 360
}

export const DESKTOP_CANVAS_SIZE = {
  height: 400,
  width: 800
}

export const BALL_RADIUS = 5
export const COLORS = {
  death: '#000000',
  recovered: '#D02090',
  infected: '#8B4513',
  well: '#1E90FF'
}

export const STATES = {
  infected: 'infected',
  well: 'well',
  recovered: 'recovered',
  death: 'death'
}

export const COUNTERS = {
  ...STATES,
  'max-concurrent-infected': 'max-concurrent-infected'
}

export let STARTING_BALLS = {
  [STATES.infected]: 1,
  [STATES.well]: document.getElementById('sliderNumberOfPersons').value - 1,
  [STATES.recovered]: 0,
  [STATES.death]: 0,
  'max-concurrent-infected': 0
}

export const RUN = {
  filters: { ...DEFAULT_FILTERS },
  results: { ...STARTING_BALLS },
  tick: 0
}

export var MORTALITY_PERCENTATGE = 5
export const SPEED = 1
export const TOTAL_TICKS = 5000
export var TICKS_TO_RECOVER = 256
export var STATIC_PEOPLE_PERCENTATGE = 25

export var numberOfPersons = 100;

export var percentGroupOne = 50;
export var numberOfPersonsGroupOne = 50;

export var percentGroupTwo = 50;
export var numberOfPersonsGroupTwo = 50;

export var velocityGroupOne = 1;
export var velocityGroupTwo = 1;

export const resetRun = () => {

  STARTING_BALLS[STATES.well] = document.getElementById('sliderNumberOfPersons').value - 1;

  numberOfPersons = document.getElementById('sliderNumberOfPersons').value

  percentGroupOne = document.getElementById('sliderPercentOne').value
  percentGroupTwo = document.getElementById('sliderPercentTwo').value
  
  numberOfPersonsGroupOne = numberOfPersons * percentGroupOne / 100;
  numberOfPersonsGroupTwo = numberOfPersons - numberOfPersonsGroupOne;

  velocityGroupOne = document.getElementById('sliderVelocityOne').value;
  velocityGroupTwo = document.getElementById('sliderVelocityTwo').value;

  MORTALITY_PERCENTATGE = document.getElementById('sliderMortality').value;
  TICKS_TO_RECOVER = document.getElementById('sliderTimeForRecover').value;

  RUN.results = { ...STARTING_BALLS }
  RUN.tick = 0
}
