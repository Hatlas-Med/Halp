import { space } from "./space.js"

const projectiles = []

class Projectile {
    constructor(x, y) {
        this.element = document.createElement("img")
        this.element.src = "assets/png/laserGreen.png"
        this.element.className = "projectile"
        this.element.style.position = "absolute"
        this.element.style.left = `${x}px`
        this.element.style.top = `${y}px`
        this.element.style.width = "10px"
        this.element.style.height = "20px"

        space.element.appendChild(this.element)
    }

    move() {
        const currentPos = parseFloat(this.element.style.top)
        this.element.style.top = `${currentPos - 5}px`
    }

    isOutofBounds(){
        return parseFloat(this.element.style.top) < 0
    }

    remove(){
        this.element.remove()
    }
}

function createExplosion(x, y){
    const explosion = document.createElement("img")
    explosion.src = "assets/png/laserGreenShot.png"
    explosion.className = "projectile"
    explosion.style.position = "absolute"
    explosion.style.left = `${x}px`
    explosion.style.top = `${y}px`
    explosion.style.width = "24px"
    explosion.style.height = "24px"
    explosion.style.zIndex = 10

    space.element.appendChild(explosion)

    setTimeout(() =>{
        explosion.remove()
    }, 300)
}

export function createProjectile(x,y){
    const p = new Projectile(x,y)
    projectiles.push(p)
}

export function moveProjectiles(){
    projectiles.forEach((p, index) =>{
        p.move()
        if(p.isOutofBounds()){
            p.remove()
            projectiles.splice(index, 1)
        }
    })
}

export function getProjectiles(){
    return projectiles
}

export function projectileCollision(x,y){
    createExplosion(x,y)
}