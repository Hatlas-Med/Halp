import { TAMX } from "./config.js"
import { space } from "./space.js"
import { loseLife } from "./hud.js"



class Ship {
  constructor() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.damaged = false
    this.life = 3
    this.directions = [
     "assets/png/playerLeft.png",
    "assets/png/player.png",
    "assets/png/playerRight.png",
  ]
    this.element.src = this.directions[this.direction]
    this.element.style.bottom = "20px"
    this.element.style.left = `${TAMX / 2 - 50}px`
    space.element.appendChild(this.element)
  }
  changeDirection(giro) { // -1 +1
    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction = this.direction + giro
    if(!this.damaged){
      this.element.src = this.directions[this.direction]
    }
    
  }
  move() {
    const left = parseInt(this.element.style.left)
    const shipWidth = this.element.width || 100
    const maxLeft = TAMX - shipWidth

    if (this.direction === 0 && left > 0) this.element.style.left = `${parseInt(this.element.style.left) - 1}px`
    if (this.direction === 2 && left < maxLeft) this.element.style.left = `${parseInt(this.element.style.left) + 1}px`


  }

  takeDamage(){
    if(this.damaged) return

    this.damaged = true
    loseLife()
    this.element.src = "assets/png/playerDamaged.png"

    setTimeout(() => {
      this.damaged = false
      this.element.src = this.directions[this.direction]
    }, 5000)
  }

  reset() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.damaged = false
    this.life = 3

    this.element.src = this.directions[this.direction]
    this.element.style.bottom = "20px"
    this.element.style.left = `${TAMX / 2 - 50}px`
    this.element.style.position = "absolute"

    space.element.appendChild(this.element)
  }
}



export const ship = new Ship()