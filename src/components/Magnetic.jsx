import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Magnetic({ children }) {
    const ref = useRef(null);

    // Motion values for position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth return
    const springConfig = {
        stiffness: 350,
        damping: 35,
        mass: 0.5
    };

    const mouseXSpring = useSpring(x, springConfig);
    const mouseYSpring = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate distance from center
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Move the element towards the mouse (magnetic effect)
        x.set(middleX * 0.5); // Increased strength
        y.set(middleY * 0.5);
    };

    const handleMouseLeave = () => {
        // Reset position
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseXSpring, y: mouseYSpring }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            {children}
        </motion.div>
    );
}
