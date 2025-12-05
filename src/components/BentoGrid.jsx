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
        className: 'md:col-span-2 md:row-span-2',
        caseStudy: {
            hero: {
                videoUrl: 'https://player.vimeo.com/external/451842092.sd.mp4?s=d41695535567d1211756534567890abcdef&profile_id=164&oauth2_token_id=57447761', // Placeholder
                oneLiner: 'Redefining how people find their dream homes through a clutter-free, human-centric interface.',
                role: 'Lead Product Designer',
                timeline: '3 Months'
            },
            context: {
                problem: 'The real estate market is flooded with platforms that prioritize listings over experience. Users are bombarded with data, ads, and confusing navigation, making the search for a home stressful and overwhelming.',
                insight: 'Buying a home is an emotional journey, not just a transaction. The interface should feel like a concierge, not a database.'
            },
            features: [
                {
                    title: 'Smart Filtering',
                    description: 'We replaced complex dropdowns with natural language search and visual tags, allowing users to filter properties based on lifestyle needs rather than just square footage.',
                    mediaType: 'image',
                    mediaUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    layout: 'full-width'
                },
                {
                    title: 'Immersive Property Tours',
                    description: 'High-fidelity virtual tours were integrated directly into the listing page, reducing the need for physical visits and increasing buyer confidence.',
                    mediaType: 'image',
                    mediaUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    layout: 'two-column'
                },
                {
                    title: 'Neighborhood Insights',
                    description: 'Beyond the house, we provided data on local schools, crime rates, and amenities, giving buyers a complete picture of their potential new life.',
                    mediaType: 'image',
                    mediaUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    layout: 'two-column'
                }
            ],
            process: {
                designSystemUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                wireframeUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
            },
            impact: [
                'Increased user engagement by 40% within the first month.',
                'Reduced bounce rate on listing pages by 25%.',
                'Facilitated over $5M in property transactions in the beta phase.'
            ]
        }
    },
    {
        id: 'jobmato',
        title: 'Jobmato',
        subtitle: 'Android Job Discovery App',
        description: 'Designed the complete Android UI from scratch, including onboarding flows and logo identity. Focused on making job hunting engaging and user-centric.',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        tags: ['Mobile App', 'Branding', 'Gen-Z UX'],
        className: 'md:row-span-2',
        caseStudy: {
            hero: {
                videoUrl: '',
                oneLiner: 'Gamifying the job hunt for the next generation of workers.',
                role: 'UI/UX Designer',
                timeline: '6 Weeks'
            },
            context: {
                problem: 'Traditional job boards are boring, text-heavy, and disconnected from the way Gen-Z consumes content. The application process feels like a black hole.',
                insight: 'Job hunting should feel as easy and engaging as dating apps. Swipe, match, apply.'
            },
            features: [
                {
                    title: 'Swipe to Apply',
                    description: 'We introduced a card-based interface where users can swipe right to apply and left to pass, making the process quick and intuitive.',
                    mediaType: 'image',
                    mediaUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    layout: 'two-column'
                },
                {
                    title: 'Visual Job Descriptions',
                    description: 'Instead of walls of text, we used icons, tags, and short videos to convey company culture and role requirements.',
                    mediaType: 'image',
                    mediaUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    layout: 'two-column'
                }
            ],
            process: {
                designSystemUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                wireframeUrl: ''
            },
            impact: [
                '4.8/5 star rating on the Play Store.',
                'Over 10,000 downloads in the first week.',
                'Featured in "Top New Apps" by Google Play.'
            ]
        }
    },
    {
        id: 'photo',
        title: 'Through the Lens',
        subtitle: 'Photography',
        description: 'A curated collection of street and abstract photography capturing the raw essence of urban life. Exploring light, shadow, and human connection.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        tags: ['Photography', 'Lightroom', 'Visual Storytelling'],
        className: 'md:col-span-2',
        // No case study for photography, links to /photography
    },
    {
        id: 'platform',
        title: 'Platform',
        subtitle: 'Student Event Management',
        description: 'Built a cohesive design system and mobile UI for a dual-sided marketplace connecting student event organizers with attendees.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        tags: ['Design Systems', 'Interaction Design'],
        className: '',
        caseStudy: {
            hero: {
                videoUrl: '',
                oneLiner: 'Connecting students with campus life through a unified digital ecosystem.',
                role: 'Product Designer',
                timeline: '2 Months'
            },
            context: {
                problem: 'Campus events were fragmented across Facebook groups, posters, and word-of-mouth. Students missed out on opportunities, and organizers struggled to reach their audience.',
                insight: 'A centralized, mobile-first platform is essential for a vibrant campus community.'
            },
            features: [
                {
                    title: 'Event Discovery',
                    description: 'A personalized feed of events based on student interests, major, and social circle.',
                    mediaType: 'image',
                    mediaUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    layout: 'full-width'
                },
                {
                    title: 'Ticketing & Check-in',
                    description: 'Seamless in-app ticketing and QR code check-in for smooth entry management.',
                    mediaType: 'image',
                    mediaUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    layout: 'two-column'
                }
            ],
            process: {
                designSystemUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                wireframeUrl: ''
            },
            impact: [
                'Adopted by 5 major student organizations.',
                'Processed over 2,000 tickets in the first semester.',
                'Increased event attendance by 30%.'
            ]
        }
    }
];

import { Link } from 'react-router-dom';

export default function BentoGrid({ setActiveProject }) {
    return (
        <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
                {PROJECTS.map((project) => (
                    <Link
                        to={project.id === 'photo' ? '/photography' : `/project/${project.id}`}
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
                                    className={`h-full flex flex-col ${project.id === 'photo' ? 'justify-end' : 'justify-between'} p-6 md:p-10 relative z-10`}
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
