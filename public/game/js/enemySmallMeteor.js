import { TAMX, PROB_SMALL_METEOR, smallMeteor_min, smallMeteor_max} from "./config.js"
import { space } from "./space.js"

class SmallMeteor {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ship"
    this.element.src = "assets/png/meteorSmall.png"
    this.element.style.top = "-20px"
    this.element.dataset.points = 100
    this.element.style.left = `${parseInt(Math.random() * (TAMX - 50))}px`
    this.speed = Math.random() * (smallMeteor_max - smallMeteor_min) + smallMeteor_min
    space.element.appendChild(this.element)
  }
  move() {
    const currentSpeed = parseFloat(this.element.style.top)
    this.element.style.top = `${currentSpeed + this.speed}px`

  }
}

const smallMeteors = []

export const createRandomSmallMeteor = () => {
  if (Math.random() < PROB_SMALL_METEOR) smallMeteors.push(new SmallMeteor())
}

export const moveSmallMeteor = () => {
  smallMeteors.forEach(e => e.move())
}