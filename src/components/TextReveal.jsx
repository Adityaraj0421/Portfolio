import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TextReveal({ children, className = "", delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
            <motion.span
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1], // Custom bezier for "Apple-like" ease
                    delay: delay,
                }}
                className="inline-block"
            >
                {children}
            </motion.span>
        </span>
    );
}
