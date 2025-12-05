import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const PROJECTS = [
    {
        id: 'brick',
        title: 'Brick and Key',
        subtitle: 'Streamlining Real Estate Discovery',
        description: 'Led the design of a live real estate platform, focusing on intuitive user flows and a modern, minimalist aesthetic to reduce cognitive load for home buyers.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        tags: ['Web Design', 'Live Project', 'End-to-End'],
        className: 'md:col-span-2 md:row-span-2'
    },
    {
        id: 'jobmato',
        title: 'Jobmato',
        subtitle: 'Android Job Discovery App',
        description: 'Designed the complete Android UI from scratch, including onboarding flows and logo identity. Focused on making job hunting engaging and user-centric.',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        tags: ['Mobile App', 'Branding', 'Gen-Z UX'],
        className: 'md:row-span-2'
    },
    {
        id: 'photo',
        title: 'Through the Lens',
        subtitle: 'Photography',
        description: 'A curated collection of street and abstract photography capturing the raw essence of urban life. Exploring light, shadow, and human connection.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        tags: ['Photography', 'Lightroom', 'Visual Storytelling'],
        className: 'md:col-span-2'
    },
    {
        id: 'platform',
        title: 'Platform',
        subtitle: 'Student Event Management',
        description: 'Built a cohesive design system and mobile UI for a dual-sided marketplace connecting student event organizers with attendees.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        tags: ['Design Systems', 'Interaction Design'],
        className: ''
    }
];

import { Link } from 'react-router-dom';

export default function BentoGrid({ setActiveProject }) {
    return (
        <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
                {PROJECTS.map((project) => (
                    <Link
                        to={`/project/${project.id}`}
                        key={project.id}
                        onMouseEnter={() => setActiveProject && setActiveProject(project.id)}
                        onMouseLeave={() => setActiveProject && setActiveProject(null)}
                        className={`${project.className} h-full block`}
                    >
                        <TiltCard className="h-full glass-panel rounded-3xl group cursor-pointer hover:border-white/20 transition-colors relative">
                            <motion.div
                                layoutId={`card-${project.id}`}
                                className="h-full w-full"
                            >
                                {/* Background Image (for Photography card) */}
                                {project.id === 'photo' && (
                                    <>
                                        <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url(${project.image})` }} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                                    </>
                                )}

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className={`h-full flex flex-col ${project.id === 'photo' ? 'justify-end' : 'justify-between'} p-10 relative z-10`}
                                >
                                    <div>
                                        <motion.span layoutId={`subtitle-${project.id}`} className={`text-xs font-mono uppercase tracking-widest mb-2 block ${project.id === 'brick' ? 'text-blue-400' : project.id === 'jobmato' ? 'text-green-400' : project.id === 'platform' ? 'text-orange-400' : 'text-white/60'}`}>
                                            {project.subtitle}
                                        </motion.span>
                                        <motion.h3 layoutId={`title-${project.id}`} className="text-3xl md:text-4xl font-display font-semibold mb-4 text-white text-gradient-texture">
                                            {project.title}
                                        </motion.h3>
                                        {project.id !== 'platform' && (
                                            <p className={`text-lg ${project.id === 'photo' ? 'text-gray-300' : 'text-gray-400'} ${project.id === 'brick' ? 'max-w-md' : ''}`}>
                                                {project.id === 'photo' ? 'Street & Abstract Photography' : project.description.split('.')[0] + '.'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Decorative Elements */}
                                    {project.id === 'brick' && (
                                        <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-gradient-to-tl from-blue-600/20 to-purple-600/5 rounded-tl-[100px] opacity-50 group-hover:opacity-80 transition-opacity -z-10" />
                                    )}
                                    {project.id === 'jobmato' && (
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-green-900/20 to-transparent -z-10" />
                                    )}
                                    {project.id === 'platform' && (
                                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl -z-10" />
                                    )}
                                </motion.div>
                            </motion.div>
                        </TiltCard>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export { PROJECTS };
