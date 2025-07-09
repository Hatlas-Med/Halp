import { TAMX, PROB_ENEMY_UFO, enemyUFO_min, enemyUFO_max } from "./config.js"
import { space } from "./space.js"

class EnemyUFO {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ship"
    this.element.src = "assets/png/enemyUFO.png"
    this.element.style.top = "-20px"
    this.element.dataset.points = 20
    this.element.style.left = `${parseInt(Math.random() * (TAMX - 50))}px`
    this.speed = Math.random() * (enemyUFO_max - enemyUFO_min) + enemyUFO_min
    space.element.appendChild(this.element)
  }
  move() {
    const currentSpeed = parseFloat(this.element.style.top)
    this.element.style.top = `${currentSpeed + this.speed}px`

  }
}

const enemyUFOs = []

export const createRandomEnemyUFO = () => {
  if (Math.random() < PROB_ENEMY_UFO) enemyUFOs.push(new EnemyUFO())
}

export const moveEnemyUFOs = () => {
  enemyUFOs.forEach(e => e.move())
}