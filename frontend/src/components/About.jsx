import React from 'react';
import {
    SiTailwindcss, SiReact, SiNodedotjs,
    SiFigma, SiCanva, SiJavascript, SiHtml5, SiCss3,
} from 'react-icons/si';

const skills = [
    { Icon: SiTailwindcss, label: 'Tailwind', color: '#38bdf8', glow: 'rgba(56,189,248,0.35)' },
    { Icon: SiReact, label: 'React', color: '#61dafb', glow: 'rgba(97,218,251,0.35)' },
    { Icon: SiNodedotjs, label: 'Node.js', color: '#339933', glow: 'rgba(51,153,51,0.35)' },
    { Icon: SiFigma, label: 'Figma', color: '#f24e1e', glow: 'rgba(242,78,30,0.35)' },
    { Icon: SiCanva, label: 'Canva', color: '#00c4cc', glow: 'rgba(0,196,204,0.35)' },
    { Icon: SiJavascript, label: 'JS', color: '#f7df1e', glow: 'rgba(247,223,30,0.35)' },
    { Icon: SiHtml5, label: 'HTML5', color: '#e34f26', glow: 'rgba(227,79,38,0.35)' },
    { Icon: SiCss3, label: 'CSS3', color: '#1572b6', glow: 'rgba(21,114,182,0.35)' },
];

const About = () => {
    return (
        <section id="about" className="py-24 px-6 relative">
            <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase mb-10">
                    About Me
                </h2>

                {/* Bio card with animated gradient border */}
                <div className="relative p-[1px] rounded-3xl mb-16 overflow-hidden group">
                    <div
                        className="absolute inset-0 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                            background: 'linear-gradient(135deg, rgba(57,255,20,0.4), transparent 50%, rgba(57,255,20,0.2))',
                            animation: 'borderSpin 6s linear infinite',
                        }}
                    />
                    <div className="relative bg-[#081208] rounded-3xl px-8 py-10">
                        <p className="text-subtle-gray text-sm md:text-base leading-relaxed mx-auto">
                            Motivated Information Technology student specializing in the intersection of technical development and visual storytelling. Experienced in creating high-impact digital assets and accessible web interfaces. Seeking to apply a diverse toolkit ranging from front-end dev to Canva-based design within a forward-thinking creative team.
                        </p>
                    </div>
                </div>

                {/* Skills heading */}
                <p className="text-xs text-white/40 tracking-[0.3em] uppercase mb-8">Tech &amp; Tools</p>

                {/* Tech Icons Grid */}
                <div className="flex flex-wrap justify-center items-start gap-6 md:gap-10">
                    {skills.map(({ Icon, label, color, glow }) => (
                        <div key={label} className="group flex flex-col items-center gap-2">
                            <div
                                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card-bg border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2"
                                style={{
                                    '--glow': glow,
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = color + '80';
                                    e.currentTarget.style.boxShadow = `0 0 20px ${glow}`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = '';
                                    e.currentTarget.style.boxShadow = '';
                                }}
                            >
                                <Icon className="text-2xl md:text-3xl opacity-80 group-hover:opacity-100 transition-opacity" style={{ color }} />
                            </div>
                            <span className="text-[10px] text-white/40 tracking-widest uppercase group-hover:text-white/70 transition-colors">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ambient glow at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-1 bg-neon-green/20 blur-[60px] shadow-[0_-20px_100px_rgba(57,255,20,0.2)]" />
        </section>
    );
};

export default About;
