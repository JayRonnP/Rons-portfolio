import React, { useEffect, useRef, useState } from 'react';

const GraphicDesignGallery = ({ onBack }) => {
    const galleryRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const [showCaseStudy, setShowCaseStudy] = useState(false);
    const [showLodzCaseStudy, setShowLodzCaseStudy] = useState(false);

    // Global Rating State for this gallery
    const [ratings, setRatings] = useState({
        foodtrip: { userRating: 0, hoverRating: 0, hasRated: false },
        lodz: { userRating: 0, hoverRating: 0, hasRated: false }
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
    };

    const handleHover = (projectId, rating) => {
        setRatings(prev => ({
            ...prev,
            [projectId]: { ...prev[projectId], hoverRating: rating }
        }));
    };

    // Reusable Rating Component
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
            <div ref={galleryRef} className="w-full flex flex-col items-center relative z-10">
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

                {/* Foodtrip Buddy Section */}
                <div className="w-full mb-20 flex flex-col items-center">
                    <div className="max-w-5xl mx-auto w-full bg-[#081208] rounded-2xl p-6 border border-white/5 shadow-2xl mb-12 relative overflow-hidden transition-all duration-500 min-h-[400px]">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-xl font-bold text-white/90 uppercase tracking-widest text-neon-green pl-2">
                                {showCaseStudy ? "Case Study" : "Design Evolution"}
                            </h4>
                            <button
                                onClick={() => setShowCaseStudy(!showCaseStudy)}
                                className="px-5 py-2 rounded-full border border-neon-green/40 text-neon-green text-sm font-semibold tracking-wide hover:bg-neon-green/10 transition-colors duration-300 z-10"
                            >
                                {showCaseStudy ? "View Images" : "Case Study"}
                            </button>
                        </div>

                        <div className="relative w-full h-full">
                            <div className={`transition-all duration-500 ease-in-out absolute inset-0 ${showCaseStudy ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center h-full">
                                    <div className="flex flex-col items-center group">
                                        <span className="text-white/50 font-medium mb-3 uppercase tracking-wider text-sm">Previous</span>
                                        <div className="w-full relative rounded-xl overflow-hidden border border-white/10 hover:border-red-500/50 bg-black aspect-square flex items-center justify-center cursor-pointer" onClick={() => setSelectedImage('/Old-fudtrip.jpg')}>
                                            <img src="/Old-fudtrip.jpg" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 filter grayscale-[20%] group-hover:grayscale-0" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center group">
                                        <span className="text-neon-green/80 font-medium mb-3 uppercase tracking-wider text-sm">Redesign</span>
                                        <div className="w-full relative rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 bg-[#0a1a0a] aspect-square flex items-center justify-center cursor-pointer" onClick={() => setSelectedImage('/FOODTRIP-BUDDY.png')}>
                                            <img src="/FOODTRIP-BUDDY.png" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                                        </div>
                                    </div>
                                    {/* Rating for Foodtrip */}
                                    <div className="flex justify-center">
                                        <ProjectRating projectId="foodtrip" />
                                    </div>
                                </div>
                            </div>

                            <div className={`transition-all duration-500 ease-in-out w-full max-h-[600px] overflow-y-auto ${showCaseStudy ? 'opacity-100 translate-x-0 relative' : 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'}`}>
                                <div className="p-4 md:p-8 bg-[#0a1a0a] rounded-xl border border-neon-green/20 min-h-full">
                                    <h3 className="text-2xl font-bold text-white mb-6">Foodtrip Buddy Redesign</h3>
                                    <div className="space-y-6 text-white/80 text-sm md:text-base">
                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase text-xs">The Problem</h5>
                                            <p>Extreme text crowding and low legibility in the original design led to customer visual fatigue.</p>
                                        </div>
                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase text-xs">The Solution</h5>
                                            <p>High-contrast colors and clear visual hierarchy to ensure the menu is visible and readable from a distance.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lodz Bar Section */}
                <div className="w-full mb-12">
                    <div className="max-w-5xl mx-auto w-full bg-[#081208] rounded-2xl p-6 border border-white/5 shadow-2xl mb-12 relative overflow-hidden transition-all duration-500 min-h-[400px]">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-xl font-bold text-white/90 uppercase tracking-widest text-neon-green pl-2">
                                {showLodzCaseStudy ? "Case Study" : "LODZ BAR"}
                            </h4>
                            <button
                                onClick={() => setShowLodzCaseStudy(!showLodzCaseStudy)}
                                className="px-5 py-2 rounded-full border border-neon-green/40 text-neon-green text-sm font-semibold tracking-wide hover:bg-neon-green/10 transition-colors duration-300 z-10"
                            >
                                {showLodzCaseStudy ? "View Images" : "Case Study"}
                            </button>
                        </div>

                        <div className="relative w-full h-full">
                            <div className={`transition-all duration-500 ease-in-out absolute inset-0 ${showLodzCaseStudy ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center h-full">
                                    <div onClick={() => setSelectedImage('/LODZ-GRAPHIC.jpg')} className="group w-full relative h-[300px] rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 bg-[#0a1a0a] flex items-center justify-center cursor-pointer">
                                        <img src="/LODZ-GRAPHIC.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div onClick={() => setSelectedImage('/Screenshot 2026-02-27 010303.png')} className="group w-full relative h-[300px] rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 bg-[#0a1a0a] flex items-center justify-center cursor-pointer">
                                        <img src="/Screenshot 2026-02-27 010303.png" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    {/* Rating for Lodz */}
                                    <div className="flex justify-center">
                                        <ProjectRating projectId="lodz" />
                                    </div>
                                </div>
                            </div>

                            <div className={`transition-all duration-500 ease-in-out w-full max-h-[600px] overflow-y-auto ${showLodzCaseStudy ? 'opacity-100 translate-x-0 relative' : 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'}`}>
                                <div className="p-4 md:p-8 bg-[#0a1a0a] rounded-xl border border-neon-green/20 min-h-full">
                                    <h3 className="text-2xl font-bold text-white mb-6">Lodz Bar Identity</h3>
                                    <p className="text-white/80 mb-4">Establishing a gritty, authentic brand feel from print graphics to digital interfaces.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/20" onClick={() => setSelectedImage(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    <img src={selectedImage} className="max-w-full max-h-full object-contain rounded-lg shadow-2xlSelect-none animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </>
    );
};

export default GraphicDesignGallery;
