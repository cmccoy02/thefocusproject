// Simple Dino Game Logic

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = {
    x: 50,
    y: 150,
    width: 40,
    height: 50,
    vy: 0,
    gravity: 2,
    jumpStrength: 30,
    grounded: true
};

let obstacles = [];
let frame = 0;
let gameOver = false;

function update() {
    if (gameOver) return;

    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dino
    dino.y += dino.vy;
    dino.vy += dino.gravity;
    if (dino.y > 150) {
        dino.y = 150;
        dino.vy = 0;
        dino.grounded = true;
    }
    ctx.fillStyle = '#ff0066';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Obstacles
    if (frame % 90 === 0) {
        obstacles.push({
            x: canvas.width,
            y: 160,
            width: 20,
            height: 40
        });
    }

    obstacles.forEach((obs, index) => {
        obs.x -= 5;
        ctx.fillStyle = '#000';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Collision detection
        if (
            dino.x < obs.x + obs.width &&
            dino.x + dino.width > obs.x &&
            dino.y < obs.y + obs.height &&
            dino.y + dino.height > obs.y
        ) {
            gameOver = true;
            alert('Game Over! Press OK to restart.');
            document.location.reload();
        }

        // Remove off-screen obstacles
        if (obs.x + obs.width < 0) {
            obstacles.splice(index, 1);
        }
    });

    requestAnimationFrame(update);
}

document.addEventListener('keydown', function (e) {
    if ((e.code === 'Space' || e.code === 'ArrowUp') && dino.grounded) {
        dino.vy = -dino.jumpStrength;
        dino.grounded = false;
    }
});

update();