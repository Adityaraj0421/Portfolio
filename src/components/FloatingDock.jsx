import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

export default function FloatingDock() {
    const links = [
        { name: 'Work', href: '#work' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, type: "spring", bounce: 0.4 }}
                className="flex items-center gap-2 p-2 bg-dark-lighter/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50"
            >
                <div className="flex items-center gap-1 px-2">
                    {links.map((link) => (
                        <Magnetic key={link.name}>
                            <a
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                            >
                                {link.name}
                            </a>
                        </Magnetic>
                    ))}
                </div>

                <div className="w-px h-6 bg-white/10 mx-1" />

                <Magnetic>
                    <button className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
                        Let's Talk
                    </button>
                </Magnetic>
            </motion.nav>
        </div>
    );
}
