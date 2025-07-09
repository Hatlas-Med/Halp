import { FPS } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { createRandomEnemyShip, moveEnemyShips } from "./enemyShip.js"
import { createRandomEnemyUFO, moveEnemyUFOs } from "./enemyUFO.js"
import { createRandomBigMeteor, moveBigMeteor } from "./enemyBigMeteor.js"
import { createRandomSmallMeteor, moveSmallMeteor } from "./enemySmallMeteor.js"
import { createHUD, resetHUD, addPoints, loseLife } from "./hud.js"
import { createProjectile, moveProjectiles, getProjectiles, projectileCollision } from "./projectile.js"

let isRun = false
let isPause = false


function startGame(){
  if(!isRun){
    isRun = true
    isPause = false
  }
}

function pauseGame(){
  if(isPause){
    isPause = false
    
  }else{
    isPause = true
  }
}

function init() {
  setInterval(run, 1000 / FPS)
  setInterval(() => {
    if(isRun){
      import("./config.js").then(config => {
        config.enemyship_min += 1
        config.enemyship_max += 1

        config.enemyUFO_min += 0.5
        config.enemyUFO_max += 0.5

        config.smallMeteor_min += 5
        config.smallMeteor_max += 5

        config.bigMeteor_min += 2
        config.bigMeteor_max += 2
    })
  }
  }, 60000)
  createHUD()
  resetHUD()
}

function checkCollisions(){
  const shipBox = ship.element.getBoundingClientRect()

  document.querySelectorAll(".enemy-ship").forEach(enemy => {
    const enemyBox = enemy.getBoundingClientRect()

    const collision = !(
      shipBox.right < enemyBox.left ||
      shipBox.left > enemyBox.right ||
      shipBox.bottom < enemyBox.top ||
      shipBox.top > enemyBox.bottom
    )

    if(collision){
      ship.takeDamage()
    }
  })
}

export function resetGame(){
  document.querySelectorAll(".enemy-ship").forEach(e => e.remove())

  ship.reset()

  import("./hud.js").then(hud => {
    hud.createHUD()
  })

  isRun = false
  startGame()
}

function checkProjectileCollision(){
  const projectiles = getProjectiles()
  const enemies = document.querySelectorAll(".enemy-ship")

  projectiles.forEach((proj, projIndex) =>{
    const projRect = proj.element.getBoundingClientRect()

    enemies.forEach(enemy => {
      const enemyRect = enemy.getBoundingClientRect()

      const collision = !(
        projRect.right < enemyRect.left ||
        projRect.left > enemyRect.right ||
        projRect.bottom < enemyRect.top ||
        projRect.top > enemyRect.bottom
      )

      if(collision){
        const projX = parseFloat(proj.element.style.left)
        const projY = parseFloat(proj.element.style.top)
        const points = parseInt(enemy.dataset.points) || 0

        projectileCollision(projX, projY)
        enemy.remove()
        proj.remove()
        projectiles.splice(projIndex, 1)
        addPoints(points)
      }

    })
  })
}

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") ship.changeDirection(-1)
  if (e.code === "ArrowRight") ship.changeDirection(+1)

  if (e.code === "Space"){
    if(!isRun){
      startGame()
    }else{
      const shipX = parseFloat(ship.element.style.left) + ship.element.width/ 2 - 5
      const shipY = parseFloat(ship.element.getBoundingClientRect().top) - space.element.getBoundingClientRect().top

      createProjectile(shipX, shipY)
    }
  }

  if (e.key === "p" || e.key === "P") pauseGame()    
})



function run() {
  if(!isRun || isPause) return
  space.move()
  ship.move()
  createRandomEnemyShip()
  createRandomEnemyUFO()
  createRandomBigMeteor()
  createRandomSmallMeteor()
  moveEnemyShips()
  moveEnemyUFOs()
  moveBigMeteor()
  moveSmallMeteor()
  moveProjectiles()
  checkCollisions()
  checkProjectileCollision()
}

init()