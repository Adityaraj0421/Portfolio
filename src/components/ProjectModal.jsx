import { motion } from 'framer-motion';
import { X, ArrowUpRight, Github } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
                layoutId={`card-${project.id}`}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="w-full max-w-4xl max-h-[90vh] bg-dark-lighter border border-white/10 rounded-3xl overflow-hidden relative z-10 flex flex-col shadow-2xl shadow-black/50"
            >
                {/* Close Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-black/70 transition-colors border border-white/10"
                >
                    <X size={20} />
                </button>

                {/* Image Section */}
                <motion.div
                    layoutId={`image-${project.id}`}
                    className="relative h-[40vh] md:h-[50vh] w-full shrink-0"
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-lighter via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <motion.span
                            layoutId={`subtitle-${project.id}`}
                            className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-2 block"
                        >
                            {project.subtitle}
                        </motion.span>
                        <motion.h2
                            layoutId={`title-${project.id}`}
                            className="text-4xl md:text-5xl font-bold text-white text-gradient-texture"
                        >
                            {project.title}
                        </motion.h2>
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar bg-dark-lighter">
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Left: Description */}
                        <div className="md:col-span-2 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {project.description}
                                </p>
                                <p className="text-gray-400 mt-4 leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right: Details & Actions */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col gap-3"
                            >
                                <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition-colors">
                                    <span>View Live</span>
                                    <ArrowUpRight size={18} />
                                </a>
                                <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
                                    <Github size={18} />
                                    <span>Source Code</span>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
