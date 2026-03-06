import React, { useState } from 'react';
import GraphicDesignGallery from './GraphicDesignGallery';
import WebDevGallery from './WebDevGallery';

const tags = {
    'graphic-design': ['Figma', 'Canva'],
    'web-dev': ['React', 'Tailwind', 'Node.js'],
};

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    return (
        <section id="projects" className="py-24 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <h2 className={`text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase mb-12 text-center transition-opacity duration-500 ${activeCategory ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
                    Projects
                </h2>

                {activeCategory === 'graphic-design' ? (
                    <GraphicDesignGallery onBack={() => setActiveCategory(null)} />
                ) : activeCategory === 'web-dev' ? (
                    <WebDevGallery onBack={() => setActiveCategory(null)} />
                ) : (
                    <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto animate-fade-in-up">
                        {/* Card 1 — Graphic Design */}
                        <div
                            onClick={() => setActiveCategory('graphic-design')}
                            className="group flex-1 bg-gradient-to-tr from-[#0a1a0a] to-[#152a15] rounded-[2rem] border border-white/5 shadow-[inset_0_0_20px_rgba(57,255,20,0.02)] hover:shadow-[inset_0_0_30px_rgba(57,255,20,0.08)] hover:-translate-y-2 hover:border-neon-green/30 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden gap-4 px-6"
                        >
                            {/* shimmer sweep */}
                            <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute -inset-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />

                            <h3 className="text-3xl font-bold text-white tracking-wide relative z-10 text-center">Graphic<br />Design</h3>
                            <div className="flex flex-wrap gap-2 justify-center relative z-10">
                                {tags['graphic-design'].map(t => (
                                    <span key={t} className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-neon-green/20 text-neon-green/60 bg-neon-green/5 group-hover:border-neon-green/40 group-hover:text-neon-green/90 transition-all duration-300">{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Card 2 — Web Development */}
                        <div
                            onClick={() => setActiveCategory('web-dev')}
                            className="group flex-1 bg-gradient-to-tr from-[#0a1a0a] to-[#152a15] rounded-[2rem] border border-white/5 shadow-[inset_0_0_20px_rgba(57,255,20,0.02)] hover:shadow-[inset_0_0_30px_rgba(57,255,20,0.08)] hover:-translate-y-2 hover:border-neon-green/30 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden gap-4 px-6"
                        >
                            <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute -inset-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />

                            <h3 className="text-3xl font-bold text-white tracking-wide relative z-10 text-center">Web<br />Development</h3>
                            <div className="flex flex-wrap gap-2 justify-center relative z-10">
                                {tags['web-dev'].map(t => (
                                    <span key={t} className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-neon-green/20 text-neon-green/60 bg-neon-green/5 group-hover:border-neon-green/40 group-hover:text-neon-green/90 transition-all duration-300">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Background glow behind projects */}
            <div className="absolute -bottom-64 right-0 w-96 h-96 bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default Projects;
