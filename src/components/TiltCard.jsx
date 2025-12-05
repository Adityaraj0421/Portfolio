import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

export default function TiltCard({ children, className = "" }) {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Tilt effect - Only apply on desktop to save battery/performance on mobile
    const rotateX = useTransform(mouseY, [0, 400], [5, -5]);
    const rotateY = useTransform(mouseX, [0, 400], [-5, 5]);

    // Glow Border Mask
    const maskImage = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, white, transparent)`;

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX: window.innerWidth > 768 ? rotateX : 0, // Disable tilt on mobile
                rotateY: window.innerWidth > 768 ? rotateY : 0,
                transformStyle: "preserve-3d",
            }}
            className={`relative group/card ${className}`}
        >
            {/* Glow Border - Hidden on mobile to prevent confusion/performance hit */}
            <motion.div
                className="hidden md:block absolute inset-0 rounded-3xl border border-white/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            />

            {/* Content */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </motion.div>
    );
}
