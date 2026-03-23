(function () {
    const canvas = document.getElementById("bubble_canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width, height;
    let bubbles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function createBubble() {
        const radius = Math.random() * 10 + 5;
        return {
            x: Math.random() * width,
            y: - Math.random() * 100,
            radius: radius,     // 小雪花（1~4）
            // speed: Math.random() * 0.5 + 0.2,  // 慢一点

            speed: radius * 0.03,

            alpha: Math.random() * 0.5 + 0.3,  // 稍微明显

            swing: Math.random() * 0.05 + 0.01, // 左右摆动幅度
            offset: Math.random() * Math.PI * 2 // 每个雪花不同相位
        };
    }

    for (let i = 0; i < 50; i++) {
        bubbles.push(createBubble());
    }

    function drawBubble(b) {
        const gradient = ctx.createRadialGradient(
            b.x, b.y, 0,
            b.x, b.y, b.radius
        );

        gradient.addColorStop(0, `rgba(255,255,255,${b.alpha})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const wind = 0.05;
        bubbles.forEach(b => {
            b.y += b.speed;
            b.x += Math.sin(b.y * b.swing + b.offset) * 0.5;
            b.x -= wind;
            drawBubble(b);

            if (b.y > height + b.radius) {
                Object.assign(b, createBubble());
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
})();
