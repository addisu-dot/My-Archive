document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Auto-resize canvas when window changes
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() - 0.5,
            vy: Math.random() - 0.5
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 0.5;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off screen edges
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#0ff';
            ctx.fill();
        });

        // Connect nearby nodes
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.hypot(dx, dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    // Fade lines out as nodes get further apart
                    ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
});