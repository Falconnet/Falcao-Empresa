document.addEventListener('DOMContentLoaded', () => {
    const falconContainer = document.getElementById('falcon-hero-container');
    const animatedFalcon = document.getElementById('animated-falcon');

    if (!falconContainer || !animatedFalcon) return;

    // Target values for mouse interaction
    let targetX = 0;
    let targetY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;

    // Current values for smooth interpolation
    let currentX = 0;
    let currentY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    // Floating animation offset
    let floatY = 0;

    // Scroll values
    let scrollYOffset = 0;
    let glowIntensity = 0.6;
    let glowRadius = 50;

    // Easing factor for smoothness
    const ease = 0.05;

    // Mouse move event for global 3D tilt and parallax effect
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate offset from center (-1 to 1)
        const offsetX = (clientX - centerX) / centerX;
        const offsetY = (clientY - centerY) / centerY;

        // Max tilt angles (degrees)
        const maxRotateX = 12;
        const maxRotateY = 15;

        // Target rotation based on mouse position (reversed for natural feel)
        targetRotateX = -offsetY * maxRotateX;
        targetRotateY = offsetX * maxRotateY;

        // Target slight movement parallax based on mouse
        targetX = offsetX * 30;
        targetY = offsetY * 30;
    });

    // Scroll event for vertical parallax and dynamic glow adjustments
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Parallax scroll effect (moves up slightly faster than page)
        scrollYOffset = scrollY * -0.3;

        // Dynamic glow based on scroll depth
        glowIntensity = Math.min(0.9, 0.6 + (scrollY * 0.001));
        glowRadius = 50 + (scrollY * 0.05);
    });

    // Animation loop for continuous fluid rendering
    const startTime = Date.now();

    function animate() {
        // Continuous smooth floating effect using sine wave
        const elapsedTime = Date.now() - startTime;
        floatY = Math.sin(elapsedTime / 1200) * 15; // 15px float amplitude, ~7.5s period

        // Smooth interpolation towards mouse targets
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;
        currentRotateX += (targetRotateX - currentRotateX) * ease;
        currentRotateY += (targetRotateY - currentRotateY) * ease;

        // Combine all translation components
        const finalX = currentX;
        const finalY = currentY + floatY + scrollYOffset;

        // Apply transform with perspective for the 3D tilt effect
        animatedFalcon.style.transform = `
            perspective(1200px)
            translate3d(${finalX}px, ${finalY}px, 0)
            rotateX(${currentRotateX}deg)
            rotateY(${currentRotateY}deg)
            scale3d(1, 1, 1)
        `;

        // Apply dynamic drop-shadow that reacts to "light" direction (mouse position)
        // creating an illusion of 3D depth and casting shadows
        const shadowOffsetX = currentX * -0.6;
        const shadowOffsetY = currentY * -0.6 + 20; // +20 base Y offset for natural overhead light
        animatedFalcon.style.filter = `drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px ${glowRadius}px rgba(59,130,246,${glowIntensity}))`;

        requestAnimationFrame(animate);
    }

    // Initialize animation loop
    animate();
});
