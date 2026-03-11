import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Points to the backend proxy — API key never exposed in the browser
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: "Hi there! I'm an AI assistant for Ron's portfolio. How can I help you today?" },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);

        try {
            // Build Gemini-compatible history (exclude the initial greeting)
            const history = messages.slice(1).map((msg) => ({
                role: msg.role === 'model' ? 'model' : 'user',
                parts: [{ text: msg.text }],
            }));

            const res = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText, history }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Server error');

            setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'model', text: 'Sorry, I am having trouble connecting right now. Please try again later.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-fade-in-up">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-[#081208] border border-neon-green/20 rounded-2xl w-80 sm:w-96 shadow-[0_10px_40px_rgba(57,255,20,0.1)] overflow-hidden flex flex-col mb-4 max-h-[500px] sm:max-h-[600px] h-[70vh]">
                    {/* Header */}
                    <div className="bg-[#0a1a0a] border-b border-neon-green/20 p-4 flex justify-between items-center px-5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-neon-green/10 flex items-center justify-center border border-neon-green/30 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
                                <Bot size={18} className="text-neon-green" />
                            </div>
                            <span className="font-bold text-white tracking-wider text-sm uppercase">AI Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors p-1">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && (
                                    <div className="w-6 h-6 rounded-full bg-neon-green/10 flex-shrink-0 flex items-center justify-center border border-neon-green/20 mt-1">
                                        <Bot size={12} className="text-neon-green" />
                                    </div>
                                )}
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm prose prose-invert prose-sm ${msg.role === 'user' ? 'bg-neon-green/20 text-white rounded-tr-sm border border-neon-green/30' : 'bg-white/5 text-subtle-gray rounded-tl-sm border border-white/10'}`}>
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-6 h-6 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center border border-white/20 mt-1">
                                        <User size={12} className="text-white/70" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <div className="w-6 h-6 rounded-full bg-neon-green/10 flex-shrink-0 flex items-center justify-center border border-neon-green/20 mt-1">
                                    <Bot size={12} className="text-neon-green" />
                                </div>
                                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-sm border border-white/10 flex items-center gap-2">
                                    <Loader2 size={16} className="text-neon-green animate-spin" />
                                    <span className="text-xs text-subtle-gray">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-4 bg-[#0a1a0a] border-t border-white/10">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="w-full bg-[#081208] text-sm text-white border border-white/10 rounded-full py-3 px-4 pr-12 focus:outline-none focus:border-neon-green/50 focus:shadow-[0_0_10px_rgba(57,255,20,0.1)] transition-all placeholder:text-white/30"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-neon-green/20 hover:bg-neon-green/30 text-neon-green rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-[#0a1a0a] border border-neon-green/50 text-neon-green' : 'bg-neon-green text-black border-2 border-transparent'}`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default Chatbot;
