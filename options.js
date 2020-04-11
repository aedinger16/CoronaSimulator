const DEFAULT_FILTERS = {
  death: false,
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
export let STATIC_PEOPLE_PERCENTATGE = 25

export const resetRun = () => {

  STARTING_BALLS[STATES.well] = document.getElementById('sliderNumberOfPersons').value - 1;
  MORTALITY_PERCENTATGE = document.getElementById('sliderMortality').value;
  TICKS_TO_RECOVER = document.getElementById('sliderTimeForRecover').value;

  RUN.results = { ...STARTING_BALLS }
  RUN.tick = 0
}
