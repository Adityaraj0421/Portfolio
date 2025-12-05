import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Magnetic from './Magnetic';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className={`flex items-center justify-between rounded-full px-8 py-4 transition-all duration-300 ${scrolled
                    ? 'glass-panel'
                    : 'bg-transparent border border-transparent'
                    } relative z-50`}>
                    {/* Logo */}
                    <Magnetic>
                        <a href="#" className="block">
                            <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                <video
                                    src="/logo.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover scale-110 translate-y-1 mix-blend-screen"
                                />
                            </div>
                        </a>
                    </Magnetic>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-10">
                        {['Work', 'About', 'Contact'].map((item) => (
                            <Magnetic key={item}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className="text-base font-medium text-gray-400 hover:text-white transition-colors block px-2 py-1"
                                >
                                    {item}
                                </a>
                            </Magnetic>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <Magnetic>
                        <a
                            href="mailto:kang.applies@gmail.com"
                            className="hidden md:block px-6 py-3 bg-white text-dark font-medium rounded-full text-base hover:bg-gray-200 transition-colors"
                        >
                            Let's Talk
                        </a>
                    </Magnetic>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-dark z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {['Work', 'About', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-4xl font-display font-bold text-white hover:text-blue-500 transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                        <a
                            href="mailto:kang.applies@gmail.com"
                            className="px-8 py-4 bg-white text-dark font-medium rounded-full text-xl hover:bg-gray-200 transition-colors mt-8"
                        >
                            Let's Talk
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
