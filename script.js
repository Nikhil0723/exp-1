const canvas = document.getElementById('canva1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.speed = Math.random() * 2 + 1;
    this.maxSize = Math.random() * 20 + 5;
    this.colorTransitionSpeed = Math.random() * 0.02 + 0.01; // Adjust the color transition speed
    this.currentColor = 0;
}

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();
}

Particle.prototype.update = function () {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;

    // Smooth color transition
    this.currentColor += this.colorTransitionSpeed;
    this.color = `rgba(${Math.sin(this.currentColor) * 127 + 128},${Math.sin(this.currentColor + 2) * 127 + 128},${Math.sin(this.currentColor + 4) * 127 + 128},1)`;

    this.draw();
}

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        let size = Math.random() * 5 + 1;
        let x = Math.random() * (innerWidth - size * 2) + size;
        let y = Math.random() * (innerHeight - size * 2) + size;
        let directionX = (Math.random() * 2 - 1);
        let directionY = (Math.random() * 2 - 1);
        let color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`;

        particles.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
