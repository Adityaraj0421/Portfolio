import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState } from "react";

export default function SpotlightText({ children, className = "" }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`relative overflow-hidden group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Base Layer - Dark/Dim */}
            <span className="block text-white/10 select-none pointer-events-none">
                {children}
            </span>

            {/* Overlay Layer - Bright White with Mask */}
            <motion.span
                className="absolute inset-0 block text-white select-none pointer-events-none"
                style={{
                    maskImage: useMotionTemplate`radial-gradient(
            200px circle at ${mouseX}px ${mouseY}px,
            white,
            transparent
          )`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(
            200px circle at ${mouseX}px ${mouseY}px,
            white,
            transparent
          )`,
                }}
            >
                {children}
            </motion.span>
        </div>
    );
}
