// Countdown Timer
const eventDate = new Date("March 15, 2026 10:00:00").getTime();
const countdown = document.getElementById("countdown");

setInterval(() => {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff < 0) {
        countdown.innerHTML = "Event Started!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    countdown.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
}, 1000);

// Registration Form
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    document.getElementById("formMessage").innerText =
        "🎉 Registration Successful! See you at Hackathon2k26!";
    this.reset();
});

// ===== Scroll Reveal for Event Details =====
const eventBox = document.querySelector(".events-placeholder");

window.addEventListener("scroll", () => {
    const triggerPoint = window.innerHeight * 0.8;
    const boxTop = eventBox.getBoundingClientRect().top;

    if (boxTop < triggerPoint) {
        eventBox.classList.add("show");
    }
});

const canvas = document.getElementById("techCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const blades = [];
const bladeCount = 30;

class ShootingBlade {
    constructor() {
        this.reset();
    }

    reset() {
        // Start from random edge
        const edge = Math.floor(Math.random() * 4);

        if (edge === 0) { // top
            this.x = Math.random() * canvas.width;
            this.y = -50;
        } else if (edge === 1) { // right
            this.x = canvas.width + 50;
            this.y = Math.random() * canvas.height;
        } else if (edge === 2) { // bottom
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 50;
        } else { // left
            this.x = -50;
            this.y = Math.random() * canvas.height;
        }

        this.length = Math.random() * 180 + 80;
        this.speed = Math.random() * 4 + 2;
        this.angle = Math.atan2(
            canvas.height / 2 - this.y,
            canvas.width / 2 - this.x
        );

        this.opacity = 1;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.004;

        if (this.opacity <= 0) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.strokeStyle = `rgba(0, 242, 254, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = "#00f2fe";
        ctx.shadowBlur = 25;

        ctx.beginPath();
        ctx.moveTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();
    }
}

// Create blades
for (let i = 0; i < bladeCount; i++) {
    blades.push(new ShootingBlade());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    blades.forEach(blade => {
        blade.update();
        blade.draw();
    });

    requestAnimationFrame(animate);
}

animate();


// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});
