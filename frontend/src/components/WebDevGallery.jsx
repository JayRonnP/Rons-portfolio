import React, { useEffect, useRef, useState } from 'react';

const WebDevGallery = ({ onBack }) => {
    const galleryRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showCaseStudy, setShowCaseStudy] = useState(false);
    const [activeTab, setActiveTab] = useState('design');

    // Global Rating State for this gallery
    const [ratings, setRatings] = useState({
        design: { userRating: 0, hoverRating: 0, hasRated: false },
        frontend: { userRating: 0, hoverRating: 0, hasRated: false }
    });

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

    const handleRate = (projectId, rating) => {
        setRatings(prev => ({
            ...prev,
            [projectId]: { ...prev[projectId], userRating: rating, hasRated: true }
        }));
        console.log(`Project ${projectId} rated: ${rating} stars`);
    };

    const handleHover = (projectId, rating) => {
        setRatings(prev => ({
            ...prev,
            [projectId]: { ...prev[projectId], hoverRating: rating }
        }));
    };

    // Reusable Rating Component for this file
    const ProjectRating = ({ projectId }) => {
        const project = ratings[projectId];

        return (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:w-64 flex flex-col items-center gap-4 pointer-events-auto shadow-xl group/rating overflow-hidden relative">
                {project.hasRated ? (
                    <div className="flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 py-2">
                        <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center mb-3 border border-neon-green/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39ff14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>
                        <p className="text-neon-green font-bold text-xs uppercase tracking-widest">Feedback Received!</p>
                    </div>
                ) : (
                    <>
                        <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Rate this work</span>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onMouseEnter={() => handleHover(projectId, star)}
                                    onMouseLeave={() => handleHover(projectId, 0)}
                                    onClick={() => handleRate(projectId, star)}
                                    className="transition-all duration-300 hover:scale-125 focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill={(project.hoverRating || project.userRating) >= star ? "#39ff14" : "none"}
                                        stroke={(project.hoverRating || project.userRating) >= star ? "#39ff14" : "rgba(255,255,255,0.2)"}
                                        strokeWidth="2"
                                        className={`transition-colors duration-300 ${(project.hoverRating || project.userRating) >= star ? 'drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]' : ''}`}
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                        <p className="text-white/40 text-[9px] font-medium tracking-[0.1em]">Share your thoughts</p>
                    </>
                )}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-neon-green/5 rounded-full blur-2xl pointer-events-none" />
            </div>
        );
    };

    return (
        <>
            <div ref={galleryRef} className="w-full flex flex-col items-center relative z-10 animate-fade-in-up">
                {/* Header Section */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                    {/* Back Button */}
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/70 hover:text-neon-green transition-colors duration-300 font-medium group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to Projects
                    </button>

                    {/* Section Switcher */}
                    <div className="flex bg-[#081208] p-1.5 rounded-full border border-white/10 shadow-lg">
                        <button
                            onClick={() => setActiveTab('design')}
                            className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'design' ? 'bg-neon-green text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'text-white/50 hover:text-white'}`}
                        >
                            Web Design
                        </button>
                        <button
                            onClick={() => setActiveTab('frontend')}
                            className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'frontend' ? 'bg-neon-green text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'text-white/50 hover:text-white'}`}
                        >
                            Front-end Developing
                        </button>
                    </div>
                </div>

                {activeTab === 'frontend' ? (
                    <div className="w-full mb-20 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">Front-end Development</h3>
                            <p className="text-neon-green/80 font-medium tracking-widest uppercase text-sm mb-4">Caelum Financial Solutions</p>
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
                                {/* Dashboard Images View */}
                                <div className={`transition-all duration-500 ease-in-out absolute inset-0 ${showCaseStudy ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center h-full">
                                        <div onClick={() => setSelectedImage('/Screenshot 2026-03-02 094351.png')} className="group w-full relative h-[250px] md:h-[350px] rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 bg-[#0a1a0a] flex items-center justify-center cursor-pointer">
                                            <img src="/Screenshot 2026-03-02 094351.png" className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700" />
                                        </div>
                                        <div onClick={() => setSelectedImage('/Screenshot 2026-03-02 094404.png')} className="group w-full relative h-[250px] md:h-[350px] rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 bg-[#0a1a0a] flex items-center justify-center cursor-pointer">
                                            <img src="/Screenshot 2026-03-02 094404.png" className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700" />
                                        </div>
                                        <div className="flex justify-center items-center h-full">
                                            <ProjectRating projectId="frontend" />
                                        </div>
                                    </div>
                                </div>

                                {/* Case Study View */}
                                <div className={`transition-all duration-500 ease-in-out w-full max-h-[600px] overflow-y-auto ${showCaseStudy ? 'opacity-100 translate-x-0 relative' : 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'}`}>
                                    <div className="p-4 md:p-8 bg-[#0a1a0a] rounded-xl border border-neon-green/20 min-h-full">
                                        <h3 className="text-2xl font-bold text-white mb-6">Frontend Engineering Intern</h3>
                                        <div className="space-y-8 text-white/80 leading-relaxed text-sm md:text-base">
                                            <div>
                                                <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">Project Overview</h5>
                                                <p>Transforming complex financial requirements into scalable React components.</p>
                                            </div>
                                            <div>
                                                <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">Key Contributions</h5>
                                                <ul className="list-disc pl-5 space-y-3">
                                                    <li>Modular React Architecture</li>
                                                    <li>Data-Heavy Responsive UI</li>
                                                    <li>Client-Side State Management</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Assets */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
                            <div onClick={() => setSelectedImage('/Screenshot 2026-03-03 135506.png')} className="group relative rounded-xl h-[300px] overflow-hidden border border-white/10 hover:border-neon-green/50 bg-[#0a1a0a] flex items-center justify-center cursor-pointer shadow-lg">
                                <img src="/Screenshot 2026-03-03 135506.png" className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
                            </div>
                            <div onClick={() => setSelectedImage('/Screenshot 2026-03-03 141438.png')} className="group relative rounded-xl h-[300px] overflow-hidden border border-white/10 hover:border-neon-green/50 bg-[#0a1a0a] flex items-center justify-center cursor-pointer shadow-lg">
                                <img src="/Screenshot 2026-03-03 141438.png" className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Web Design Section */
                    <div className="w-full mb-20 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">Web Design</h3>
                            <p className="text-neon-green/80 font-medium tracking-widest uppercase text-sm mb-4">UI/UX Layouts & Design Concepts</p>
                        </div>

                        <div className="w-full max-w-5xl mx-auto">
                            <div className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-neon-green/30 transition-all duration-700 bg-[#0a1a0a] aspect-[16/9] shadow-2xl">
                                <img
                                    src="/Screenshot 2026-03-11 190412.png"
                                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-1000 cursor-pointer"
                                    onClick={() => setSelectedImage('/Screenshot 2026-03-11 190412.png')}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                                    <div className="flex-1">
                                        <p className="text-neon-green text-sm font-bold uppercase tracking-[0.3em] mb-3">Featured Design</p>
                                        <h5 className="text-white font-bold text-4xl mb-4">Double-B Autoshop</h5>
                                        <div className="flex gap-4">
                                            {['Figma', 'UI/UX', 'Product'].map(tag => (
                                                <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-bold uppercase tracking-widest">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <ProjectRating projectId="design" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/20 z-10" onClick={() => setSelectedImage(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    <div className="relative w-full h-full flex items-center justify-center max-w-6xl mx-auto overflow-hidden text-center">
                        <img src={selectedImage} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl ring-1 ring-white/10 select-none animate-in fade-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()} />
                    </div>
                </div>
            )}
        </>
    );
};

export default WebDevGallery;
