import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds
        const steps = 100;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (count === 100) {
            // Small delay before finishing to let user see 100%
            const timeout = setTimeout(() => {
                onComplete();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [count, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-end p-12 bg-black text-white cursor-wait"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="flex flex-col items-end overflow-hidden">
                <motion.span
                    className="text-[12vw] font-bold leading-none tracking-tighter"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {count}%
                </motion.span>
            </div>
        </motion.div>
    );
}
