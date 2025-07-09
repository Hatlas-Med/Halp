import { TAMX, PROB_ENEMY_SHIP, enemyship_min, enemyship_max } from "./config.js"
import { space } from "./space.js"

class EnemyShip {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ship"
    this.element.src = "assets/png/enemyShip.png"
    this.element.style.top = "-20px"
    this.element.dataset.points = 50
    this.element.style.left = `${parseInt(Math.random() * (TAMX - 50))}px`
    this.speed = Math.random() * (enemyship_max - enemyship_min) + enemyship_min

    space.element.appendChild(this.element)
  }
  move() {
    const currentSpeed = parseFloat(this.element.style.top)
    this.element.style.top = `${currentSpeed + this.speed}px`

  }
}

const enemyShips = []

export const createRandomEnemyShip = () => {
  if (Math.random() < PROB_ENEMY_SHIP) enemyShips.push(new EnemyShip())
}

export const moveEnemyShips = () => {
  enemyShips.forEach(e => e.move())
}