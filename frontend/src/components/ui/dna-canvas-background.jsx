import React, { useEffect, useRef } from 'react';

export const DnaCanvasBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Dynamic resizing
        const handleResize = () => {
            if (canvas) {
                canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
                canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // 3D DNA Helix parameters
        const numNodes = 28; // Number of base pairs
        const helixSpeed = 0.008; // Rotation speed
        let angle = 0;

        // Ambient particles in background
        const numParticles = 40;
        const particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * (canvas.width || window.innerWidth),
                y: Math.random() * (canvas.height || window.innerHeight),
                size: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: -Math.random() * 0.4 - 0.1, // Float upwards
                alpha: Math.random() * 0.5 + 0.1,
            });
        }

        const render = () => {
            if (!canvas || !ctx) return;

            // Clear screen
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw deep space background gradient
            const bgGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 50,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.7
            );
            bgGradient.addColorStop(0, '#090a15'); // Dark Indigo glow
            bgGradient.addColorStop(0.5, '#020306'); // Near black
            bgGradient.addColorStop(1, '#000000'); // Pure black
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw and update ambient particles
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.globalAlpha = p.alpha;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Update particle positions
                p.x += p.speedX;
                p.y += p.speedY;

                // Reset particle when it goes off screen
                if (p.y < 0) {
                    p.y = canvas.height;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < 0 || p.x > canvas.width) {
                    p.x = Math.random() * canvas.width;
                }
            });

            ctx.globalAlpha = 1.0; // Reset global alpha

            // DNA Math parameters
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const amplitude = Math.min(canvas.width, 400) * 0.35; // Width of helix
            const wavelength = 180; // Distance of full rotation
            const verticalSpacing = canvas.height / numNodes;

            ctx.lineWidth = 1.2;

            for (let i = 0; i < numNodes; i++) {
                const y = i * verticalSpacing;
                
                // Spiral phase angle
                const phase = (y / wavelength) + angle;

                // Strand A coordinates (3D simulation using sine and Z-depth from cosine)
                const x1 = centerX + Math.sin(phase) * amplitude;
                const z1 = Math.cos(phase); // Z coordinate [-1, 1]

                // Strand B coordinates (Opposing phase)
                const x2 = centerX - Math.sin(phase) * amplitude;
                const z2 = -Math.cos(phase); // Opposing Z coordinate

                // Scaling factor for node sizes based on 3D depth
                const r1 = (z1 + 1.8) * 2.2;
                const r2 = (z2 + 1.8) * 2.2;

                // Alpha based on depth (back strands are fainter)
                const alpha1 = (z1 + 1) * 0.4 + 0.2;
                const alpha2 = (z2 + 1) * 0.4 + 0.2;
                const linkAlpha = Math.min(alpha1, alpha2) * 0.5;

                // Draw base pair bond line
                ctx.strokeStyle = `rgba(99, 102, 241, ${linkAlpha})`; // Indigo line
                ctx.beginPath();
                ctx.moveTo(x1, y);
                ctx.lineTo(x2, y);
                ctx.stroke();

                // Draw node A (Cyan neon strand)
                const radG1 = ctx.createRadialGradient(x1, y, 0, x1, y, r1 * 1.8);
                radG1.addColorStop(0, `rgba(6, 182, 212, ${alpha1})`); // Bright cyan
                radG1.addColorStop(0.3, `rgba(6, 182, 212, ${alpha1 * 0.6})`);
                radG1.addColorStop(1, 'rgba(6, 182, 212, 0)');
                ctx.fillStyle = radG1;
                ctx.beginPath();
                ctx.arc(x1, y, r1 * 1.8, 0, Math.PI * 2);
                ctx.fill();

                // Draw node B (Violet/Indigo neon strand)
                const radG2 = ctx.createRadialGradient(x2, y, 0, x2, y, r2 * 1.8);
                radG2.addColorStop(0, `rgba(139, 92, 246, ${alpha2})`); // Bright violet
                radG2.addColorStop(0.3, `rgba(139, 92, 246, ${alpha2 * 0.6})`);
                radG2.addColorStop(1, 'rgba(139, 92, 246, 0)');
                ctx.fillStyle = radG2;
                ctx.beginPath();
                ctx.arc(x2, y, r2 * 1.8, 0, Math.PI * 2);
                ctx.fill();
            }

            angle += helixSpeed;
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block pointer-events-none"
        />
    );
};
