// Select the canvas and set its dimensions
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Define the square properties
const squareSize = 50;
const squareSpeed = 5;
let squareX = (canvasWidth - squareSize) / 2;
let moveLeft = false;
let moveRight = false;

// Draw the square on the canvas
function drawSquare() {
    if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'white';
        ctx.fillRect(squareX, canvasHeight - squareSize - 10, squareSize, squareSize);
    }
}

// Update the position of the square
function update() {
    if (moveLeft) {
        squareX -= squareSpeed;
    }
    if (moveRight) {
        squareX += squareSpeed;
    }

    // Prevent the square from going out of bounds
    squareX = Math.max(0, Math.min(canvasWidth - squareSize, squareX));

    drawSquare();

    // Request next frame update
    requestAnimationFrame(update);
}

// Handle keyboard input to start or stop moving the square
function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
        moveLeft = true;
    } else if (event.key === 'ArrowRight') {
        moveRight = true;
    }
}

// Handle keyboard input to stop moving the square
function handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
        moveLeft = false;
    } else if (event.key === 'ArrowRight') {
        moveRight = false;
    }
}

// Add event listeners for keydown and keyup events
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Start the animation loop
update();