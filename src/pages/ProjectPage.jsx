import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import Lenis from 'lenis';
import { PROJECTS } from '../components/BentoGrid';

export default function ProjectPage() {
    const { id } = useParams();
    const project = PROJECTS.find(p => p.id === id);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

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

    const { caseStudy } = project;
    const hasCaseStudy = !!caseStudy;

    return (
        <motion.div
            ref={containerRef}
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

            {/* Hero Section */}
            <section className="relative w-full h-screen flex items-end pb-24 px-6 md:px-12">
                <div className="absolute inset-0 z-0">
                    {hasCaseStudy && caseStudy.hero.videoUrl ? (
                        <video
                            src={caseStudy.hero.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60"
                        />
                    ) : (
                        <div
                            className="w-full h-full bg-cover bg-center opacity-60"
                            style={{ backgroundImage: `url(${project.image})` }}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-display font-bold leading-none text-white mb-6">
                            {project.title}
                        </h1>
                        {hasCaseStudy && (
                            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed mb-12">
                                {caseStudy.hero.oneLiner}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-12 border-t border-white/20 pt-8">
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-2">Role</h3>
                                <p className="text-lg text-white font-medium">{hasCaseStudy ? caseStudy.hero.role : 'Designer'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-2">Timeline</h3>
                                <p className="text-lg text-white font-medium">{hasCaseStudy ? caseStudy.hero.timeline : '2023'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-2">Stack</h3>
                                <div className="flex gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-sm text-gray-300 border border-white/10 px-2 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {hasCaseStudy && (
                <>
                    {/* Context Section */}
                    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                            <div className="md:col-span-4">
                                <h2 className="text-sm font-mono uppercase tracking-widest text-blue-400 mb-6">The Context</h2>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {caseStudy.context.problem}
                                </p>
                            </div>
                            <div className="md:col-span-8">
                                <blockquote className="text-3xl md:text-5xl font-display font-semibold text-white leading-tight">
                                    "{caseStudy.context.insight}"
                                </blockquote>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-12 space-y-32">
                        {caseStudy.features.map((feature, index) => (
                            <div key={index} className="px-6 md:px-12 max-w-7xl mx-auto">
                                {feature.layout === 'full-width' ? (
                                    <div className="space-y-12">
                                        <div className="max-w-3xl">
                                            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">{feature.title}</h3>
                                            <p className="text-xl text-gray-300 leading-relaxed">{feature.description}</p>
                                        </div>
                                        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10">
                                            <img src={feature.mediaUrl} alt={feature.title} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                        <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">{feature.title}</h3>
                                            <p className="text-xl text-gray-300 leading-relaxed">{feature.description}</p>
                                        </div>
                                        <div className={`aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                            <img src={feature.mediaUrl} alt={feature.title} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>

                    {/* Process Section */}
                    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                        <h2 className="text-sm font-mono uppercase tracking-widest text-blue-400 mb-12">The Process</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {caseStudy.process.designSystemUrl && (
                                <div className="space-y-4">
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                                        <img src={caseStudy.process.designSystemUrl} alt="Design System" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">Design System</p>
                                </div>
                            )}
                            {caseStudy.process.wireframeUrl && (
                                <div className="space-y-4">
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                                        <img src={caseStudy.process.wireframeUrl} alt="Wireframes" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">Wireframes</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Impact Section */}
                    <section className="py-32 px-6 md:px-12 bg-white/5 border-y border-white/5">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                                <div className="md:col-span-4">
                                    <h2 className="text-4xl font-display font-bold text-white mb-6">Impact &<br />Results</h2>
                                </div>
                                <div className="md:col-span-8">
                                    <ul className="space-y-8">
                                        {caseStudy.impact.map((item, index) => (
                                            <li key={index} className="flex items-start gap-6">
                                                <div className="mt-2 w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
                                                <p className="text-2xl md:text-3xl text-gray-300 font-light leading-snug">{item}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* Next Project Navigation */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <p className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-8">Next Project</p>
                <Link to="/" className="inline-block group">
                    <h2 className="text-5xl md:text-8xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300">
                        View All Work
                    </h2>
                    <div className="h-1 w-0 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mt-4 group-hover:w-full transition-all duration-500" />
                </Link>
            </section>
        </motion.div>
    );
}
