import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 relative z-10">
            <div className="max-w-6xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                >
                    <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-display font-bold leading-tight tracking-tighter mb-8 text-gradient-texture">
                        Aditya Raj<span className="text-blue-500">.</span>
                    </h1>
                    <p className="text-[clamp(0.6rem,2.5vw,2.25rem)] text-gray-400 font-light w-full whitespace-nowrap leading-tight">
                        <span className="text-white font-medium hover:text-blue-400 transition-colors duration-300">Product Designer</span>. <span className="text-white font-medium relative inline-block group cursor-default">
                            Photographer
                            <span className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-0 group-hover:opacity-100 bg-clip-text text-transparent transition-opacity duration-300 pointer-events-none">Photographer</span>
                        </span>. <span className="text-white font-medium hover:text-purple-400 transition-colors duration-300">Visual Storyteller</span>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
