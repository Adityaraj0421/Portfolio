import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export default function CustomCursor() {
    const { cursorType } = useCursor();
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16); // Center the 32px cursor
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY, isVisible]);

    const variants = {
        default: {
            width: 16,
            height: 16,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: '0px solid rgba(255, 255, 255, 0)',
            x: 8, // Offset to center smaller dot
            y: 8,
        },
        hover: {
            width: 64,
            height: 64,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            x: -16, // Offset to center larger ring
            y: -16,
        },
        text: {
            width: 4,
            height: 32,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: '0px solid rgba(255, 255, 255, 0)',
            x: 14,
            y: 0,
        }
    };

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            variants={variants}
            animate={cursorType}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    );
}
