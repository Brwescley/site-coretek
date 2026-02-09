/* --- ESFERA DE PARTÍCULAS 3D --- */
const canvas = document.getElementById('sphereCanvas');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Configurações da Esfera
    const properties = {
        bgColor: 'rgba(0, 0, 0, 0)', 
        particleColor: 'rgba(0, 243, 255, 1)', 
        particleRadius: 2,
        particleCount: 300, 
        sphereRadius: 300, 
        rotationSpeed: 0.002
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.theta = Math.random() * Math.PI * 2;
            this.phi = Math.acos((Math.random() * 2) - 1);
            this.x = 0; this.y = 0; this.z = 0;
        }

        update(rotationAngle) {
            let r = properties.sphereRadius;
            let xOriginal = r * Math.sin(this.phi) * Math.cos(this.theta);
            let zOriginal = r * Math.sin(this.phi) * Math.sin(this.theta);
            let yOriginal = r * Math.cos(this.phi);

            // Rotação Y
            this.x = xOriginal * Math.cos(rotationAngle) - zOriginal * Math.sin(rotationAngle);
            this.z = xOriginal * Math.sin(rotationAngle) + zOriginal * Math.cos(rotationAngle);
            this.y = yOriginal;
        }

        draw(ctx) {
            let scale = 400 / (400 + this.z);
            let x2d = (this.x * scale) + width / 2;
            let y2d = (this.y * scale) + height / 2;

            if (scale > 0) {
                let radius = properties.particleRadius * scale;
                ctx.globalAlpha = Math.max(0, scale - 0.2);
                ctx.fillStyle = properties.particleColor;
                ctx.beginPath();
                ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    let angle = 0;
    function animate() {
        ctx.clearRect(0, 0, width, height);
        angle += properties.rotationSpeed;
        particles.forEach(p => {
            p.update(angle);
            p.draw(ctx);
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { resize(); init(); });
    init();
    animate();
}

/* --- SCROLL REVEAL (Elementos aparecem ao rolar) --- */
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', reveal);
reveal();

/* --- BLINDAGEM DO CÓDIGO (Anti-Cópia) --- */

// Desabilita Botão Direito
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Desabilita Teclas de Atalho de Inspeção
document.onkeydown = function(e) {
    // F12
    if(e.keyCode == 123) return false;
    // Ctrl+Shift+I
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    // Ctrl+Shift+J
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    // Ctrl+U
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
}