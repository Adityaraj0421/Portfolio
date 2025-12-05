import { useEffect } from 'react';
import { motion, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function CursorSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Blue Gradient Spotlight */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${springX}px ${springY}px,
              rgba(59, 130, 246, 0.15),
              rgba(147, 51, 234, 0.10) 30%,
              rgba(59, 130, 246, 0.05) 60%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Technical Grid Reveal */}
      <motion.div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: useMotionTemplate`
            radial-gradient(
              450px circle at ${springX}px ${springY}px,
              black 0%,
              rgba(0,0,0,0.5) 60%,
              transparent 100%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              450px circle at ${springX}px ${springY}px,
              black 0%,
              rgba(0,0,0,0.5) 60%,
              transparent 100%
            )
          `,
        }}
      />
    </div>
  );
}
