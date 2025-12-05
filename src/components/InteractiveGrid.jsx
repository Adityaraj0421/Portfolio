import { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let points = [];
        let resizeTimeout;

        // Configuration
        const GRID_SPACING = 40;
        const MOUSE_RADIUS = 300;
        const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS; // Pre-calculate squared radius
        const REPEL_FORCE = 2;
        const RETURN_SPEED = 0.1;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            points = [];
            const cols = Math.ceil(canvas.width / GRID_SPACING) + 1;
            const rows = Math.ceil(canvas.height / GRID_SPACING) + 1;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * GRID_SPACING;
                    const y = j * GRID_SPACING;
                    points.push({
                        x, y,
                        originX: x,
                        originY: y,
                        vx: 0, vy: 0
                    });
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update Physics
            points.forEach(point => {
                const dx = point.x - mouseRef.current.x;
                const dy = point.y - mouseRef.current.y;
                const distanceSq = dx * dx + dy * dy;

                // Mouse Repulsion
                if (distanceSq < MOUSE_RADIUS_SQ) {
                    const distance = Math.sqrt(distanceSq);
                    const force = (1 - distance / MOUSE_RADIUS) * REPEL_FORCE;
                    const angle = Math.atan2(dy, dx);
                    point.vx += Math.cos(angle) * force * 0.5;
                    point.vy += Math.sin(angle) * force * 0.5;
                }

                // Return to origin
                const ox = point.originX - point.x;
                const oy = point.originY - point.y;
                point.vx += ox * RETURN_SPEED;
                point.vy += oy * RETURN_SPEED;

                // Damping
                point.vx *= 0.8;
                point.vy *= 0.8;

                // Apply velocity
                point.x += point.vx;
                point.y += point.vy;
            });

            // Draw Lines
            ctx.lineWidth = 1;
            const cols = Math.ceil(canvas.width / GRID_SPACING) + 1;
            const rows = Math.ceil(canvas.height / GRID_SPACING) + 1;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const index = i * rows + j;
                    const point = points[index];

                    // Calculate opacity based on distance from mouse (Spotlight effect)
                    const dx = point.x - mouseRef.current.x;
                    const dy = point.y - mouseRef.current.y;
                    const distSq = dx * dx + dy * dy;

                    // Optimization: Skip drawing if too far (outside spotlight + buffer)
                    if (distSq > 300000) continue;

                    const dist = Math.sqrt(distSq);
                    const opacity = Math.max(0, 1 - dist / 500);

                    if (opacity > 0.01) {
                        ctx.beginPath();

                        // Draw Right
                        if (i < cols - 1) {
                            const rightIndex = (i + 1) * rows + j;
                            const rightPoint = points[rightIndex];
                            ctx.moveTo(point.x, point.y);
                            ctx.lineTo(rightPoint.x, rightPoint.y);
                        }

                        // Draw Down
                        if (j < rows - 1) {
                            const downIndex = i * rows + (j + 1);
                            const downPoint = points[downIndex];
                            ctx.moveTo(point.x, point.y);
                            ctx.lineTo(downPoint.x, downPoint.y);
                        }

                        // Dynamic Gradient Flow
                        const time = Date.now() * 0.0005;
                        const gradient = ctx.createLinearGradient(point.x, point.y, point.x + 200, point.y + 200);

                        const r = 100 + Math.sin(time) * 50;
                        const g = 150 + Math.cos(time) * 50;
                        const b = 255;
                        const alpha = 0.08 + opacity * 0.2;

                        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
                        gradient.addColorStop(1, `rgba(200, 230, 255, ${0.05 + opacity * 0.1})`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1.5;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(init, 100); // Debounce resize
        };

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: 'transparent' }}
        />
    );
}
