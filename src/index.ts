// Select the canvas and set its dimensions
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Define the square properties
const squareSize = 50;
const squareSpeed = 7;
let squareX = (canvasWidth - squareSize) / 2;
let moveLeft = false;
let moveRight = false;

// Define the projectile properties
const projectileSize = 10;
const projectileSpeed = 7;
const projectiles: { x: number, y: number }[] = [];

// Define the meteor properties
const meteorSize = 30;
const meteorSpeed = 3;
const meteors: { x: number, y: number }[] = [];
const explosionDuration = 20;
const explosions: { x: number, y: number, frame: number }[] = [];

// Track the state of the space bar
let spaceBarPressed = false;

// Track whether the game has started
let gameStarted = false;

// Track the fade out of the text
let textFadeOut = false;

// Get audio elements
const bgMusic = document.getElementById('bgMusic') as HTMLAudioElement;
const explosionSound = document.getElementById('explosionSound') as HTMLAudioElement;
const shootSound = document.getElementById('shootSound') as HTMLAudioElement;

// Handle user interaction to start audio
function handleUserInteraction() {
    if (!gameStarted) {
        // Set gameStarted to true to prevent reinitializing
        gameStarted = true;
        // Try to play background music
        bgMusic.play().catch(error => {
            console.error("Failed to start background music:", error);
        });
    }
}

// Draw the square on the canvas
function drawSquare() {
    if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(squareX, canvasHeight - squareSize - 10, squareSize, squareSize);
    }
}

// Draw projectiles on the canvas
function drawProjectiles() {
    if (ctx) {
        ctx.fillStyle = 'white';
        projectiles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, projectileSize / 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

// Draw meteors on the canvas
function drawMeteors() {
    if (ctx) {
        ctx.fillStyle = 'gray';
        meteors.forEach(m => {
            ctx.beginPath();
            ctx.arc(m.x, m.y, meteorSize / 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

// Draw explosions on the canvas
function drawExplosions() {
    if (ctx) {
        explosions.forEach(e => {
            ctx.beginPath();
            ctx.arc(e.x, e.y, (explosionDuration - e.frame) * 2, 0, Math.PI * 2);
            ctx.fillStyle = 'red';
            ctx.fill();
        });
    }
}

// Draw text instructions on the canvas
function drawInstructions() {
    if (ctx) {
        ctx.font = '36px Arial';
        ctx.fillStyle = `rgba(255, 255, 255, ${textFadeOut ? 1 - (Date.now() - textFadeStart) / textFadeDuration : 1})`;
        ctx.textAlign = 'center';
        ctx.fillText('Space Shooter', canvasWidth / 2, canvasHeight / 4);

        ctx.font = '24px Arial';
        ctx.fillText('Pure gaming experience in 2024 - sound on!', canvasWidth / 2, canvasHeight / 4 + 50);

        ctx.font = '18px Arial';
        ctx.fillText('Press LEFT or RIGHT arrow keys to start the game.', canvasWidth / 2, canvasHeight / 2);
        ctx.fillText('Press SPACE to shoot.', canvasWidth / 2, canvasHeight / 2 + 30);
    }
}

// Update the position of the square, projectiles, and meteors
function update() {
    if (moveLeft) {
        squareX -= squareSpeed;
        if (!gameStarted) {
            handleUserInteraction();
            textFadeOut = true;
            textFadeStart = Date.now();
        }
    }
    if (moveRight) {
        squareX += squareSpeed;
        if (!gameStarted) {
            handleUserInteraction();
            textFadeOut = true;
            textFadeStart = Date.now();
        }
    }

    // Prevent the square from going out of bounds
    squareX = Math.max(0, Math.min(canvasWidth - squareSize, squareX));

    // Update projectiles
    projectiles.forEach(p => p.y -= projectileSpeed);

    // Remove projectiles that are out of bounds
    projectiles.forEach((p, index) => {
        if (p.y < 0) {
            projectiles.splice(index, 1);
        }
    });

    // Update meteors
    meteors.forEach(m => m.y += meteorSpeed);

    // Remove meteors that are out of bounds
    meteors.forEach((m, index) => {
        if (m.y > canvasHeight) {
            meteors.splice(index, 1);
        }
    });

    // Check for collisions between projectiles and meteors
    projectiles.forEach((p, pIndex) => {
        meteors.forEach((m, mIndex) => {
            const dx = p.x - m.x;
            const dy = p.y - m.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < (projectileSize / 2 + meteorSize / 2)) {
                // Create explosion
                explosions.push({ x: m.x, y: m.y, frame: 0 });

                // Play explosion sound
                explosionSound.play().catch(error => {
                    console.error("Failed to play explosion sound:", error);
                });

                // Remove collided projectile and meteor
                projectiles.splice(pIndex, 1);
                meteors.splice(mIndex, 1);
            }
        });
    });

    // Update explosions
    explosions.forEach(e => e.frame++);

    // Remove old explosions
    explosions.forEach((e, index) => {
        if (e.frame > explosionDuration) {
            explosions.splice(index, 1);
        }
    });

    // Draw everything
    if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawSquare();
        drawProjectiles();
        drawMeteors();
        drawExplosions();
        drawInstructions();
    }

    // Request next frame update
    requestAnimationFrame(update);
}

// Handle keyboard input to start or stop moving the square
function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
        moveLeft = true;
    } else if (event.key === 'ArrowRight') {
        moveRight = true;
    } else if (event.key === ' ' && !spaceBarPressed) { // Space bar to shoot
        spaceBarPressed = true;
        shootProjectile();
    }
}

// Handle keyboard input to stop moving the square
function handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
        moveLeft = false;
    } else if (event.key === 'ArrowRight') {
        moveRight = false;
    } else if (event.key === ' ') {
        spaceBarPressed = false;
    }
}

// Shoot a projectile
function shootProjectile() {
    const projectileX = squareX + squareSize / 2;
    const projectileY = canvasHeight - squareSize - 10;
    projectiles.push({ x: projectileX, y: projectileY });

    // Play shoot sound
    shootSound.play().catch(error => {
        console.error("Failed to play shoot sound:", error);
    });
}

// Spawn meteors periodically
function spawnMeteors() {
    if (gameStarted) {
        const x = Math.random() * (canvasWidth - meteorSize);
        meteors.push({ x, y: -meteorSize });
    }
}

// Add event listeners for keydown and keyup events
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Start the animation loop
update();

// Spawn meteors every 2 seconds
setInterval(spawnMeteors, 2000);

// Text fade out settings
const textFadeDuration = 2000; // Duration for text fade-out in milliseconds
let textFadeStart = 0;
