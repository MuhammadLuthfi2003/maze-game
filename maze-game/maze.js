// functionalities
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext('2d');
const resetBtn = document.querySelector("#resetBtn");

// width and height od the board
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

// colors
const boardBg = '#88ff67';
const wallColor = '#2d841f';
const playerColor = '#fe1717';
const playerStroke = '#343639';
const finishColor = '#3767ff';

// game movements and technical stuff
const unitSize = 10;
let speedX = 1;
let speedY = 1;
let intervalID;
let running;

// objects
let player = {
    x : 10,
    y : 10,
    width : unitSize,
    height : unitSize
}

const finish = {
    x : gameWidth - unitSize * 4,
    y : gameHeight - unitSize * 4,
    width : 40,
    height : 40
}

const walls = [
    // x, y, width, height
    // standard { x : 0, y : 0, width : 10, height : 10},
    { x : 50, y : 0, width : 10, height : 90},
    { x : 0, y : 80, width : 30, height : 10},
    { x : 90, y : 30, width : 10, height :  100},
    { x : 0, y : 120, width : 110, height : 10},
    { x : 100, y : 50, width : 80, height : 10},
    { x : 140, y : 0, width : 10, height : 30},
    { x : 200, y : 20, width : 10, height : 80},
    { x : 140, y : 90, width : 70, height : 10},
    { x : 210, y : 50, width : 50, height : 10},
    { x : 260, y : 0, width : 10, height : 150},
    { x : 170, y : 150, width : 140, height : 10},
    { x : 40, y : 200, width : 180, height : 10},
    { x : 70, y : 160, width : 10, height : 40},
    { x : 260, y : 200, width : 100, height : 10},
    { x : 120, y : 150, width : 10, height : 50},
    { x : 0, y : 260, width : 120, height : 10},
    { x : 290, y : 210, width : 10, height : 50},
    { x : 350, y : 40, width : 10, height : 170},
    { x : 290, y : 120, width : 60, height : 10},
    { x : 270, y : 90, width : 70, height : 10},
    { x : 140, y : 260, width : 250, height : 10},
    { x : 390, y : 0, width : 10, height : 480},
    { x : 450, y : 30, width : 10, height : 500},
    { x : 290, y : 60, width : 60, height : 10},
    { x : 270, y : 20, width : 70, height : 10},
    { x : 60, y : 300, width : 10, height : 60},
    { x : 70, y : 320, width : 120, height : 10},
    { x : 190, y : 270, width : 10, height : 60},
    { x : 0, y : 390, width : 100, height : 10},
    { x : 120, y : 350, width : 10, height : 80},
    { x : 160, y : 330, width : 10, height : 120},
    { x : 60, y : 450, width : 110, height : 10},
    { x : 230, y : 300, width : 10, height : 100},
    { x : 190, y : 360, width : 40, height : 10},
    { x : 190, y : 370, width : 10, height : 60},
    { x : 230, y : 410, width : 10, height : 90},
    { x : 190, y : 440, width : 40, height : 10},
    { x : 240, y : 300, width : 180, height : 10},
    { x : 30, y : 400, width : 10, height : 80},
    { x : 250, y : 320, width : 10, height : 150},
    { x : 270, y : 310, width : 10, height : 180},
    { x : 260, y : 420, width : 30, height : 10},
    { x : 290, y : 440, width : 30, height : 10},
    { x : 290, y : 450, width : 10, height : 50},
    { x : 300, y : 420, width : 40, height : 10},
    { x : 330, y : 430, width : 10, height : 70},
    { x : 280, y : 390, width : 60, height : 10},
    { x : 350, y : 320, width : 10, height : 180},
    { x : 290, y : 370, width : 70, height : 10},
    { x : 400, y : 470, width : 40, height : 10},
    { x : 410, y : 450, width : 80, height : 10},
    { x : 410, y : 310, width : 10, height : 130},
    { x : 430, y : 20, width : 10, height : 420},
    { x : 410, y : 20, width : 10, height : 270},
    { x : 420, y : 50, width : 70, height : 10},
    { x : 470, y : 70, width : 30, height : 10},
    { x : 470, y : 90, width : 10, height : 180},
    { x : 490, y : 90, width : 10, height : 150},
    { x : 470, y : 280, width : 30, height : 10},
    { x : 460, y : 160, width : 10, height : 10},
    { x : 480, y : 300, width : 10, height : 290}
]

//  event listeners
window.addEventListener('keydown', movePlayer);
resetBtn.addEventListener('click', resetGame);

