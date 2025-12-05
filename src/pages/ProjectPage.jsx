import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import Lenis from 'lenis';
import { PROJECTS } from '../components/BentoGrid';

export default function ProjectPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = PROJECTS.find(p => p.id === id);

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

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
                    <Link to="/" className="text-blue-500 hover:text-white transition-colors">Back to Home</Link>
                </div>
            </div>
        );
    }

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

            {/* Hero Image */}
            <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
                <motion.div
                    layoutId={`card-${project.id}`}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
                    <motion.span
                        layoutId={`subtitle-${project.id}`}
                        className="text-sm md:text-base font-mono uppercase tracking-widest mb-4 block text-white/60"
                    >
                        {project.subtitle}
                    </motion.span>
                    <motion.h1
                        layoutId={`title-${project.id}`}
                        className="text-[clamp(3rem,8vw,7rem)] font-display font-bold leading-none text-white mb-6"
                    >
                        {project.title}
                    </motion.h1>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-24 grid grid-cols-1 md:grid-cols-12 gap-12">

                {/* Sidebar (Sticky) */}
                <div className="md:col-span-4 relative">
                    <div className="sticky top-32 space-y-12">
                        <div>
                            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">Role</h3>
                            <p className="text-xl text-white">Lead Designer & Developer</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">Timeline</h3>
                            <p className="text-xl text-white">Oct 2023 - Dec 2023</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-sm text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <a href="#" className="flex-1 py-4 rounded-xl bg-white text-black font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                                Live Site <ExternalLink size={18} />
                            </a>
                            <a href="#" className="flex-1 py-4 rounded-xl bg-white/10 border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                                GitHub <Github size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-8 space-y-24">

                    {/* Overview */}
                    <section>
                        <h2 className="text-3xl font-display font-semibold mb-8">The Challenge</h2>
                        <p className="text-xl leading-relaxed text-gray-300">
                            {project.description}
                            <br /><br />
                            Most existing solutions in this space feel cluttered and outdated. The goal was to strip away the noise and focus purely on the user's intent, creating an experience that feels less like a tool and more like an extension of their thought process.
                        </p>
                    </section>

                    {/* Video Loop Placeholder */}
                    <section className="w-full aspect-video bg-white/5 rounded-2xl overflow-hidden relative group cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                </div>
                                <p className="text-sm font-mono uppercase tracking-widest text-white/60">Project Demo Loop</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 mix-blend-overlay" />
                    </section>

                    {/* Solution */}
                    <section>
                        <h2 className="text-3xl font-display font-semibold mb-8">The Solution</h2>
                        <p className="text-xl leading-relaxed text-gray-300">
                            We approached the design with a "mobile-first" mindset, ensuring that every interaction was touch-friendly and intuitive. By utilizing advanced caching strategies and optimistic UI updates, the application feels instantaneous, even on slower networks.
                        </p>
                        <ul className="mt-8 space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="mt-1 p-1 rounded-full bg-blue-500/20 text-blue-400"><ArrowRight size={16} /></div>
                                <span className="text-lg text-gray-300">Reduced load times by 40% using Next.js ISR.</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 p-1 rounded-full bg-blue-500/20 text-blue-400"><ArrowRight size={16} /></div>
                                <span className="text-lg text-gray-300">Implemented a custom design system for consistency.</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 p-1 rounded-full bg-blue-500/20 text-blue-400"><ArrowRight size={16} /></div>
                                <span className="text-lg text-gray-300">Achieved a 98/100 Lighthouse performance score.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Next Project */}
                    <section className="pt-24 border-t border-white/10">
                        <p className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">Next Project</p>
                        <h3 className="text-5xl font-display font-bold text-white hover:text-blue-500 transition-colors cursor-pointer">
                            Jobmato
                        </h3>
                    </section>

                </div>
            </div>
        </motion.div>
    );
}
