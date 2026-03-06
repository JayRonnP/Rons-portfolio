import React, { useState } from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import ParticleBackground from './ParticleBackground';

const Footer = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch('https://formsubmit.co/ajax/jiron.panday45@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Name: formData.name,
                    Email: formData.email,
                    Message: formData.message,
                    _subject: "New contact form submission from Portfolio",
                    _template: "table"
                }),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(null), 5000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <footer id="contact" className="py-24 px-6 relative border-t border-white/5 mt-20 bg-[#050a05] overflow-hidden">
            {/* Particle canvas background */}
            <ParticleBackground count={30} />

            <div className="max-w-2xl mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase mb-4">
                    Contact Me
                </h2>
                <p className="text-subtle-gray mb-8 text-sm md:text-base">Have a project in mind? Let's work together.</p>

                {/* Social icon links */}
                <div className="flex justify-center gap-4 mb-12">
                    <a
                        href="https://web.facebook.com/jiron.panday"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] transition-all duration-300 hover:-translate-y-1"
                    >
                        <FaFacebookF className="text-lg" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jiron-panday-929676374/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-2xl bg-[#0077B5]/10 border border-[#0077B5]/30 flex items-center justify-center text-[#0077B5] hover:bg-[#0077B5] hover:text-white hover:shadow-[0_0_20px_rgba(0,119,181,0.4)] transition-all duration-300 hover:-translate-y-1"
                    >
                        <FaLinkedinIn className="text-lg" />
                    </a>
                    <a
                        href="mailto:jiron.panday45@gmail.com"
                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1"
                    >
                        <SiGmail className="text-lg" />
                    </a>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left bg-card-bg/30 p-8 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl animate-fade-in-up">
                    <input type="hidden" name="_subject" value="New submission from your Graphic Design Portfolio!" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />

                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#0a150a] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-neon-green/50 focus:shadow-[0_0_15px_rgba(57,255,20,0.1)] transition-all"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#0a150a] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-neon-green/50 focus:shadow-[0_0_15px_rgba(57,255,20,0.1)] transition-all"
                        />
                    </div>
                    <div>
                        <textarea
                            name="message"
                            placeholder="Message"
                            required
                            rows="5"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-[#0a150a] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-neon-green/50 focus:shadow-[0_0_15px_rgba(57,255,20,0.1)] transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full bg-neon-green/10 text-neon-green font-bold text-sm tracking-widest uppercase py-5 rounded-xl border border-neon-green hover:bg-neon-green hover:text-black hover:shadow-[0_0_25px_rgba(57,255,20,0.4)] transition-all duration-300 disabled:opacity-50 mt-4"
                    >
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>

                    {status === 'success' && (
                        <div className="mt-4 p-4 rounded-xl bg-neon-green/10 border border-neon-green/30 text-neon-green text-center text-sm font-medium animate-pulse">
                            Message sent successfully! I'll get back to you soon.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-center text-sm font-medium">
                            Failed to send message. Please try again later.
                        </div>
                    )}
                </form>
            </div>

            {/* Decorative footer */}
            <div className="text-center mt-24 text-white/20 text-xs tracking-wider relative z-10">
                &copy; {new Date().getFullYear()} Jiron. All rights reserved.
            </div>

            {/* Ambient background glow */}
            <div className="absolute inset-0 top-1/2 bg-gradient-to-t from-neon-green/5 to-transparent pointer-events-none" />
        </footer>
    );
};

export default Footer;
