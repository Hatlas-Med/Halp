import { TAMX, PROB_BIG_METEOR, bigMeteor_min, bigMeteor_max} from "./config.js"
import { space } from "./space.js"

class BigMeteor {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ship"
    this.element.src = "assets/png/meteorBig.png"
    this.element.style.top = "-20px"
    this.element.dataset.points = 10
    this.element.style.left = `${parseInt(Math.random() * (TAMX - 50))}px`
    this.speed = Math.random() * (bigMeteor_max - bigMeteor_min) + bigMeteor_min
    space.element.appendChild(this.element)
  }
  move() {
    const currentSpeed = parseFloat(this.element.style.top)
    this.element.style.top = `${currentSpeed + this.speed}px`

  }
}

const bigMeteors = []

export const createRandomBigMeteor = () => {
  if (Math.random() < PROB_BIG_METEOR) bigMeteors.push(new BigMeteor())
}

export const moveBigMeteor = () => {
  bigMeteors.forEach(e => e.move())
}