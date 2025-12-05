import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

    // Tilt effect
    const rotateX = useTransform(mouseY, [0, 400], [5, -5]);
    const rotateY = useTransform(mouseX, [0, 400], [-5, 5]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative group/card ${className}`}
        >
            {/* Content */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </motion.div>
    );
}
