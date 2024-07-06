//Canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//Ball
const ballRadius = 10;
//Paddle
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2
let dy = -2

//Controls
let rightPressed = false;
let leftPressed = false;


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;

    movePlayer();
}

function movePlayer() {
    if (rightPressed) {
        paddleX += 7;
    } else if (leftPressed) {
        paddleX -= 7;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#3300AA";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    if (y + dy < 0 || y + dy > canvas.height) {
        dy = -dy;
    }
    if (x + dx < 0 || x + dx > canvas.width) {
        dx = -dx;
    }
}

function startGame() { 
    setInterval(draw, 10);
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "LeftArrow") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

document.getElementById("runButton").addEventListener("click", function () {
    startGame();
    this.disabled = true;
});

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);