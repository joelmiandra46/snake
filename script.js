const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{x: 8 * box, y: 8 * box}];
let direction = "RIGHT";
let food = {
    x: Math.floor((Math.random() * canvasSize) / box) * box,
    y: Math.floor((Math.random() * canvasSize) / box) * box
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if(event.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
    else if(event.keyCode == 38 && direction != "DOWN") direction = "UP";
    else if(event.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
    else if(event.keyCode == 40 && direction != "UP") direction = "DOWN";
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "LEFT") snakeX -= box;
    if(direction == "UP") snakeY -= box;
    if(direction == "RIGHT") snakeX += box;
    if(direction == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor((Math.random() * canvasSize) / box) * box,
            y: Math.floor((Math.random() * canvasSize) / box) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if(snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over");
        document.getElementById("retryButton").style.display = "block";
    } else {
        snake.unshift(newHead);
    }
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function retryGame() {
    snake = [{x: 8 * box, y: 8 * box}];
    direction = "RIGHT";
    food = {
        x: Math.floor((Math.random() * canvasSize) / box) * box,
        y: Math.floor((Math.random() * canvasSize) / box) * box
    };
    document.getElementById("retryButton").style.display = "none";
    game = setInterval(draw, 100);
}

let game = setInterval(draw, 100);