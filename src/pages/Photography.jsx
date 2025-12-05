import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';

const PHOTOS = [
    { id: 1, src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', aspect: 'aspect-[3/4]', title: 'Urban Solitude' },
    { id: 2, src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', aspect: 'aspect-[4/3]', title: 'Mountain Peak' },
    { id: 3, src: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', aspect: 'aspect-[3/4]', title: 'Neon Nights' },
    { id: 4, src: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', aspect: 'aspect-[4/3]', title: 'Forest Mist' },
    { id: 5, src: 'https://images.unsplash.com/photo-1513569771920-c9e1d31714b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', aspect: 'aspect-[3/4]', title: 'Ocean Depths' },
    { id: 6, src: 'https://images.unsplash.com/photo-1501854140884-074bf6b243e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', aspect: 'aspect-[4/3]', title: 'City Lights' },
    { id: 7, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', aspect: 'aspect-[3/4]', title: 'Autumn Leaves' },
    { id: 8, src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', aspect: 'aspect-[4/3]', title: 'Winter Silence' },
    { id: 9, src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', aspect: 'aspect-[3/4]', title: 'Deep Space' },
];

export default function Photography() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Lock scroll when modal is open
    useEffect(() => {
        if (selectedPhoto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedPhoto]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-dark pb-24"
        >
            {/* Back Button */}
            <Link
                to="/"
                className="fixed top-8 left-8 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all group"
            >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform duration-300" />
            </Link>

            {/* Header */}
            <div className="pt-32 pb-16 px-6 text-center">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[clamp(3rem,8vw,6rem)] font-display font-bold text-white mb-4"
                >
                    Through the Lens
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 max-w-xl mx-auto text-lg"
                >
                    Capturing moments of silence in a chaotic world. A collection of street, abstract, and nature photography.
                </motion.p>
            </div>

            {/* Masonry Grid */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {PHOTOS.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="break-inside-avoid relative group cursor-zoom-in rounded-2xl overflow-hidden"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <div className={`w-full ${photo.aspect} bg-gray-800`}>
                                <img
                                    src={photo.src}
                                    alt={photo.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white">
                                    <Maximize2 size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button
                            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <X size={24} />
                        </button>

                        <motion.img
                            layoutId={`photo-${selectedPhoto.id}`}
                            src={selectedPhoto.src}
                            alt={selectedPhoto.title}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
                            <p className="text-white/80 font-display text-xl">{selectedPhoto.title}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
