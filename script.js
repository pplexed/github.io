const scale = 2;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const cycleLoop = [0, 1, 0, 2];
const movementSpeed = 1;
const facingDown = 0;
const facingUp = 1;
const facingLeft = 2;
const facingRight = 3;
const frameLimit = 12;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let positionX = 0;
let positionY = 0;
let keyPresses = {};
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = facingDown;
let img = new Image();


window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

function loadImage() {
  img.src = 'img/Green.png';
  img.onload = function() {
    window.requestAnimationFrame(gameLoop);
  };
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
}

loadImage();


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hasMoved = false;

    if (keyPresses.w) {
        moveCharacter(0, -movementSpeed, facingUp);
        hasMoved = true;
    } else if (keyPresses.s) {
        moveCharacter(0, movementSpeed, facingDown);
        hasMoved = true;
    }

    if (keyPresses.a) {
        moveCharacter(-movementSpeed, 0, facingLeft);
        hasMoved = true;
    } else if (keyPresses.d) {
        moveCharacter(movementSpeed, 0, facingRight);
        hasMoved = true;
    }

    if (hasMoved) {
        frameCount++;
        if (frameCount >= frameLimit) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= cycleLoop.length) {
                currentLoopIndex = 0;
            }
        }
    }
    
    if (!hasMoved) {
        currentLoopIndex = 0;
    }

    drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);
    window.requestAnimationFrame(gameLoop);

}

function moveCharacter(deltaX, deltaY, direction) {
    if (positionX + deltaX > 0 && positionX + scaledWidth + deltaX < canvas.width) {
        positionX += deltaX;
    }
    if (positionY + deltaY > 0 && positionY + scaledHeight + deltaY < canvas.height) {
        positionY += deltaY;
    }
    currentDirection = direction;
}