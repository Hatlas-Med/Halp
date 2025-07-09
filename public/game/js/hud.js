import { resetGame } from "./game.js";
let score = 0;
let life = 3;

export function createHUD(){
    const hud = document.createElement('div')
    hud.id = 'hud'

    const scoreSpan = document.createElement('span')
    scoreSpan.id = 'score'
    hud.appendChild(scoreSpan)

    const lives = document.createElement('div')
    lives.id = 'life'
    hud.appendChild(lives)

    document.body.appendChild(hud)

    updateHUD()
}

export function updateHUD(){
    const scoreSpan = document.getElementById('score')
    if(scoreSpan){
        scoreSpan.textContent = `Pontuação: ${score.toString().padStart(5, '0')}`
    }

    const lives = document.getElementById('life')
    if(lives){
        lives.innerHTML = ''
        for(let i = 0; i < life; i++){
            const img = document.createElement('img')
            img.src = "assets/png/life.png"
            img.alt = 'Vida'
            lives.appendChild(img)
        }
    }
}

export function resetHUD(){
    score = 0
    life = 3
    updateHUD()
}

export function addPoints(points){
    score += points
    updateHUD()
}

export function loseLife(){
    life -= 1
    updateHUD()
    if(life < 0){
        gameOver()
    }
}

export function gameOver(){
    const mensagem = document.createElement("div")
    mensagem.id = "game-over"
    mensagem.textContent = "GAME OVER"
    document.body.appendChild(mensagem)

    const shipElement = document.getElementById("ship")
    if(shipElement){
        shipElement.remove()
    }
    createRestartButton()
}

function createRestartButton(){
    const button = document.createElement("button")
    button.id = "botao-restart"
    button.textContent = "RESTART"
    button.onclick = () => {
        score = 0
        life = 3
        document.getElementById("game-over")?.remove()
        document.getElementById("botao-restart")?.remove()
        resetGame()
    }
    document.body.appendChild(button)
}