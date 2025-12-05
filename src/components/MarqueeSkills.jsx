import { motion } from 'framer-motion';

export default function MarqueeSkills() {
    const skills = [
        "Figma", "Motion Graphics", "Photography", "User Research", "Visual Design", "Video Editing"
    ];

    return (
        <div className="overflow-hidden py-8 border-y border-dark-border bg-dark-lighter/30">
            <motion.div
                className="flex gap-12 text-lg text-gray-400 font-medium whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: "linear",
                }}
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-12 shrink-0 items-center">
                        {skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-12">
                                <span>{skill}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
