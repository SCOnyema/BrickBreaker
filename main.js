const gameContainer = document.getElementById("game-container");
const playerCraft = document.getElementById("player-craft");
const ball = document.getElementById("ball");

let ballLeft = 400;
let ballTop = 300;
let ballSpeedX = 5;
let ballSpeedY = -5;
let playerCraftLeft = 350;


let score = 0;
const scoreDiv = document.getElementById("score");
scoreDiv.innerHTML = `Score: ${score}`;

gameContainer.addEventListener("mousemove", (event) => {
    playerCraftLeft = event.clientX - 50;
    playerCraft.style.left = `${playerCraftLeft}px`;
});

const bricks = [];
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 13; j++) {
        const brick = document.createElement("div");
        brick.classList.add("brick");
        brick.style.left = `${10 + j * 60}px`;
        brick.style.top = `${10 + i * 30}px`;
        gameContainer.appendChild(brick);
        bricks.push(brick);
    }
}

let intervalId = setInterval(update, 10);

function update() {
    ballLeft += ballSpeedX;
    ballTop += ballSpeedY;
    ball.style.left = `${ballLeft}px`;
    ball.style.top = `${ballTop}px`;

    // Check if ball hits player craft
    if (ballTop + 20 >= 580 && ballLeft >= playerCraftLeft && ballLeft <= playerCraftLeft + 100) {
        ballSpeedY = -ballSpeedY;
    }

    // Check if ball hits bricks
    for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        const brickLeft = parseInt(brick.style.left);
        const brickTop = parseInt(brick.style.top);

        if (ballLeft + 20 > brickLeft && ballLeft < brickLeft + 50 && ballTop + 20 > brickTop && ballTop < brickTop + 20) {
            brick.remove();
            bricks.splice(i, 1);
            ballSpeedY = -ballSpeedY;
            score += 10;
            scoreDiv.innerHTML = `Score: ${score}`;
            break;
        }
    }

    // Check if ball hits left or right wall
    if (ballLeft + 20 >= 780 || ballLeft <= 0) {
        ballSpeedX = -ballSpeedX;
    }

// Check if ball hits top or bottom wall
    if (ballTop <= 0 || ballTop + 20 >= 600) {
        clearInterval(intervalId);
        ball.remove();


        if (ballTop + 20 >= 600) {
            alert("You lose!");
        } else if (bricks.length === 0) {
            alert("You win!");
        }
    }


}


//...



