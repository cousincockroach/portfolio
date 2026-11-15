const { appendFile } = require("node:fs");
const { only } = require("node:test");

const canvas = document.getElementById("smoke-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const particles = [];
let hue = 0;

const mouse = {
    x: null,
    y: null
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Spawn smoke particles on movement
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
    }
});

class Particle {
    constructor(x, y) {
        this.x = x + (Math.random() * 20 - 10);
        this.y = y + (Math.random() * 20 - 10);
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.size = Math.random() * 25 + 15;
        this.color = `hsl(${hue}, 80%, 60%)`;
        this.alpha = 0.5;
        this.decay = Math.random() * 0.015 + 0.008;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += 0.4;
        this.alpha -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0, 
            this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hue = (hue + 0.5) % 360;

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();

// * MEMBERS ONLY - 
// * CV APPLICATION - 
// * LIBRARY - refactor
// * TODO LIST - 