// if ((player.x <= (walls[i].x + walls[i].width)) &&
// ((player.x + unitSize) >= walls[i].x) &&
// (player.y <= (walls[i].y + walls[i].height )) &&
// (( player.y + unitSize) >= walls[i].y))

// special functions
const detectCollisionX = () => {
    let res = [];

    for (let i = 0; i < walls.length; i++) {
        if ((player.x < (walls[i].x + walls[i].width)) &&
        ((player.x + unitSize) > walls[i].x)) 
     {
        res.push(true);
        }
    else {
        res.push(false);
        }
    }

    return res;
}

const detectCollisionY = () => {
    let res = [];

    for (let i = 0; i < walls.length; i++) {
        if ((player.y < (walls[i].y + walls[i].height )) &&
        (( player.y + unitSize) > walls[i].y)) {
            res.push(true);
        } else {
            res.push(false);
        }
    }

    return res;

}

function compareBoth() {
    let arrX = detectCollisionX();
    let arrY = detectCollisionY();
    let res = [];

    for(let i = 0; i < arrX.length; i++) {
        if (arrX[i] === true && arrY[i] === true) {
            res.push(true);
        }
        else {
            res.push(false);
        }
    }

    if (res.indexOf(true) === -1) {
        return true;
    } else {
        return false;
    }
}


gameStart();

function gameStart() {
    running = true;


    clearBoard();
    drawPlayer();
    drawWalls();
    nextTick();
}

function nextTick() {
    if (running) {
        intervalID = setTimeout(() => {
            clearBoard();
            drawWalls();
            drawFinish();
            drawPlayer();
            detectGameOver();
            nextTick();
        }, 50);
    }
    else {
        displayGameOver();
    }
}

function drawPlayer() {
    ctx.fillStyle = playerColor;
    ctx.strokeStyle = playerStroke;

    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

function movePlayer(event) {
    const keyPressed = event.keyCode;

    const leftArrow = 37;
    const leftKey = 65;

    const upArrow = 38;
    const upKey = 87;

    const rightArrow = 39;
    const rightKey = 68;

    const downArrow = 40;
    const downKey = 83;


    switch(keyPressed) {
        case(leftArrow):
        if (player.x > 0) {
        player.x -= unitSize;
            if (!compareBoth()) {
                player.x += unitSize;
            }
        }

        break;

        case(leftKey):
        if (player.x > 0) {
        player.x -= unitSize;

            if (!compareBoth()) {
                player.x += unitSize;
            }
        }
        break;

        case(rightArrow ):
        if ((player.x < gameWidth - unitSize)) {
        player.x += unitSize;

            if (!compareBoth()) {
                player.x -= unitSize;
            }
        }
        break;

        case(rightKey):
        if (player.x < gameWidth - unitSize) {
        player.x += unitSize;
            if (!compareBoth()) {
                player.x -= unitSize;
            }
        }
        break;

        case(upArrow):
        if (player.y > 0) {
        player.y -= unitSize;

            if (!compareBoth()) {
                player.y += unitSize;
            }
        }
        break;

        case(upKey):
        if (player.y > 0) {
        player.y -= unitSize;
     
            if (!compareBoth()) {
                player.y += unitSize;
            }
        }
        break;

        case(downArrow):
        if (player.y < gameHeight - unitSize) {
        player.y += unitSize;
            
            if (!compareBoth()) {
                player.y -= unitSize;
            }
        }
        break;

        case(downKey):
        if (player.y < gameHeight - unitSize) {
        player.y += unitSize;

        
            if (!compareBoth()) {
                player.y -= unitSize;
            }
        }
        break;
    }
 
}


function clearBoard() {
    ctx.fillStyle = boardBg;
    
    ctx.fillRect(0,0, gameWidth, gameHeight);
}

function drawWalls() {
    ctx.fillStyle = wallColor;
    ctx.strokeStyle = wallColor;

    walls.forEach((wall) => {
        ctx.fillRect(wall.x, wall.y , wall.width, wall.height);
    })

}

function drawFinish() {
    ctx.fillStyle = finishColor;
    ctx.strokeStyle = finishColor;

    ctx.fillRect(finish.x, finish.y, finish.height, finish.width);
}

function detectGameOver() {
     if ((player.x < (finish.x + finish.width)) &&
     ((player.x + unitSize) > finish.x) &&
     (player.y < (finish.y + finish.height )) &&
     (( player.y + unitSize) > finish.y)) {
        running = false;
     }
}

function displayGameOver() {
    ctx.font = "50px Arial";
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText("You Won!", gameWidth / 2, gameHeight / 2);
    running = false;
}

function resetGame() {
    player = {
        x : 10,
        y : 10,
        width : unitSize,
        height : unitSize
    }

    gameStart();
}

