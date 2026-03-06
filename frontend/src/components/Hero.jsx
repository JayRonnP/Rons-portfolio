import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaLinkedinIn, FaChevronDown } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import ParticleBackground from './ParticleBackground';

const TYPING_TEXTS = ['UI/UX Designer', 'Web Development'];
const TYPING_SPEED = 80;
const DELETING_SPEED = 50;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

const Hero = () => {
    const [displayed, setDisplayed] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = TYPING_TEXTS[textIndex];
        let timeout;

        if (!isDeleting && displayed === current) {
            timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        } else if (isDeleting && displayed === '') {
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setTextIndex((i) => (i + 1) % TYPING_TEXTS.length);
            }, PAUSE_AFTER_DELETE);
        } else if (isDeleting) {
            timeout = setTimeout(
                () => setDisplayed((d) => d.slice(0, -1)),
                DELETING_SPEED
            );
        } else {
            timeout = setTimeout(
                () => setDisplayed(current.slice(0, displayed.length + 1)),
                TYPING_SPEED
            );
        }

        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, textIndex]);

    return (
        <section id="home" className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Particle canvas */}
            <ParticleBackground count={70} />

            {/* Animated grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(57,255,20,1) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    animation: 'gridPan 20s linear infinite',
                }}
            />

            {/* Background gradients/glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-green/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-green/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Typography */}
            <div className="text-center z-20 mb-20 animate-fade-in-up">
                <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold mb-6 tracking-tight">
                    I'm <span className="text-neon-green text-glow">Jiron</span>
                </h1>
                <div className="flex items-center justify-center gap-6">
                    <div className="w-16 md:w-32 h-[3px] bg-white/50" />
                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 tracking-wide min-w-[12ch]">
                        {displayed}
                        <span className="inline-block w-[3px] h-[1em] bg-white/80 ml-1 align-middle animate-[blink_1s_step-end_infinite]" />
                    </p>
                </div>
            </div>

            {/* Illustration Area */}
            <div className="relative w-full max-w-2xl mx-auto h-[500px] flex items-end justify-center mt-10 group">

                {/* Full-width Blob platform */}
                <div className="absolute bottom-6 w-[100%] left-[0%] h-32 md:h-48 transition-all duration-700 group-hover:drop-shadow-[0_-5px_50px_rgba(57,255,20,0.3)]">
                    <svg viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-neon-green/90 drop-shadow-[0_-10px_40px_rgba(57,255,20,0.15)]" preserveAspectRatio="none">
                        <path fill="currentColor" d="M110,240 C310,140 450,40 680,120 C850,180 940,230 980,260 C990,265 995,275 990,285 C950,380 880,390 700,380 C550,370 200,420 80,310 C60,290 80,250 110,240 Z" />
                    </svg>
                </div>

                {/* Floating Icons */}
                <a
                    href="https://web.facebook.com/jiron.panday"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-[10%] left-[15%] md:left-[18%] z-30 w-16 h-16 md:w-20 md:h-20 bg-[#1877F2] rounded-2xl flex items-center justify-center transform -rotate-[30deg] animate-float hover:scale-110 transition-transform cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:-translate-y-4 group-hover:-translate-x-4 group-hover:-rotate-[40deg] duration-700"
                >
                    <FaFacebookF className="text-3xl md:text-4xl text-white pointer-events-none" />
                </a>

                <a
                    href="mailto:jiron.panday45@gmail.com"
                    className="absolute top-[5%] right-[20%] md:right-[22%] z-30 w-16 h-16 md:w-20 md:h-20 bg-[#202124] rounded-3xl flex items-center justify-center transform rotate-[10deg] animate-[float_5s_ease-in-out_infinite_1s] hover:scale-110 transition-transform cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10 group-hover:-translate-y-6 group-hover:translate-x-2 group-hover:rotate-[20deg] duration-700"
                >
                    <SiGmail className="text-3xl md:text-4xl text-white pointer-events-none" />
                </a>

                <a
                    href="https://www.linkedin.com/in/jiron-panday-929676374/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-[40%] right-[10%] md:right-[12%] z-30 w-16 h-16 md:w-20 md:h-20 bg-[#0077B5] rounded-2xl flex items-center justify-center transform rotate-[20deg] animate-[float_7s_ease-in-out_infinite_0.5s] hover:scale-110 transition-transform cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:translate-y-4 group-hover:translate-x-6 group-hover:rotate-[30deg] duration-700"
                >
                    <FaLinkedinIn className="text-3xl md:text-4xl text-white pointer-events-none" />
                </a>

                {/* Person Image */}
                <div className="relative z-10 w-96 md:w-[36rem] flex items-end justify-center mb-6 group-hover:-translate-y-8 transition-transform duration-700 ease-out pointer-events-none">
                    <img src="/enhanced_solopic.png" alt="Jiron" className="object-contain w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] filter contrast-105 saturate-105 scale-100 group-hover:scale-110 transition-transform duration-700 origin-bottom" />
                </div>
            </div>

            {/* Scroll down indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce opacity-50">
                <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">Scroll</span>
                <FaChevronDown className="text-neon-green text-sm" />
            </div>
        </section>
    );
};

export default Hero;
