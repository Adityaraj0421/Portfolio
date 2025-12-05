import { Mail, Linkedin, Dribbble } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Footer() {
    return (
        <footer className="border-t border-dark-border relative z-10 bg-dark-lighter/20">
            <div className="max-w-6xl mx-auto px-6 py-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div>
                        <h3 className="text-[clamp(3rem,8vw,6rem)] font-display font-bold leading-none mb-8 tracking-tighter">
                            Let's Create<br />Together.
                        </h3>
                        <div className="flex gap-8">
                            <Magnetic>
                                <a href="mailto:kang.applies@gmail.com" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <div className="p-3 rounded-full bg-dark-lighter border border-dark-border group-hover:border-white/20 transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <span className="text-lg">Email</span>
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="#" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <div className="p-3 rounded-full bg-dark-lighter border border-dark-border group-hover:border-white/20 transition-colors">
                                        <Linkedin size={20} />
                                    </div>
                                    <span className="text-lg">LinkedIn</span>
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="#" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <div className="p-3 rounded-full bg-dark-lighter border border-dark-border group-hover:border-white/20 transition-colors">
                                        <Dribbble size={20} />
                                    </div>
                                    <span className="text-lg">Dribbble</span>
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                    <div className="text-gray-600 text-sm">
                        &copy; {new Date().getFullYear()} Aditya Raj. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
