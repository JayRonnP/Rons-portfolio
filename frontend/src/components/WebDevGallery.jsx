import React, { useEffect, useRef, useState } from 'react';

const WebDevGallery = ({ onBack }) => {
    const galleryRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showCaseStudy, setShowCaseStudy] = useState(false);

    useEffect(() => {
        let isInitialRender = true;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && !isInitialRender) {
                    onBack();
                }
                isInitialRender = false;
            },
            {
                root: null,
                rootMargin: '200px',
                threshold: 0
            }
        );

        if (galleryRef.current) {
            observer.observe(galleryRef.current);
        }

        return () => {
            if (galleryRef.current) {
                observer.unobserve(galleryRef.current);
            }
        };
    }, [onBack]);

    return (
        <>
            <div ref={galleryRef} className="w-full flex flex-col items-center relative z-10 animate-fade-in-up">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="self-start mb-12 flex items-center gap-2 text-white/70 hover:text-neon-green transition-colors duration-300 font-medium group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Projects
                </button>

                {/* Caelum Financial Solutions Section */}
                <div className="w-full mb-20 flex flex-col items-center">

                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">Caelum Financial Solutions</h3>
                        <p className="text-neon-green/80 font-medium tracking-widest uppercase text-sm mb-4">Frontend Intern Project</p>
                        <p className="text-white/70 leading-relaxed text-lg px-4">
                            Developing clean, data-rich dashboards and scalable UI components for modern financial tools.
                        </p>
                    </div>

                    {/* Case Study & Feature Showcase */}
                    <div className="max-w-5xl mx-auto w-full bg-[#081208] rounded-2xl p-6 border border-white/5 shadow-2xl mb-12 relative overflow-hidden transition-all duration-500 min-h-[500px]">

                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-xl font-bold text-white/90 uppercase tracking-widest text-neon-green pl-2">
                                {showCaseStudy ? "Case Study" : "Dashboard UI"}
                            </h4>
                            <button
                                onClick={() => setShowCaseStudy(!showCaseStudy)}
                                className="px-5 py-2 rounded-full border border-neon-green/40 text-neon-green text-sm font-semibold tracking-wide hover:bg-neon-green/10 transition-colors duration-300 z-10"
                            >
                                {showCaseStudy ? "View UI" : "View Case Study"}
                            </button>
                        </div>

                        <div className="relative w-full h-full">
                            {/* Dashboard Images (Front) */}
                            <div className={`transition-all duration-500 ease-in-out absolute inset-0 ${showCaseStudy ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">

                                    {/* Feature 1 */}
                                    <div
                                        onClick={() => setSelectedImage('/Screenshot 2026-03-02 094351.png')}
                                        className="group w-full relative h-[250px] md:h-[350px] rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 transition-all duration-500 bg-[#0a1a0a] flex items-center justify-center cursor-pointer shadow-lg"
                                    >
                                        <img
                                            src="/Screenshot 2026-03-02 094351.png"
                                            alt="Caelum Dashboard 1"
                                            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <span className="text-white font-medium tracking-wide">Financial Overview Panel</span>
                                        </div>
                                    </div>

                                    {/* Feature 2 */}
                                    <div
                                        onClick={() => setSelectedImage('/Screenshot 2026-03-02 094404.png')}
                                        className="group w-full relative h-[250px] md:h-[350px] rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 transition-all duration-500 bg-[#0a1a0a] flex items-center justify-center cursor-pointer shadow-lg"
                                    >
                                        <img
                                            src="/Screenshot 2026-03-02 094404.png"
                                            alt="Caelum Dashboard 2"
                                            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <span className="text-white font-medium tracking-wide">Client Metrics View</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Case Study Side (Back) */}
                            <div className={`transition-all duration-500 ease-in-out w-full max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${showCaseStudy ? 'opacity-100 translate-x-0 relative' : 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'}`}>
                                <div className="p-4 md:p-8 bg-[#0a1a0a] rounded-xl border border-neon-green/20 min-h-full">
                                    <h3 className="text-2xl font-bold text-white mb-6 sticky top-0 bg-[#0a1a0a] z-10 py-2 border-b border-white/5">Frontend Engineering Intern</h3>

                                    <div className="space-y-8 text-white/80 leading-relaxed text-sm md:text-base pb-4">
                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">Project Overview</h5>
                                            <p>During my internship at <strong className="text-white">Caelum Financial Solutions</strong>, I was responsible for transforming wireframes and complex data requirements into scalable, responsive React components tailored for financial analysts and administrative users.</p>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">Technical Stack</h5>
                                            <div className="flex gap-2 flex-wrap mb-3 mt-1">
                                                {['React', 'Tailwind CSS', 'JavaScript', 'Vite', 'Git'].map(tech => (
                                                    <span key={tech} className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-neon-green/20 text-neon-green/60 bg-neon-green/5">{tech}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">Key Contributions</h5>
                                            <ul className="list-disc pl-5 space-y-3">
                                                <li><strong className="text-white">Component Architecture:</strong> Built modular React components (statistic cards, tables, navigation elements) that were reused across multiple dashboard views, reducing overall codebase size.</li>
                                                <li><strong className="text-white">Responsive Layouts:</strong> Utilized Tailwind CSS to ensure that dense data tables and charts remained readable and functional across desktop, tablet, and mobile breakpoints.</li>
                                                <li><strong className="text-white">State Management:</strong> Implemented hooks to manage complex UI states (e.g., filtering lists, toggling sidebars, tab navigation) seamlessly without page reloads.</li>
                                                <li><strong className="text-white">UI Polish:</strong> Enhanced user experience with subtle hover states, transition animations, and dark mode aesthetic alignment using specific Tailwind color palettes.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">Learning & Impact</h5>
                                            <p>This project bridged the gap between my design sensibilities and my technical execution. I learned how to handle complex DOM structures required by data-heavy apps while maintaining strict adherence to the company's design system. The resulting interfaces allowed analysts to view client portfolios and system metrics with significantly improved clarity.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Secondary Assets Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
                        <div
                            onClick={() => setSelectedImage('/Screenshot 2026-03-03 135506.png')}
                            className="group relative rounded-xl h-[300px] overflow-hidden border border-white/10 hover:border-neon-green/50 transition-all duration-500 bg-[#0a1a0a] flex items-center justify-center cursor-pointer shadow-lg"
                        >
                            <img
                                src="/Screenshot 2026-03-03 135506.png"
                                alt="Caelum Component Map"
                                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-medium tracking-wide text-sm">Interactive Map Integration</span>
                            </div>
                        </div>

                        <div
                            onClick={() => setSelectedImage('/Screenshot 2026-03-03 141438.png')}
                            className="group relative rounded-xl h-[300px] overflow-hidden border border-white/10 hover:border-neon-green/50 transition-all duration-500 bg-[#0a1a0a] flex items-center justify-center cursor-pointer shadow-lg"
                        >
                            <img
                                src="/Screenshot 2026-03-03 141438.png"
                                alt="Caelum Settings Panel"
                                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-medium tracking-wide text-sm">Administrative Controls UI</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Lightbox / Fullscreen Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/20 z-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                        </svg>
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center max-w-6xl mx-auto overflow-hidden">
                        <img
                            src={selectedImage}
                            alt="Fullscreen View"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl ring-1 ring-white/10 select-none animate-in fade-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default WebDevGallery;
