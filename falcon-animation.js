document.addEventListener('DOMContentLoaded', () => {
    const falconContainer = document.getElementById('falcon-hero-container');
    const falconBody = document.getElementById('falcon-body');
    const wingLeft = document.getElementById('falcon-wing-left');
    const wingRight = document.getElementById('falcon-wing-right');
    const animatedFalcon = document.getElementById('animated-falcon');

    if (!falconContainer || !animatedFalcon) return;

    let targetY = 0;
    let targetRotation = 0;
    let currentY = 0;
    let currentRotation = 0;
    const ease = 0.05;

    // Animation Loop for smooth interpolation
    function animate() {
        currentY += (targetY - currentY) * ease;
        currentRotation += (targetRotation - currentRotation) * ease;

        animatedFalcon.style.transform = `translateY(${currentY}px) rotate(${currentRotation}deg)`;

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Gentle float and rotation based on scroll
        targetY = scrollY * -0.5;
        targetRotation = scrollY * 0.02;

        // Flapping wings effect
        const wingAngle = Math.max(-30, Math.min(20, Math.sin(scrollY * 0.05) * 20));
        wingLeft.style.transform = `rotate(${wingAngle}deg)`;
        wingRight.style.transform = `rotate(${-wingAngle}deg)`;

        // Dynamic Glow
        const glowIntensity = Math.min(0.8, 0.3 + (scrollY * 0.001));
        animatedFalcon.style.filter = `drop-shadow(0 0 ${20 + scrollY * 0.1}px rgba(59,130,246,${glowIntensity}))`;
    });
});
