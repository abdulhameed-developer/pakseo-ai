
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Trash2, X, Sparkles, Loader2, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useKeyword } from '../context/KeywordContext';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export function ChatAssistant() {
  const { darkMode, copyToClipboard, copiedId } = useKeyword();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await getChatResponse(newMessages);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I'm having trouble connecting right now. Please try again." }] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: isOpen ? "none" : [
            "0 10px 15px -3px rgba(16, 185, 129, 0.2)",
            "0 20px 25px -5px rgba(16, 185, 129, 0.4)",
            "0 10px 15px -3px rgba(16, 185, 129, 0.2)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center z-[100] transition-all ${
          isOpen ? 'rotate-90 bg-slate-800 text-white' : 'bg-emerald-600 text-white shadow-emerald-500/30'
        }`}
      >
        {isOpen ? <X className="w-7 h-7" /> : (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.5C21 15.6421 17.1944 19 12.5 19C11.666 19 10.8601 18.8918 10.1118 18.6901L6 21H5V20M21 11.5C21 7.35786 17.1944 4 12.5 4C7.80558 4 4 7.35786 4 11.5C4 13.9118 5.28187 16.0354 7.31175 17.4338" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.5" cy="11.5" r="1" fill="currentColor"/>
            <circle cx="12.5" cy="11.5" r="1" fill="currentColor"/>
            <circle cx="16.5" cy="11.5" r="1" fill="currentColor"/>
          </svg>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed bottom-28 right-8 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] rounded-[2.5rem] border-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] z-[100] flex flex-col overflow-hidden backdrop-blur-xl ${
              darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
            }`}
          >
            {/* Header */}
            <div className={`px-6 py-5 border-b flex items-center justify-between ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight">PakSEO AI Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest text-emerald-500">AI Powered SEO System</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setMessages([])} 
                className={`p-2 rounded-lg opacity-30 hover:opacity-100 transition-opacity ${darkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-900'}`}
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-60">I'm PakSEO AI.</p>
                    <p className="text-[10px] opacity-40 mt-1 uppercase font-black tracking-widest">How can I help you?</p>
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm relative group whitespace-pre-wrap ${
                    msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : darkMode 
                      ? 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}>
                    {msg.parts[0].text}
                    
                    {msg.role === 'model' && (
                      <button 
                        onClick={() => copyToClipboard(msg.parts[0].text, `msg-${i}`)}
                        className={`absolute -bottom-6 right-0 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-40 hover:opacity-100 transition-all flex items-center gap-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}
                      >
                        {copiedId === `msg-${i}` ? 'Copied' : <><Copy className="w-2.5 h-2.5" /> Copy</>}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                   <div className={`p-4 rounded-2xl rounded-tl-none border flex items-center gap-2 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                      <span className="text-xs font-bold opacity-40 italic">Thinking...</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-5 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className={`flex items-center gap-2 p-2 rounded-2xl border transition-all focus-within:ring-4 focus-within:ring-emerald-500/10 ${
                darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your SEO question..."
                  className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm font-bold"
                />
                <button 
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className={`p-2.5 rounded-xl transition-all ${
                    input.trim() && !loading 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/30' 
                    : 'bg-slate-100 text-slate-400 dark:bg-slate-900 opacity-50'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
