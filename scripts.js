const canvasElement = document.querySelector('#canvas')
const ctx = canvasElement.getContext('2d')
let WIDTH = window.innerWidth
let HEIGHT = window.innerHeight

const walls = []

ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

window.onresize = () => {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight

    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight
}

window.addEventListener('click', (e) => {
    drawLine(e.clientX, 0, false)
})

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()

    drawLine(0, e.clientY, true)
})

const clearCanvas = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
}

const drawLine = (x, y, isRightClick) => {
    walls.push(new Wall(x, y, isRightClick))
}

class Wall {
    constructor(x, y, isRightClick) {
        this.x = x
        this.y = y
        this.isRightClick = isRightClick

        // this.draw()
    }

    draw() {
        if(this.isRightClick) {
            ctx.fillStyle = 'black'
            ctx.fillRect(0, this.y, WIDTH, 20)
        } else {
            ctx.fillStyle = 'black'
            ctx.fillRect(this.x, 0, 20, HEIGHT)
        }
    }
}

class Ball {
    constructor(posX = WIDTH/2, posY = HEIGHT/2, radius = 20) {
        this.posX = posX
        this.posY = posY
        this.radius = radius

        this.speedX = 10
        this.speedY = 10
    }

    draw() {
        ctx.fillStyle = 'darkviolet'

        ctx.beginPath()
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()
    }

    move() {
        this.posX += this.speedX
        this.posY += this.speedY

        this.checkWalls()
    }

    checkWalls() {
        if(this.posX >= WIDTH-this.radius/2 || this.posX <= this.radius/2) {
            this.speedX *= -1
        } else if(this.posY >= HEIGHT-this.radius/2 || this.posY <= this.radius/2) {
            this.speedY *= -1
        }

        walls.forEach(wall => {
            if(this.speedX > 0 && this.posX < wall.x + 20) {
                if(this.posX + this.radius >= wall.x) {
                    this.speedX = -10
                }
            } else if(this.speedX < 0 && this.posX > wall.x) {
                if(this.posX - this.radius <= wall.x + 20) {
                    this.speedX = 10
                }
            }

            if(this.speedY > 0 && this.posY < wall.y + 20) {
                if(this.posY + this.radius >= wall.y) {
                    this.speedY = -10
                }
            } else if(this.speedY < 0 && this.posY > wall.y) {
                if(this.posY - this.radius <= wall.y + 20) {
                    this.speedY = 10
                }
            }

            // if(this.speedX > 0 && this.posX + this.radius >= wall.x) {
            //     this.speedX = -10
            // }
            // else if(this.speedX < 0 && this.posX <= wall.x + 20 + this.radius/2) {
            //     this.speedX = 10
            // }
        })
    }
}

const b = new Ball()
// b.spawn()
ctx.fillStyle = 'black'


// ctx.fillRect(200, 200, 100, 100)

const loop = () => {
    clearCanvas()
    b.draw()
    b.move(1, 1)
    requestAnimationFrame(loop)

    walls.forEach(wall => {
        wall.draw()
    })
}
loop()