import { useEffect, useRef } from 'react';

export default function GeometricMosaic() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let width, height;

        // Simulation Grid
        const cols = 100; // Back to 100 for better performance with 3D math
        const rows = 100;
        let current = [];
        let previous = [];
        let damping = 0.98; // Very long waves

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            current = new Float32Array(cols * rows).fill(0);
            previous = new Float32Array(cols * rows).fill(0);
        };

        const handleMouseMove = (e) => {
            const x = Math.floor((e.clientX / width) * cols);
            const y = Math.floor((e.clientY / height) * rows);

            // Continuous wake (radius based)
            const radius = 4;
            const strength = 200;

            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    const targetX = x + i;
                    const targetY = y + j;

                    if (targetX > 0 && targetX < cols - 1 && targetY > 0 && targetY < rows - 1) {
                        const index = targetX + targetY * cols;
                        const dist = Math.sqrt(i * i + j * j);
                        if (dist < radius) {
                            previous[index] += strength * (1 - dist / radius);
                        }
                    }
                }
            }
        };

        const handleResize = () => {
            init();
        };

        const draw = () => {
            // 1. UPDATE PHYSICS
            for (let i = 1; i < cols - 1; i++) {
                for (let j = 1; j < rows - 1; j++) {
                    const index = i + j * cols;
                    const val = (
                        previous[i - 1 + j * cols] +
                        previous[i + 1 + j * cols] +
                        previous[i + (j - 1) * cols] +
                        previous[i + (j + 1) * cols]
                    ) / 2;
                    current[index] = val - current[index];
                    current[index] = current[index] * damping;
                }
            }

            // Swap buffers
            let temp = previous;
            previous = current;
            current = temp;

            // 2. RENDER (3D Point Cloud)
            ctx.clearRect(0, 0, width, height);

            const fov = 300;
            const viewDistance = 800; // Increased distance to prevent clipping
            const tilt = 0.4;

            // Draw Points instead of Lines
            for (let j = 0; j < rows; j += 2) {
                for (let i = 0; i < cols; i += 2) {
                    const index = i + j * cols;

                    // 3D Coordinates
                    let x3d = (i - cols / 2) * (width / cols) * 1.5;
                    let y3d = current[index] * 0.8;
                    let z3d = (j - rows / 2) * (height / rows) * 1.5;

                    // Apply Tilt
                    let yTilt = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
                    let zTilt = y3d * Math.sin(tilt) + z3d * Math.cos(tilt);

                    // Apply Perspective
                    zTilt += viewDistance;

                    if (zTilt > 0) { // Only draw if in front of camera
                        const scale = fov / zTilt;
                        const x2d = width / 2 + x3d * scale;
                        const y2d = height / 2 + yTilt * scale;

                        // Draw Dot
                        const alpha = 0.3 + (j / rows) * 0.5; // Increased base opacity
                        const size = 2 * scale; // Larger dots

                        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                        ctx.beginPath();
                        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
}
