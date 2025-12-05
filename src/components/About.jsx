import { motion } from 'framer-motion';
import MarqueeSkills from './MarqueeSkills';

export default function About() {
    return (
        <section className="py-24 relative z-10">
            <div className="max-w-6xl mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">About</h2>
                    <p className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight max-w-4xl">
                        Final Year Undergrad at <span className="text-white">IIIT Guwahati</span>. Obsessed with the intersection of design, code, and storytelling.
                    </p>
                </motion.div>
            </div>

            {/* Skills Marquee */}
            <MarqueeSkills />
        </section>
    );
}
