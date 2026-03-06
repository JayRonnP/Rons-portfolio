import React, { useEffect, useRef, useState } from 'react';

const GraphicDesignGallery = ({ onBack }) => {
    const galleryRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const [showCaseStudy, setShowCaseStudy] = useState(false);
    const [showLodzCaseStudy, setShowLodzCaseStudy] = useState(false);

    useEffect(() => {
        let isInitialRender = true;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // If it's not the first render, and the element is completely out of view
                if (!entry.isIntersecting && !isInitialRender) {
                    onBack();
                }

                // Set to false after the first callback runs
                isInitialRender = false;
            },
            {
                root: null,
                rootMargin: '200px', // Allow 200px of scrolling past the element before closing
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
            <div ref={galleryRef} className="w-full flex flex-col items-center relative z-10">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="self-start mb-12 flex items-center gap-2 text-white/70 hover:text-neon-green transition-colors duration-300 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Projects
                </button>

                {/* Foodtrip Buddy Section */}
                <div className="w-full mb-20 flex flex-col items-center">

                    {/* Old vs New Comparison & Case Study */}
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
                            {/* Comparison Side (Front) */}
                            <div className={`transition-all duration-500 ease-in-out absolute inset-0 ${showCaseStudy ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                                    {/* Old Design */}
                                    <div className="flex flex-col items-center group h-full justify-center">
                                        <span className="text-white/50 font-medium mb-3 uppercase tracking-wider text-sm transition-colors group-hover:text-white/80">Previous Design</span>
                                        <div
                                            className="w-full relative rounded-xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-colors duration-500 bg-black aspect-square flex items-center justify-center cursor-pointer"
                                            onClick={() => setSelectedImage('/Old-fudtrip.jpg')}
                                        >
                                            <img
                                                src="/Old-fudtrip.jpg"
                                                alt="Old Foodtrip Buddy Design"
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale-[20%] group-hover:grayscale-0"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <span className="text-white font-medium text-sm drop-shadow-md">Original Layout</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* New Design */}
                                    <div className="flex flex-col items-center group h-full justify-center">
                                        <span className="text-neon-green/80 font-medium mb-3 uppercase tracking-wider text-sm transition-colors group-hover:text-neon-green">Redesign</span>
                                        <div
                                            className="w-full relative rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 transition-colors duration-500 bg-[#0a1a0a] aspect-square flex items-center justify-center cursor-pointer"
                                            onClick={() => setSelectedImage('/FOODTRIP-BUDDY.png')}
                                        >
                                            <img
                                                src="/FOODTRIP-BUDDY.png"
                                                alt="New Foodtrip Buddy Design"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <span className="text-white font-medium text-sm drop-shadow-md">Vibrant Update</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Case Study Side (Back) */}
                            <div className={`transition-all duration-500 ease-in-out w-full max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${showCaseStudy ? 'opacity-100 translate-x-0 relative' : 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'}`}>
                                <div className="p-4 md:p-8 bg-[#0a1a0a] rounded-xl border border-neon-green/20 min-h-full">
                                    <h3 className="text-2xl font-bold text-white mb-6 sticky top-0 bg-[#0a1a0a] z-10 py-2 border-b border-white/5">Foodtrip Buddy Menu Redesign</h3>
                                    <div className="space-y-8 text-white/80 leading-relaxed text-sm md:text-base pb-4">

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">1. Project Overview</h5>
                                            <div className="space-y-2">
                                                <p><strong className="text-white">What is this?:</strong> A complete visual overhaul of the "Foodtrip Buddy" menu board to improve readability and sales impact.</p>
                                                <p><strong className="text-white">Timeline:</strong> 1 Week.</p>
                                                <p><strong className="text-white">My Role:</strong> Lead Graphic Designer / Brand Strategist.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">2. The Problem</h5>
                                            <div className="space-y-2">
                                                <p><strong className="text-white">What issue exists?:</strong> The original design suffered from extreme text crowding and low legibility. Important information like price points and item categories blended together, creating "visual fatigue" for the customer.</p>
                                                <p><strong className="text-white">Who experiences it?:</strong> Customers at the food stall who need to make quick ordering decisions, and the business owner who loses potential sales due to a lack of "appetite appeal" in the layout.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">3. Research</h5>
                                            <div className="space-y-2">
                                                <p><strong className="text-white">Analysis of Old Design:</strong> The "Before" image used a flat beige background with thin red text, which lacked the contrast needed for outdoor or high-traffic environments.</p>
                                                <p><strong className="text-white">Market Trends:</strong> Modern food branding favors high-contrast colors (like yellow and red) which are scientifically proven to stimulate appetite and grab attention quickly.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">4. Define</h5>
                                            <div className="space-y-2">
                                                <p><strong className="text-white">Target User:</strong> On-the-go "foodies" and budget-conscious diners looking for a quick, premium-feeling snack.</p>
                                                <p><strong className="text-white">Problem Statement:</strong> "How might we redesign the menu to cut through visual noise and present our 'Special Menu' as a premium must-have item?"</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">5. Ideation</h5>
                                            <div className="space-y-2">
                                                <p><strong className="text-white">Wireframes:</strong> I shifted from a list-based layout to a grid-based layout using vertical dividers to create "breathing room".</p>
                                                <p><strong className="text-white">Feature Prioritization:</strong> I decided to highlight the Hungarian Sausage and Cheese Sticks as the "hero" products using larger-than-life imagery and fire/cheese effects.</p>
                                                <p><strong className="text-white">MVP Decision:</strong> The focus was placed on the "Special Menu" banner to ensure the highest-margin items were seen first.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">6. Final Design</h5>
                                            <p className="mb-2">The new design implements a Modern-Premium aesthetic:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong className="text-white">High Contrast:</strong> A vibrant yellow background paired with bold black and red typography.</li>
                                                <li><strong className="text-white">Visual Hierarchy:</strong> Prices are enlarged and bolded for instant clarity.</li>
                                                <li><strong className="text-white">Dynamic Imagery:</strong> Added high-quality assets like melting cheese and realistic flames to create an "arresting" visual experience.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">7. Impact</h5>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong className="text-white">Commanding Attention:</strong> The use of bold color theory now ensures the menu is visible from a distance.</li>
                                                <li><strong className="text-white">Improved UX:</strong> Customers can now distinguish between "Plain" and "With Egg" options in seconds, reducing ordering friction.</li>
                                                <li><strong className="text-white">Brand Elevation:</strong> The transition from a "generic list" to a "designed menu" increases the perceived value of the food.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">8. Reflection</h5>
                                            <p>This project taught me the importance of Visual Hierarchy. By removing the "crowded" text of the old design and focusing on a few high-impact elements, I was able to create a design that doesn't just inform the customer, but actually sells the product.</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paragraph Area for Foodtrip Buddy */}
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h3 className="text-3xl font-bold text-white mb-4">Foodtrip Buddy Showcase</h3>
                        <p className="text-white/70 leading-relaxed text-lg">
                            This small project goal is to achieve a contrast vibrant color to be eye catching in the eyes of the customer
                        </p>
                    </div>

                    {/* Project Assets Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

                        {/* Image 1 */}
                        <div
                            onClick={() => setSelectedImage('/FOODTRIP-BUDDY.png')}
                            className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 transition-colors duration-500 bg-[#0a1a0a] aspect-square flex items-center justify-center cursor-pointer"
                        >
                            <img
                                src="/FOODTRIP-BUDDY.png"
                                alt="Foodtrip Buddy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-medium tracking-wide">Brand Identity</span>
                            </div>
                        </div>

                        {/* Video - (Usually full screen is handled natively or in a modal, left unclickable for now since it autoplays, but we can make it a modal too if desired) */}
                        <div className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 transition-colors duration-500 bg-[#0a1a0a] aspect-square flex items-center justify-center">
                            <video
                                src="/FTBUDDY.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                                <span className="text-white font-medium tracking-wide">Brand Animation</span>
                            </div>
                        </div>

                        {/* Image 2 */}
                        <div
                            onClick={() => setSelectedImage('/FTBUDDY1.png')}
                            className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 transition-colors duration-500 bg-[#0a1a0a] aspect-square flex items-center justify-center cursor-pointer"
                        >
                            <img
                                src="/FTBUDDY1.png"
                                alt="Foodtrip Buddy Variant"
                                className="w-full h-full object-cover p-4 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-medium tracking-wide text-sm">Visual Concept</span>
                            </div>
                        </div>

                        {/* Image 3 (New: Foodbuds) */}
                        <div
                            onClick={() => setSelectedImage('/Foodbuds.jpg')}
                            className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 transition-colors duration-500 bg-[#0a1a0a] aspect-square flex items-center justify-center cursor-pointer"
                        >
                            <img
                                src="/Foodbuds.jpg"
                                alt="Foodtrip Buddy Setup"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-medium tracking-wide text-sm">Setup Concept</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Projects Section */}
                <div className="w-full mb-12">

                    {/* Other Works Comparison & Case Study */}
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
                            {/* Images Side (Front) */}
                            <div className={`transition-all duration-500 ease-in-out absolute inset-0 ${showLodzCaseStudy ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                                    {/* Image 3 */}
                                    <div
                                        onClick={() => setSelectedImage('/LODZ-GRAPHIC.jpg')}
                                        className="group w-full relative h-[300px] rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 transition-colors duration-500 bg-[#0a1a0a] flex items-center justify-center cursor-pointer"
                                    >
                                        <img
                                            src="/LODZ-GRAPHIC.jpg"
                                            alt="Lodz Graphic"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <span className="text-white font-medium tracking-wide text-sm">Lodz Graphic</span>
                                        </div>
                                    </div>

                                    {/* Image 4 */}
                                    <div
                                        onClick={() => setSelectedImage('/Screenshot 2026-02-27 010303.png')}
                                        className="group w-full relative h-[300px] rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/50 transition-colors duration-500 bg-[#0a1a0a] flex items-center justify-center cursor-pointer"
                                    >
                                        <img
                                            src="/Screenshot 2026-02-27 010303.png"
                                            alt="UI Screenshot"
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <span className="text-white font-medium tracking-wide text-sm">Project Interface</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Case Study Side (Back) */}
                            <div className={`transition-all duration-500 ease-in-out w-full max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${showLodzCaseStudy ? 'opacity-100 translate-x-0 relative' : 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'}`}>
                                <div className="p-4 md:p-8 bg-[#0a1a0a] rounded-xl border border-neon-green/20 min-h-full">
                                    <h3 className="text-2xl font-bold text-white mb-6 sticky top-0 bg-[#0a1a0a] z-10 py-2 border-b border-white/5">Lodz Bar Project</h3>

                                    <div className="space-y-6 text-white/80 leading-relaxed text-sm md:text-base pb-4">

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">My Responsibilities</h5>
                                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                                <li><strong className="text-white">Brand Identity Creation:</strong> Designing the core visual language, logos, and stylistic tone that defines the Lodz Bar brand.</li>
                                                <li><strong className="text-white">Poster Design:</strong> Creating high-impact promotional graphics (as seen in the Lodz Graphic) utilizing strong typography and gritty textures.</li>
                                                <li><strong className="text-white">Menu Design:</strong> Structuring the bar's offerings into an easily readable, stylistically cohesive menu format.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">Concept</h5>
                                            <p>Developing a cohesive visual identity that spans both traditional graphic design and modern digital interfaces, ensuring the gritty, authentic feel translates perfectly from print to screen.</p>
                                        </div>

                                        <div>
                                            <h5 className="text-neon-green font-semibold mb-2 uppercase tracking-wide text-xs">Execution</h5>
                                            <p>The Lodz graphic focuses on strong, imposing typography layered with texture. In contrast, the UI implementation employs clean layouts and strict grid systems to prioritize usability while maintaining stylistic nods to the core branding.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Lightbox / Fullscreen Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/20"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                        </svg>
                    </button>

                    <img
                        src={selectedImage}
                        alt="Fullscreen View"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl ring-1 ring-white/10 select-none animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking the image itself */
                    />
                </div>
            )}
        </>
    );
};

export default GraphicDesignGallery;
