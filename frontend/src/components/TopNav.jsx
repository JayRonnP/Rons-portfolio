import React, { useEffect, useState } from 'react';

const NAV_LINKS = ['Home', 'About', 'Projects', 'Contact'];

const TopNav = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observers = [];
        NAV_LINKS.forEach((item) => {
            const el = document.getElementById(item.toLowerCase());
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(item.toLowerCase()); },
                { threshold: 0.4 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <nav className="fixed w-full top-0 z-50 bg-deep-black/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-neon-green/20 border border-neon-green flex items-center justify-center shadow-neon">
                        <span className="text-neon-green font-bold text-sm tracking-wider">JR</span>
                    </div>
                </div>

                {/* Links */}
                <div className="flex space-x-6 text-sm font-medium text-white/80">
                    {NAV_LINKS.map((item) => {
                        const isActive = activeSection === item.toLowerCase();
                        return (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`relative group transition-colors ${isActive ? 'text-neon-green' : 'hover:text-neon-green'}`}
                            >
                                {item}
                                <span
                                    className={`absolute -bottom-1 left-0 h-[2px] bg-neon-green shadow-neon transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                />
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
