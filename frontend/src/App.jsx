import React from 'react';
import TopNav from './components/TopNav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

const WaveSeparator = ({ invert = false, fillClass = "fill-[#050a05]", className = '' }) => (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
        <svg
            className={`relative block w-[calc(100%+1.3px)] h-[80px] md:h-[150px] ${invert ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
        >
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className={fillClass}
            ></path>
        </svg>
    </div>
);

function App() {
    return (
        <div className="min-h-screen text-white font-sans selection:bg-neon-green/30 selection:text-white relative">
            <TopNav />
            <main>
                <Hero />

                {/* Transition into darker section */}
                <WaveSeparator fillClass="fill-[#081208]" />

                <div className="bg-[#081208]">
                    <About />
                    <Projects />
                </div>


                {/* Footer has its own dark bg #050a05 and wave */}
            </main>
            <Footer />
        </div>
    );
}

export default App;
